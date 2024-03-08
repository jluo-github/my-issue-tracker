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

  return (
    <div className='max-w-xl'>
      {error && (
        <Callout.Root>
          <Callout.Text color='red' className='mb-5'>
            {error}
          </Callout.Text>
        </Callout.Root>
      )}
      <form
        onSubmit={handleSubmit(async (data) => {
          console.log(data);

          try {
            await axios.post("/api/issues", data);
            router.push("/issues");
          } catch (error: any) {
            setError("Something went wrong");
          }
        })}
        className=' space-y-3 '>
        <TextField.Root>
          <TextField.Input placeholder='Title' {...register("title")} />
        </TextField.Root>

        {errors.title && (
          <Text color='red' as='p'>
            {" "}
            {errors.title.message}{" "}
          </Text>
        )}

        {/* cannot use register, so render simple MDE inside of Controller */}
        <Controller
          name='description'
          control={control}
          render={({ field }) => (
            <SimpleMDE placeholder='Description' {...field} />
          )}
        />
        {errors.description && (
          <Text color='red' as='p'>
            {" "}
            {errors.description.message}{" "}
          </Text>
        )}

        <Button>Submit</Button>
      </form>
    </div>
  );
};
export default NewIssuePage;
