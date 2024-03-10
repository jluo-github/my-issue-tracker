import { Flex, Text, Button, Table, Link } from "@radix-ui/themes";

import prisma from "@/prisma/db";
import delay from "delay";
import IssueActions from "./IssueActions";

import { Status, type Issue } from "@prisma/client";

import Pagination from "@/app/components/Pagination";
import IssueTable, { columnNames, type IssueQuery } from "./IssueTable";

interface Props {
  searchParams: IssueQuery;
}

// issues page function:
const IssuesPage = async ({ searchParams }: Props) => {
  // status:
  const statuses = Object.values(Status);
  const status = statuses.includes(searchParams.status)
    ? searchParams.status
    : undefined;

  const where = { status };

  // order by:
  const orderBy = columnNames.includes(searchParams.orderBy)
    ? { [searchParams.orderBy]: "asc" }
    : undefined;

  // page:
  const page = parseInt(searchParams.page) || 1;
  const pageSize = 10;
  const skip = (page - 1) * pageSize;

  // get issues:
  const issues = await prisma.issue.findMany({
    where,
    orderBy,
    skip,
    take: pageSize,
  });

  const issueCount = await prisma.issue.count({ where });

  // todo remove this delay
  await delay(2000);

  // return:
  return (
    <div>
      <IssueActions />

      <IssueTable searchParams={searchParams} issues={issues} />

      <Pagination
        pageSize={pageSize}
        currentPage={page}
        itemCount={issueCount}
      />
    </div>
  );
};

export const dynamic = "force-dynamic";
// export const revalidate = 0;

export default IssuesPage;
