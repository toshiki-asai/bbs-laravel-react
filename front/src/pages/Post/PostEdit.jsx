import { Button } from '@/components/ui/button';
import { FieldGroup, FieldSet, Field, FieldLabel, FieldError } from '@/components/ui/field';
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea';
import api from '@/services/api';
import { Form, redirect, useActionData, useLoaderData } from 'react-router-dom';

export async function loader({ params }) {
  const id = params.postId;

  const res = await api.get('/posts/'+id+'/edit');
  return res.data.post;
}

export async function action({ request, params }) {
  const formData = await request.formData();
  const id = params.postId;

  try {
    const res = await api.put('/posts/'+id, {
      title: formData.get("title"),
      content: formData.get("content")
    });

    return redirect("/posts/"+res.data.post_id);
  } catch(error) {
    if (error.response?.status === 422) {
      return data({ errors: error.response.data.errors }, { status: 422 });
    }
    throw error;
  }
}

export default function PostEdit() {
  const post = useLoaderData();
  const actionData = useActionData();

  return (
    <>
      <title>投稿編集｜掲示板</title>
      <Form method="post" className="space-y-4">
        <h2 className="text-lg font-bold">編集</h2>
        <FieldGroup>
          <FieldSet className="relative w-full">
            <Field>
                <FieldLabel htmlFor="title">タイトル</FieldLabel>
                <Input id="title" name="title" type="text" defaultValue={post.title} />
                { actionData?.errors?.title && <FieldError>{actionData.errors.title}</FieldError> }
            </Field>
            <Field>
                <FieldLabel htmlFor="content">内容</FieldLabel>
                <Textarea id="content" name="content" className="h-80" defaultValue={post.content} />
                { actionData?.errors?.content && <FieldError>{actionData.errors.content}</FieldError> }
            </Field>
            <Field className="pt-4">
                <Button type="submit">修正</Button>
            </Field>
          </FieldSet>
        </FieldGroup>
      </Form>
    </>
  )
}
