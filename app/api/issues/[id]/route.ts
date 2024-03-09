import { issueSchema, patchIssueSchema } from "@/app/validationSchemas";
import { NextResponse, type NextRequest } from "next/server";
import prisma from "@/prisma/db";
import delay from "delay";
import { getServerSession } from "next-auth";
import authOptions from "@/app/auth/authOptions";

interface Props {
  params: {
    id: string;
  };
}

//patch function to update issue
export async function PATCH(request: NextRequest, { params }: Props) {
  // authorize user
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  // validate request body
  const body = await request.json();
  const validation = patchIssueSchema.safeParse(body);

  if (!validation.success) {
    return NextResponse.json(validation.error.format(), { status: 400 });
  }

  const { assignedToUserId, title, description } = body;
  if (assignedToUserId) {
    // @ts-ignore
    const user = await prisma.user.findUnique({
      where: {
        id: assignedToUserId,
      },
    });

    if (!user) {
      return NextResponse.json({ error: "Invalid user id" }, { status: 400 });
    }
  }

  // update issue
  const issue = await prisma.issue.findUnique({
    where: {
      id: parseInt(params.id),
    },
  });

  if (!issue) {
    return NextResponse.json({ error: "Invalid issue id" }, { status: 404 });
  }

  const updatedIssue = await prisma.issue.update({
    where: { id: issue.id },
    data: {
      title,
      description,
      // @ts-ignore
      assignedToUserId,
    },
  });

  return NextResponse.json(updatedIssue);
}

// delete issue
export async function DELETE(request: NextRequest, { params }: Props) {
  // authorize user
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  // // todo: remove this delay
  // await delay(1000)

  // delete issue
  const issue = await prisma.issue.findUnique({
    where: {
      id: parseInt(params.id),
    },
  });

  if (!issue) {
    return NextResponse.json({ error: "Invalid issue id" }, { status: 404 });
  }

  await prisma.issue.delete({
    where: {
      id: issue.id,
    },
  });

  return NextResponse.json({ message: "Issue deleted" });
}
