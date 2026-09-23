import { createContext, ReactNode, useContext, useEffect, useMemo, useState } from 'react'
import { authService } from '../services/authService'
import { clearSession, getSession, setSession, StoredSession } from './authStorage'

interface AuthContextValue {
  user: StoredSession | null
  isAuthenticated: boolean
  login: (username: string, password: string) => Promise<void>
  logout: () => void
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<StoredSession | null>(() => getSession())

  useEffect(() => {
    const handleUnauthorized = () => setUser(null)
    window.addEventListener('auth:unauthorized', handleUnauthorized)
    return () => window.removeEventListener('auth:unauthorized', handleUnauthorized)
  }, [])

  const login = async (username: string, password: string) => {
    const response = await authService.login({ username, password })
    const session: StoredSession = { token: response.token, username: response.username, role: response.role }
    setSession(session)
    setUser(session)
  }

  const logout = () => {
    clearSession()
    setUser(null)
  }

  const value = useMemo<AuthContextValue>(
    () => ({ user, isAuthenticated: user !== null, login, logout }),
    [user],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth(): AuthContextValue {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth debe usarse dentro de un AuthProvider')
  }
  return context
}
