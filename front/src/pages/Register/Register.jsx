import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button.jsx'
import { FieldGroup, FieldSet, FieldLabel, Field, FieldError } from '@/components/ui/field.jsx'
import { Input } from '@/components/ui/input.jsx'
import api from '@/services/api.jsx';
import { Form, useActionData, useLoaderData, useNavigate } from 'react-router-dom';

export async function loader() {
  const res = await api.get('/register');
  return res.data.email;
}

export async function action({request}) {
  const formData = await request.formData();
  const username = formData.get("username");
  const password = formData.get("password");
  const passwordConfirmation = formData.get("password_confirmation");

  try {
    await api.post("/register", {
      username:username,
      password:password,
      password_confirmation:passwordConfirmation
    });
    return {username: username}
  } catch(error) {
    if (error.response?.status === 422) {
      return data({ errors: error.response.data.errors }, { status: 422 });
    }
    throw error;
  }
}

export default function Preregister() {
  const navigate = useNavigate();
  const email = useLoaderData();
  const actionData = useActionData();

  useEffect(()=>{
    if(actionData?.username){
      navigate('/register_complete',{state: {
        email: email,
        username: actionData.username,
      }})
    }
  },[actionData, navigate])

  return (
    <>
      <title>新規登録｜掲示板</title>
      <Form method="post">
        <FieldGroup className="p-5">
          <FieldSet className="mx-auto w-full space-y-1">
            <Field>
              <FieldLabel className="text-sm font-semibold">メールアドレス</FieldLabel>
              <div>{email}</div>
            </Field>
            <Field>
              <FieldLabel htmlFor="email" className="text-sm font-semibold">名前</FieldLabel>
              <Input id="username" name="username" type="text" />
              {actionData?.errors?.username && <FieldError>{actionData.errors.username}</FieldError>}
            </Field>
            <Field>
              <FieldLabel htmlFor="password" className="text-sm font-semibold">パスワード</FieldLabel>
              <Input id="password" name="password" type="password" />
              {actionData?.errors?.password && <FieldError>{actionData.errors.password}</FieldError>}
            </Field>
            <Field>
              <FieldLabel htmlFor="password_confirmation" className="text-sm font-semibold">パスワード確認</FieldLabel>
              <Input id="password_confirmation" name="password_confirmation" type="password" />
            </Field>
            <Field className="pt-4">
              <Button type="submit">登録</Button>
            </Field>
          </FieldSet>
        </FieldGroup>
      </Form>
    </>
  )
}
