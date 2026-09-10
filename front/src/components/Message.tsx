import { useActionData, useNavigation } from "react-router";
import { useEffect, useState } from "react";
import { Alert, AlertTitle } from "@/components/ui/alert";

export default function Message() {
  const actionData = useActionData();
  const navigation = useNavigation();
  const [message, setMessage] = useState(null);

  // actionDataが変わったらメッセージをセット
  useEffect(() => {
    if (actionData && actionData.status !== "success") {
      setMessage(actionData.message);
    }
  }, [actionData]);

  // 次の送信（サブミット）が始まったら古いメッセージを消す
  useEffect(() => {
    if (navigation.state === 'submitting') {
      setMessage(null);
    }
  }, [navigation.state]);

  if(!message) return null;

  return (
    <Alert>
      <AlertTitle>{message}</AlertTitle>
    </Alert>
  )
}
