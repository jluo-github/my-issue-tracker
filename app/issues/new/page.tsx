"use client";
import { Button, Callout, Text, TextField } from "@radix-ui/themes";
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import { useForm, Controller } from "react-hook-form";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { createIssueSchema } from "@/app/api/validationSchemas";
import { z } from "zod";
import ErrorMessage from "@/app/components/ErrorMessage";
import Spinner from "@/app/components/Spinner";

type IssueForm = z.infer<typeof createIssueSchema>;

// interface IssueForm {
//   title: string;
//   description: string;
// }

const NewIssuePage = () => {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IssueForm>({
    resolver: zodResolver(createIssueSchema),
  });

  // console.log(register(name));
  const [error, setError] = useState("");

  const router = useRouter();

  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit = handleSubmit(async (data) => {
    // console.log(data);
    try {
      setIsSubmitting(true);
      await axios.post("/api/issues", data);
      router.push("/issues");
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
          <TextField.Input placeholder='Title' {...register("title")} />
        </TextField.Root>

        <ErrorMessage> {errors.title?.message} </ErrorMessage>

        {/* cannot use register, so render simple MDE inside of Controller */}
        <Controller
          name='description'
          control={control}
          render={({ field }) => (
            <SimpleMDE placeholder='Description' {...field} />
          )}
        />

        <ErrorMessage> {errors.description?.message}</ErrorMessage>

        <Button disabled={isSubmitting}>
          Submit{isSubmitting && <Spinner />}
        </Button>
      </form>
    </div>
  );
};
export default NewIssuePage;
