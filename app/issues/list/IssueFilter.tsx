"use client";

import type { Status } from "@prisma/client";
import { Select } from "@radix-ui/themes";
import { useRouter } from "next/navigation";

const statusOptions: { label: string; value?: Status }[] = [
  { label: "All" },
  { label: "Open", value: "OPEN" },
  { label: "In_progress", value: "IN_PROGRESS" },
  { label: "Closed", value: "CLOSED" },
];

const IssueFilter = () => {
  const router = useRouter();
  const handleChange = (status: any) => {
    const query = status ? `?status=${status}` : "";
    router.push("/issues/list" + query);
  };

  return (
    <Select.Root onValueChange={handleChange}>
      <Select.Trigger placeholder='Filter by...' />

      <Select.Content>
        <Select.Group>
          <Select.Label>Filter by</Select.Label>
          {statusOptions.map((status) => (
            <Select.Item key={status.value} value={status?.value || ""}>
              {status.label}
            </Select.Item>
          ))}
        </Select.Group>
      </Select.Content>
    </Select.Root>
  );
};
export default IssueFilter;
