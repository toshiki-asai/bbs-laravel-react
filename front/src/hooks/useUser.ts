import { useSyncExternalStore } from "react";
import { userStore } from "@/stores/userStore";

export function useUser() {
  const user = useSyncExternalStore(
    userStore.subscribe,
    userStore.getUser
  );
  return user;
}
