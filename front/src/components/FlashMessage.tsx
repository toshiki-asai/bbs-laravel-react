import { Alert, AlertTitle } from "@/components/ui/alert";
import { flashMessageStore } from "@/stores/flashMessageStore";
import { AlertCircleIcon, AlertTriangleIcon, CheckCircle2Icon, InfoIcon } from "lucide-react";
import { useEffect, useSyncExternalStore } from "react";
import { useLocation } from "react-router";

export default function FlashMessage() {
  const location = useLocation();
  const messages = useSyncExternalStore(
    flashMessageStore.subscribe,
    flashMessageStore.getSnapshot
  );

  useEffect(()=>{
    flashMessageStore.margeKeepMessage();
  }, [location.pathname]);

  if (messages.length === 0) return null;

  return (
    <div className="w-auto mx-auto md:w-3/4 fixed flex flex-col inset-x-1 top-20 gap-1">
      {messages.map((message) => (
      <Alert key={message.id} variant={message.status === "error" ? "destructive" : "default"}>
        {message.status === "info" && <InfoIcon />}
        {message.status === "success" && <CheckCircle2Icon />}
        {message.status === "warning" && <AlertTriangleIcon />}
        {message.status === "error" && <AlertCircleIcon />}
        <AlertTitle>{message.message}</AlertTitle>
      </Alert>
      ))}
    </div>
  );
}
