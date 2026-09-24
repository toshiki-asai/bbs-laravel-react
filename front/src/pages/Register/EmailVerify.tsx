import { replace, type LoaderFunctionArgs } from "react-router";
import api from "@/services/api"

export async function loader({ url }: LoaderFunctionArgs) {
  const email = url.searchParams.get("email");
  const expires = url.searchParams.get("expires");
  const signature = url.searchParams.get("signature");

  if(!email || !expires || !signature) {
    throw new Response("Not Found", { status: 404 });
  }
  await api.get('/verify', { params: {
      email: email,
      expires: expires,
      signature: signature
  }});
  return replace("/register");
}
