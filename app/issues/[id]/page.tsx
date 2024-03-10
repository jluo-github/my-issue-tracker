import prisma from "@/prisma/db";
import { Box, Button, Card, Flex, Grid, Heading, Text } from "@radix-ui/themes";
import { notFound } from "next/navigation";
import delay from "delay";

import EditIssueButton from "./EditIssueButton";
import IssueDetails from "./IssueDetails";
import DeleteIssueButton from "./DeleteIssueButton";
import { getServerSession } from "next-auth";
import authOptions from "@/app/auth/authOptions";
import AssigneeSelect from "./AssigneeSelect";
import type { Metadata } from "next";
import { cache } from "react";

interface Props {
  params: {
    id: string;
  };
}

const fetchUser = cache((issueId: number) =>
  prisma.issue.findUnique({
    where: {
      id: issueId,
    },
  })
);

const IssueDetailPage = async ({ params }: Props) => {
  const session = await getServerSession(authOptions);

  const issue = await fetchUser(parseInt(params.id));

  if (!issue) {
    notFound();
  }

  // todo remove this delay
  await delay(2000);

  return (
    <Grid columns={{ initial: "1", sm: "5" }} gap='5'>
      <Box className='md:col-span-4'>
        <IssueDetails issue={issue} />
      </Box>

      {session && (
        <Box>
          <Flex direction='column' gap='3'>
            <AssigneeSelect issue={issue} />

            <EditIssueButton issueId={issue.id} />

            <DeleteIssueButton issueId={issue.id} />
          </Flex>
        </Box>
      )}
    </Grid>
  );
};

// metadata:
export async function generateMetadata({ params }: Props) {
  const issue = await fetchUser(parseInt(params.id));

  return {
    title: issue?.title,
    description: issue?.description,
  };
}

export default IssueDetailPage;
