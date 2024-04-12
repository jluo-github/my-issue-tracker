import prisma from "@/prisma/db";
import IssueSummary from "./IssueSummary";
import LatestIssues from "./latestIssues";
import IssueChart from "./IssueChart";
import { Flex, Grid } from "@radix-ui/themes";
import type { Metadata } from "next";

export default async function Home() {
  // if (!prisma.issue.count) return null;

  const openIssues = await prisma?.issue.count({
    where: { status: "OPEN" },
  });

  const inProgressIssues = await prisma?.issue.count({
    where: { status: "IN_PROGRESS" },
  });

  const closedIssues = await prisma?.issue.count({
    where: { status: "CLOSED" },
  });

  return (
    <Grid
      columns={{
        initial: "1",
        md: "2", // Two columns for md screens and above
      }}
      gap='6'>
      <Flex direction='column' gap='6'>
        <IssueSummary
          open={openIssues}
          inProgress={inProgressIssues}
          closed={closedIssues}
        />

        <IssueChart
          open={openIssues}
          inProgress={inProgressIssues}
          closed={closedIssues}
        />
      </Flex>

      <LatestIssues />
    </Grid>
  );
}

export const metadata: Metadata = {
  title: "Issue Tracker Dashboard",
  description: "Home page",
};
