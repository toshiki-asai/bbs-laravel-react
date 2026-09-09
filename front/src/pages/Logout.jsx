import { redirect, useNavigate } from "react-router-dom";
import api from "@/services/api"
import { useUser } from "@/providers/UserProvider";

export async function action() {
  await api.post('/logout')

  return redirect("/");
}

export default function Logout() {
  // const navigate = useNavigate();

  // const [,,logout] = useUser();
  // logout();

  // navigate.replace('/')
  return null;
}
