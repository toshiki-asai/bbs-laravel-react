import { Outlet, redirect, useLoaderData, type LoaderFunctionArgs } from "react-router";
import Header from '@/components/Header'
import { MessageProvider } from "@/providers/MessageProvider";
import api from '@/services/api';
import { useUser } from "@/providers/UserProvider";
import { useEffect } from "react";

export async function loader({ request }: LoaderFunctionArgs) {
  await api.get('http://localhost/sanctum/csrf-cookie');
  const url = new URL(request.url);

  try {
    const res = await api.get('/user');
    return res;
  }catch(error: any){
    if (error.response?.status === 401 && url.pathname.startsWith("/posts")) {
      return redirect("/");
    }
    return null;
  }
}

export default function App() {
  const res = useLoaderData();
  const {login, logout} = useUser();
  useEffect(() => {
    res ? login() : logout();
  }, [res]);

  return (
    <>
      <Header />
      <div className="w-auto mx-auto md:w-3/4 p-4">
        <MessageProvider>
          <Outlet />
        </MessageProvider>
      </div>
    </>
  )
}
