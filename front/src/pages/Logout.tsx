import { redirect } from "react-router";
import api from "@/services/api"
import { userStore } from "@/stores/userStore";

export async function action() {
  await api.post('/logout')
  userStore.setUser(null);

  await api.get('http://localhost/sanctum/csrf-cookie');
  return redirect("/");
}
