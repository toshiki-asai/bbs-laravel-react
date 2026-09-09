import { createContext, useContext, useState } from "react"

const UserContext = createContext(undefined);

export function useUser() {
  const context = useContext(UserContext)
  if (!context) {
    throw new Error('useUser must be used within a UserProvider')
  }
  return context
}

export function UserProvider(props) {
  const [isLoggedIn, setIsLoggedIn] = useState(null)

  const login = () => setIsLoggedIn(true)
  const logout = () => setIsLoggedIn(false)

  return (
    <UserContext.Provider value={[isLoggedIn, login, logout]}>
      {props.children}
    </UserContext.Provider>
  );

}
