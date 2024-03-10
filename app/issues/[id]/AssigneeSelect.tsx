"use client";

import { Select } from "@radix-ui/themes";
import axios from "axios";
// @ts-ignore
import type { Issue, User } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import { Skeleton } from "@/app/components";
import toast, { Toaster } from "react-hot-toast";

const AssigneeSelect = ({ issue }: { issue: Issue }) => {
  const { data: users, error, isLoading } = useUsers();

  if (isLoading) return <Skeleton />;

  if (error) return null;

  const handleAssignIssue = async (userId: string) => {
    try {
      await axios.patch(`/api/issues/${issue.id}`, {
        assignedToUserId: userId || null,
      });
    } catch (error) {
      toast.error("Failed to update assignee");
    }
  };

  return (
    <>
      <Toaster />
      <Select.Root
        // @ts-ignore
        defaultValue={issue.assignedToUserId || ""}
        onValueChange={handleAssignIssue}>
        <Select.Trigger
          // @ts-ignore
          placeholder='Assign...'
        />
        <Select.Content>
          <Select.Group>
            <Select.Label>Suggestions</Select.Label>

            <Select.Item value=''>Unassigned</Select.Item>

            {users?.map((user: User) => (
              <Select.Item key={user.id} value={user.id}>
                {user.name}
              </Select.Item>
            ))}
          </Select.Group>
        </Select.Content>
      </Select.Root>
    </>
  );
};

const useUsers = () =>
  useQuery<User[] | any>({
    queryKey: ["users"],
    queryFn: () => axios.get("/api/users").then((res) => res.data),
    staleTime: 1000 * 60,
    retry: 3,
  });

export default AssigneeSelect;
