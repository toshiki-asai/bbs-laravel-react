import { Alert, AlertTitle } from "@/components/ui/alert";
import { createContext, useContext, useEffect, useState, type ReactNode } from "react"
import { useLocation } from "react-router";

type MessageContextType = {
  setMessage: (message: string|undefined|null) => void
}

const MessageContext = createContext<MessageContextType | undefined>(undefined);

export function useMessage() {
  const context = useContext(MessageContext)
  if (!context) {
    throw new Error('useUser must be used within a MessageProvider')
  }
  return context
}

export function MessageProvider({ children }: { children: ReactNode }) {
  const [message, setMessage] = useState<string|undefined|null>(null)

  const location = useLocation();
  useEffect(() =>{
    if(message){
      setMessage(null);
    }
  }, [location.pathname]);

  return (
    <MessageContext.Provider value={{setMessage}}>
      {message &&
        <Alert className="mb-4">
          <AlertTitle>{message}</AlertTitle>
        </Alert>
      }
      {children}
    </MessageContext.Provider>
  );

}
