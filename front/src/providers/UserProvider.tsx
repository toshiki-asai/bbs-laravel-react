import { createContext, useContext, useState, type ReactNode } from "react"

type UserContextType = {
  isLoggedIn: boolean|null;
  login: () => void;
  logout: () => void;
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export function useUser() {
  const context = useContext(UserContext)
  if (!context) {
    throw new Error('useUser must be used within a UserProvider')
  }
  return context
}

export function UserProvider({ children }: { children: ReactNode }) {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null)

  const login = () => setIsLoggedIn(true)
  const logout = () => setIsLoggedIn(false)

  return (
    <UserContext.Provider value={{isLoggedIn, login, logout}}>
      {children}
    </UserContext.Provider>
  );

}
