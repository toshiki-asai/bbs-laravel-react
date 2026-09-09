import { Alert, AlertTitle } from "@/components/ui/alert";
import { createContext, useContext, useEffect, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom";

const MessageContext = createContext(undefined);

export function useMessage() {
  const context = useContext(MessageContext)
  if (!context) {
    throw new Error('useUser must be used within a MessageProvider')
  }
  return context
}

export function MessageProvider(props) {
  const [message, setMessage] = useState(null)

  const location = useLocation();
  const checkAndSetErrorMessage = (data) => {
    if(data && data.message) {
      setMessage(data.message);
    } else if(message) {
      setMessage(null);
    }
  }

  useEffect(() =>{
    if(message){
      setMessage(null);
    }
  }, [location.pathname]);

  return (
    <MessageContext.Provider value={checkAndSetErrorMessage}>
      {message &&
        <Alert className="mb-4">
          <AlertTitle>{message}</AlertTitle>
        </Alert>
      }
      {props.children}
    </MessageContext.Provider>
  );

}
