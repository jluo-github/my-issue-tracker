"use client";
import { Button, Callout, Text, TextField } from "@radix-ui/themes";
import dynamic from "next/dynamic";
// import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import { useForm, Controller } from "react-hook-form";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { issueSchema } from "@/app/validationSchemas";
import { z } from "zod";

import ErrorMessage from "@/app/components/ErrorMessage";
import Spinner from "@/app/components/Spinner";
import type { Issue } from "@prisma/client";
import SimpleMDE from "react-simplemde-editor";

// const SimpleMDE = dynamic(() => import("react-simplemde-editor"), {
//   ssr: false,
// });

type IssueFormData = z.infer<typeof issueSchema>;

// interface IssueForm {
//   title: string;
//   description: string;
// }

interface Props {
  // type of Issue from prisma
  issue?: Issue;
}

const IssueForm = ({ issue }: Props) => {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IssueFormData>({
    resolver: zodResolver(issueSchema),
  });

  // console.log(register(name));
  const [error, setError] = useState("");

  const router = useRouter();

  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit = handleSubmit(async (data) => {
    // console.log(data);
    try {
      setIsSubmitting(true);

      if (issue) {
        // update issue:
        await axios.patch(`/api/issues/${issue.id}`, data);
      } else {
        // create issue:
        await axios.post("/api/issues", data);
      }

      router.push("/issues/list");

      // force a refresh of the page
      router.refresh();
    } catch (error: any) {
      setIsSubmitting(false);
      setError("Something went wrong");
    }
  });

  return (
    <div className='max-w-xl'>
      {error && (
        <Callout.Root>
          <Callout.Text color='red' className='mb-5'>
            {error}
          </Callout.Text>
        </Callout.Root>
      )}

      <form onSubmit={onSubmit} className=' space-y-3 '>
        <TextField.Root>
          <TextField.Input
            defaultValue={issue?.title}
            placeholder='Title'
            {...register("title")}
          />
        </TextField.Root>

        <ErrorMessage> {errors.title?.message} </ErrorMessage>

        {/* cannot use register, so render simple MDE inside of Controller */}
        <Controller
          name='description'
          control={control}
          defaultValue={issue?.description}
          render={({ field }) => (
            <SimpleMDE placeholder='Description' {...field} />
          )}
        />

        <ErrorMessage> {errors.description?.message}</ErrorMessage>

        <Button disabled={isSubmitting}>
          {issue ? " Update Issue " : " Submit Issue "}
          {isSubmitting && <Spinner />}
        </Button>
      </form>
    </div>
  );
};
export default IssueForm;
