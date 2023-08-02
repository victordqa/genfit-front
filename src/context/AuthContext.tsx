"use client"

import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useState,
} from "react"

interface AuthState {
  coachData: { name: string; email: string; id: number } | null
}

interface AuthStateWithSet extends AuthState {
  setAuth: Dispatch<SetStateAction<AuthState>>
}

export const AuthenticationContext = createContext<AuthStateWithSet>({
  coachData: null,
  setAuth: () => {},
})

export default function AuthContext({ children }: { children: ReactNode }) {
  const [auth, setAuth] = useState<AuthState>({ coachData: null })

  return (
    <AuthenticationContext.Provider value={{ ...auth, setAuth }}>
      {children}
    </AuthenticationContext.Provider>
  )
}
