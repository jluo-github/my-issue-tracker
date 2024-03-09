import { Flex, Text, Button, Table, Link } from "@radix-ui/themes";

import prisma from "@/prisma/db";
import delay from "delay";
import IssueActions from "./IssueActions";

import { IssueStatusBadge, MyLink } from "@/app/components";

const IssuesPage = async () => {
  const issues = await prisma.issue.findMany();

  // todo remove this delay
  await delay(2000);

  return (
    <div>
      <IssueActions />

      <Table.Root variant='surface'>
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeaderCell>Issue</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell className='hidden md:table-cell'>
              Status
            </Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell className='hidden md:table-cell'>
              Created
            </Table.ColumnHeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {issues.map((issue) => (
            <Table.Row key={issue.id}>
              <Table.Cell>
                <MyLink
                  href={`/issues/${issue.id}`}
                  // className='text-violet-800 hover:underline'
                >
                  {issue.title}
                </MyLink>

                <div className='block md:hidden'>
                  <IssueStatusBadge status={issue.status} />
                </div>
              </Table.Cell>

              <Table.Cell className='hidden md:table-cell'>
                <IssueStatusBadge status={issue.status} />
              </Table.Cell>

              <Table.Cell className='hidden md:table-cell'>
                {issue.createdAt.toDateString()}
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </div>
  );
};

export const dynamic = "force-dynamic";
// export const revalidate = 0;

export default IssuesPage;
