import { data, Link, useLoaderData, type LoaderFunctionArgs } from "react-router"

export function loader({ request }: LoaderFunctionArgs) {
  const url = new URL(request.url);
  const name = url.searchParams.get("name") || "";
  const email = url.searchParams.get("email") || "";

  if(!name || !email) {
    throw data(null, { status: 404 });
  }

  return data({name:name, email:email});
}

export default function RegisterComplete() {
  const data = useLoaderData();

  return (
    <>
      <title>登録完了｜掲示板</title>
      <h2 className="text-lg font-bold">登録完了</h2>
      <p className="my-2">以下の情報でご登録が完了いたしました。</p>
      <div className="my-6 space-y-4">
          <div className="relative w-full">
              <div className="font-sans antialiased text-sm text-stone-800 font-semibold">メールアドレス</div>
              <div>{ data.email }</div>
          </div>
          <div className="relative w-full">
              <div className="font-sans antialiased text-sm text-stone-800 font-semibold">ユーザー名</div>
              <div>{ data.name }</div>
          </div>
          <div className="relative w-full">
              <div className="font-sans antialiased text-sm text-stone-800 font-semibold">パスワード</div>
              <div>********</div>
          </div>
      </div>
      <p><Link to="/posts" className="font-semibold text-indigo-400 hover:text-indigo-300">こちら</Link>から掲示板をご利用いただけます。</p>
    </>
  )
}
