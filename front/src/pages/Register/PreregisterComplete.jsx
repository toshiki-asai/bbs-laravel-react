import { useLocation } from "react-router-dom";

export default function PreregisterComplete() {

  const location = useLocation();
  const state = location.state;

  const url = state?.url !== undefined ? state.url : '';

  return (
    <>
      <title>本登録案内送信完了｜掲示板</title>
      <div>
        ご登録のメールアドレスへ本登録用のメールを送信しました。<br/>
        メールに記載されたURLから本登録を行ってください。<br/>
        <br/>
        <br/>
        <a href={ url }>{ url }</a>
      </div>
    </>
  );
}
