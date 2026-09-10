import { Button } from '@/components/ui/button';
import { FieldGroup, FieldSet, Field, FieldLabel, FieldError } from '@/components/ui/field';
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea';
import api from '@/services/api';
import type { ValidationErrorResponse } from '@/types/validationErrorResponse';
import axios from 'axios';
import { data, Form, redirect, useActionData, type ActionFunctionArgs } from 'react-router';

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();

  try {
    const res = await api.post('/posts', {
      title: formData.get("title"),
      content: formData.get("content")
    });

    return redirect("/posts/"+res.data.post_id);
  } catch(error) {
    if(axios.isAxiosError(error)){
      if (error.response?.status === 422) {
        return data({ errors: error.response.data.errors }, { status: 422 });
      }
    }
    throw error;
  }
}

export default function PostCreate() {
  const actionData = useActionData<ValidationErrorResponse>();

  return (
    <>
      <title>新規投稿｜掲示板</title>
      <Form method="post" className="space-y-4">
        <h2 className="text-lg font-bold">新規投稿</h2>
        <FieldGroup>
          <FieldSet className="relative w-full">
            <Field>
                <FieldLabel htmlFor="title">タイトル</FieldLabel>
                <Input id="title" name="title" type="text" />
                { actionData?.errors?.title && <FieldError>{actionData.errors.title}</FieldError> }
            </Field>
            <Field>
                <FieldLabel htmlFor="content">内容</FieldLabel>
                <Textarea id="content" name="content" className="h-80" />
                { actionData?.errors?.content && <FieldError>{actionData.errors.content}</FieldError> }
            </Field>
            <Field className="pt-4">
                <Button type="submit">投稿</Button>
            </Field>
          </FieldSet>
        </FieldGroup>
      </Form>
    </>
  )
}
