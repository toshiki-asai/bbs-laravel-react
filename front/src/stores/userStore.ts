export type User = {
  name: string;
  email: string;
} | null

let currentUser: User | undefined = undefined;
const listeners = new Set<() => void>();

export const userStore = {
  // 状態を更新する唯一の関数
  setUser(user: User) {
    currentUser = user;
    listeners.forEach((listener) => listener());
  },
  getUser() {
    return currentUser;
  },
  isInitialized() {
    return currentUser !== undefined;
  },
  subscribe(listener: () => void) {
    listeners.add(listener);
    return () => listeners.delete(listener);
  },
};
