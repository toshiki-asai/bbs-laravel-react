import { replace } from "react-router-dom";
import api from "@/services/api"

export async function loader({request}) {

  const url = new URL(request.url);
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
