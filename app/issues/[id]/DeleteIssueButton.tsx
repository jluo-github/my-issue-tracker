"use client";
import { Spinner } from "@/app/components";
import { AlertDialog, Button, Flex } from "@radix-ui/themes";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";

const DeleteIssueButton = ({ issueId }: { issueId: number }) => {
  const router = useRouter();
  const [error, setError] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    try {
      setIsDeleting(true);
      await axios.delete(`/api/issues/${issueId}`);
      router.push("/issues/list");
      router.refresh();
    } catch (error) {
      setIsDeleting(false);
      setError(true);
    }
  };

  return (
    <>
      <AlertDialog.Root>
        <AlertDialog.Trigger>
          <Button color='red' disabled={isDeleting}>
            Delete Issue
            {isDeleting && <Spinner />}
          </Button>
        </AlertDialog.Trigger>

        <AlertDialog.Content style={{ maxWidth: 450 }}>
          <AlertDialog.Title>Confirm Delete</AlertDialog.Title>

          <AlertDialog.Description size='2'>
            Are you sure? This issue will no longer be accessible,
          </AlertDialog.Description>

          <Flex mt='4' gap='3'>
            <AlertDialog.Cancel>
              <Button variant='soft' color='gray'>
                Cancel
              </Button>
            </AlertDialog.Cancel>

            <AlertDialog.Action>
              <Button color='red' onClick={handleDelete}>
                Delete
              </Button>
            </AlertDialog.Action>
          </Flex>
        </AlertDialog.Content>
      </AlertDialog.Root>

      <AlertDialog.Root open={error}>
        <AlertDialog.Content>
          <AlertDialog.Title>Error</AlertDialog.Title>

          <AlertDialog.Description>
            Something went wrong. Please try again.
          </AlertDialog.Description>
          <Button
            color='gray'
            variant='soft'
            mt='2'
            onClick={() => setError(false)}>
            OK
          </Button>
        </AlertDialog.Content>
      </AlertDialog.Root>
    </>
  );
};

export default DeleteIssueButton;
