import { useSearchParams } from "react-router";

export default function PreregisterComplete() {
  const [searchParams] = useSearchParams();
  const url = searchParams.get('url');

  return (
    <>
      <title>本登録案内送信完了｜掲示板</title>
      <div>
        ご登録のメールアドレスへ本登録用のメールを送信しました。<br/>
        メールに記載されたURLから本登録を行ってください。
        { url &&
          <>
            <br/><br/><br/>
            <a href={ url }>{ url }</a>
          </>
        }
      </div>
    </>
  );
}
