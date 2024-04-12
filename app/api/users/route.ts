import prisma from "@/prisma/db";
import { NextRequest, NextResponse } from "next/server";

// get all users
export async function GET(request: NextRequest) {
  // @ts-ignore
  const users = await prisma?.user.findMany({ orderBy: { name: "asc" } });
  return NextResponse.json(users, { status: 200 });
}
