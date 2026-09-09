import { Button, buttonVariants } from '@/components/ui/button.jsx'
import { FieldGroup, FieldSet, FieldLabel, Field, FieldError } from '@/components/ui/field.jsx'
import { Input } from '@/components/ui/input.jsx'
import api from '@/services/api.jsx';
import { data, Form, Link, redirect, useActionData } from 'react-router-dom';
import { useMessage } from '@/providers/MessageProvider';
import { useLayoutEffect } from 'react';

export async function action({request}) {
  const formData = await request.formData();
  const email = formData.get("email");
  const password = formData.get("password");

  try {
    await api.post("/login", {
      email:email,
      password:password
    });

    return redirect("/posts");
  } catch(error) {
    if (error.response?.status === 401) {
      return data({ message: error.response.data.message }, { status: 401 });
    }
    if (error.response?.status === 422) {
      return data({ errors: error.response.data.errors }, { status: 422 });
    }
    throw error;
  }
}

export default function Login() {
  const actionData = useActionData();
  const checkAndSetErrorMessage = useMessage();
  useLayoutEffect(()=> {
    checkAndSetErrorMessage(actionData);
  }, [actionData]);

  return (
    <>
      <title>掲示板</title>
      <Form method="post" className="mx-auto w-full space-y-1">
        <FieldGroup>
          <FieldSet>
            <Field>
              <FieldLabel htmlFor="email" className="text-sm font-semibold">メールアドレス</FieldLabel>
              <Input id="email" name="email" type="email" placeholder="someone@example.com" />
              {actionData?.errors?.email && <FieldError>{actionData.errors.email}</FieldError>}
            </Field>
            <Field>
              <FieldLabel htmlFor="password" className="text-sm font-semibold">パスワード</FieldLabel>
              <Input id="password" name="password" type="password" />
              {actionData?.errors?.password && <FieldError>{actionData.errors.password}</FieldError>}
            </Field>
            <Field className="pt-4">
              <Button type="submit">ログイン</Button>
            </Field>
          </FieldSet>
        </FieldGroup>
      </Form>
      <div className="flex w-full flex-col pt-10">
        <Link to="/preregister" className={buttonVariants({ variant: "secondary" })}>初めてご利用の方はこちら</Link>
      </div>
    </>
  )
}
