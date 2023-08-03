"use client"

import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useEffect,
  useState,
} from "react"
import { useGet } from "../hooks/useHttp"
import routes from "../routes"
import { publicRoutes } from "../routes"
import { usePathname, useRouter } from "next/navigation"
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

  const pathname = usePathname()
  const { push } = useRouter()

  //make a call to me api
  //set state based on call - null if unauthorized and data if authorized
  useEffect(() => {
    console.log("effect")
    useGet(`${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}${routes.me}`).then(
      (res) => {
        const statusCode = res.status

        if (statusCode === 200) {
          const { name, email, id } = res.data.coach
          // set global states
          setAuth({ coachData: { name, email, id } })
        } else {
          console.log(res)
          if (!publicRoutes.includes(pathname)) {
            push(routes.home)
          }
        }
      }
    )
  }, [])

  return (
    <AuthenticationContext.Provider value={{ ...auth, setAuth }}>
      {children}
    </AuthenticationContext.Provider>
  )
}
