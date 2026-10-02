import { useCallback, useEffect, useState } from 'react'
import type { ReactNode } from 'react'

interface AuthContextType {
  user: any
  isLoading: boolean
  error: string | null
}

const AuthContext = createContext<AuthContextType | null>(null)

export function createContext<T>(defaultValue: T) {
  return { Provider: ({ children, value }: { children: ReactNode; value: T }) => children, useContext: () => defaultValue }
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    // In development or local mode, set a default admin user
    if (!import.meta.env.PROD) {
      setUser({ id: 'local-dev', email: 'dev@markaz.test', role: 'admin' })
      setIsLoading(false)
    } else {
      // On production, Netlify Identity would be initialized here
      setIsLoading(false)
    }
  }, [])

  return (
    <AuthContext.Provider value={{ user, isLoading, error }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useCallback(() => ({ user: null, isLoading: false, error: null }), [])
  return context()
}
