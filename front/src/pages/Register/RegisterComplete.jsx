import { data, Link, useLocation } from "react-router-dom"

export default function RegisterComplete() {
  const location = useLocation();
  const state = location.state;
  const email = state?.email !== undefined ? state.email : '';
  const username = state?.username !== undefined ? state.username : '';

  if(!email || !username) {
    throw new data("Not Found", { status: 404 });
  }

  return (
    <>
      <title>登録完了｜掲示板</title>
      <h2 className="text-lg font-bold">登録完了</h2>
      <p className="my-2">以下の情報でご登録が完了いたしました。</p>
      <div className="my-6 space-y-4">
          <div className="relative w-full">
              <div className="font-sans antialiased text-sm text-stone-800 font-semibold">メールアドレス</div>
              <div>{ email }</div>
          </div>
          <div className="relative w-full">
              <div className="font-sans antialiased text-sm text-stone-800 font-semibold">ユーザー名</div>
              <div>{ username }</div>
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
