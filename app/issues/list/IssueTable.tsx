import { MyLink, IssueStatusBadge } from "@/app/components";

import { ArrowUpIcon } from "@radix-ui/react-icons";
import { Table } from "@radix-ui/themes";
import NextLink from "next/link";

import { Status, type Issue } from "@prisma/client";

export interface IssueQuery {
  status: Status;
  orderBy: keyof Issue;
  page: string;
}

interface Props {
  searchParams: IssueQuery;
  issues: Issue[];
}

// columns:
const columns: { label: string; value: keyof Issue; className?: string }[] = [
  { label: "Issue", value: "title" },
  { label: "Status", value: "status", className: "hidden md:table-cell" },
  { label: "Created", value: "createdAt", className: "hidden md:table-cell" },
];

export const columnNames = columns.map((column) => column.value);

// issue table function:
const IssueTable = ({ searchParams, issues }: Props) => {
  return (
    <Table.Root variant='surface'>
      <Table.Header>
        <Table.Row>
          {columns.map((column) => (
            <Table.ColumnHeaderCell key={column.value}>
              <NextLink
                href={{ query: { ...searchParams, orderBy: column.value } }}>
                {column.label}
              </NextLink>

              {/* sort orderby up */}
              {column.value === searchParams.orderBy && (
                <ArrowUpIcon className='inline' />
              )}

              {/* todo sort orderby down */}
              {column.value === searchParams.orderBy && (
                <ArrowUpIcon className='inline transform rotate-180' />
              )}
            </Table.ColumnHeaderCell>
          ))}
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
  );
};
export default IssueTable;
