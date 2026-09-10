import { redirect } from "react-router";
import api from "@/services/api"

export async function action() {
  await api.post('/logout')

  return redirect("/");
}
