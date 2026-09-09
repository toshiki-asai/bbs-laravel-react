import { useEffect, useLayoutEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { FieldGroup, FieldSet, FieldLabel, Field, FieldError } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import api from '@/services/api';
import { Form, redirect, useActionData, useNavigate } from "react-router-dom";
import { useMessage } from '@/providers/MessageProvider';

export async function action({ request }){
  const formData = await request.formData();
  const email = formData.get("email");

  try {
    const res = await api.post("/preregister", {
      email:email,
    });

    return {url: res.data.url}
  } catch(error) {
    if (error.response?.status === 422) {
      return data({ errors: error.response.data.errors }, { status: 422 });
    }
    throw error;
  }
}

export default function Preregister() {
  const actionData = useActionData()
  const navigate = useNavigate();

  useEffect(()=>{
    if(actionData?.url !== undefined){
      navigate('/preregister_complete',{state: {
        url: actionData.url
      }});
    }
  },[actionData, navigate]);

  return (
    <>
      <title>新規登録｜掲示板</title>
      <Form method="post">
        <FieldGroup>
          <FieldSet className="mx-auto w-full space-y-1">
            <Field>
              <FieldLabel htmlFor="email" className="text-sm font-semibold">メールアドレス</FieldLabel>
              <Input id="email" name="email" type="email" placeholder="someone@example.com" />
              {actionData?.errors?.email && <FieldError>{actionData.errors.email}</FieldError>}
            </Field>
            <Field className="pt-4">
              <Button type="submit">送信</Button>
            </Field>
          </FieldSet>
        </FieldGroup>
      </Form>
    </>
  )
}
