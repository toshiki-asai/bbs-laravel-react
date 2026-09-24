type state =  "success" | "warning" | "error" | "info";
type message = {
  id: string;
  message: string | null;
  status: state;
}

let messages: message[] = [];
let keepMessage: message[] = [];
const listeners = new Set<() => void>();
const emitChange = () => listeners.forEach((listener) => listener());

export const flashMessageStore = {
  add(message: string | null, status: state, isKeepScreenTransition: boolean = false) {
    const id = crypto.randomUUID();
    if(isKeepScreenTransition){
      keepMessage = [...keepMessage, {id, message, status}];
      return;
    }
    messages = [...messages, {id, message, status}];
    emitChange();

    setTimeout(() => {
      this.remove(id);
    }, 3000);
  },
  remove(id: string) {
    messages = messages.filter((m)=>m.id !== id);
    emitChange();
  },
  margeKeepMessage(){
    messages = [...messages, ...keepMessage];
    emitChange();

    keepMessage.forEach((message)=>{
      setTimeout(() => {
        this.remove(message.id);
      }, 3000);
    })
    keepMessage = [];
  },
  getSnapshot() {
    return messages;
  },
  subscribe(listener: () => void) {
    listeners.add(listener);
    return () => listeners.delete(listener);
  },
};

export const flash = {
  success(message: string, isRedirect: boolean = false) {
    flashMessageStore.add(message, "success", isRedirect);
  },
  warning(message: string, isRedirect: boolean = false) {
    flashMessageStore.add(message, "warning", isRedirect);
  },
  error(message: string, isRedirect: boolean = false) {
    flashMessageStore.add(message, "error", isRedirect);
  },
  info(message: string, isRedirect: boolean = false) {
    flashMessageStore.add(message, "info", isRedirect);
  }

}
