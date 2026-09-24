import { Outlet, redirect, type LoaderFunctionArgs } from "react-router";
import Header from '@/components/Header'
import api from '@/services/api';
import { userStore } from "@/stores/userStore";
import FlashMessage from "./components/FlashMessage";
import axios from "axios";


export async function loader({ request }: LoaderFunctionArgs) {
  const url = new URL(request.url);

  if (userStore.isInitialized()) {
    return null;
  }

  await api.get('http://localhost/sanctum/csrf-cookie');
  try {
    const res = await api.get('/user');
    userStore.setUser(res.data);
  } catch(error) {
    userStore.setUser(null);
    if(axios.isAxiosError(error)){
      if (error.response?.status === 401 && url.pathname.startsWith("/posts")) {
        return redirect("/");
      }
    }
    return null;
  }
}

export default function App() {

  return (
    <>
      <Header />
      <div className="relative w-auto mx-auto md:w-3/4 p-4">
        <Outlet />
      </div>
      <FlashMessage />
    </>
  )
}
