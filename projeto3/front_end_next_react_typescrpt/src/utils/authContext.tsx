'use client'

import { useRouter } from 'next/router'
import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState
} from 'react'
import { authService } from '../services/authService'

export type AuthContextType = {
  isAuthenticated: boolean
  isloggedwithToken: (token: string) => void
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthContextProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false)
  const router = useRouter()

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      console.log("DEBUG token: ", token)
      authService.validateToken(token).then((isValid) => {
        if (!isValid) {
          localStorage.removeItem('token')
          setIsAuthenticated(false)
          router.push('/login')
        }
      })
    } else {
      localStorage.removeItem('token')
      setIsAuthenticated(false)
      router.push('/login')
    }
  }, [])

  const isloggedwithToken = (token:string) => {
    localStorage.setItem('token', token)
    setIsAuthenticated(true)
    router.push('/home')
  }

  const logout = () => {
    localStorage.removeItem('token')
    setIsAuthenticated(false)
    router.push('/login')
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, isloggedwithToken, logout}}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthContextProvider')
  }
  return context
}
