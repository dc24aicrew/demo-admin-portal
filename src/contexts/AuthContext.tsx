import { createContext, useState, useEffect } from 'react'
import type { ReactNode } from 'react'
import type { User } from '@/types/auth'
import { authService } from '@/services/auth'

interface AuthContextType {
  user: User | null
  isAuthenticated: boolean
  loading: boolean
  login: (user: User) => void
  logout: () => void
}

export const AuthContext = createContext<AuthContextType | null>(null)

interface AuthProviderProps {
  children: ReactNode
}

// Key for storing user data in localStorage
const USER_STORAGE_KEY = 'auth_user'

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  // Try to restore session on mount
  useEffect(() => {
    const initAuth = async () => {
      try {
        const storedUser = localStorage.getItem(USER_STORAGE_KEY)
        const token = localStorage.getItem('auth_token')
        
        if (storedUser && token) {
          // If we have both user data and token, verify the token
          try {
            await authService.verifyToken()
            setUser(JSON.parse(storedUser))
          } catch (error) {
            // If token verification fails, clear storage
            localStorage.removeItem(USER_STORAGE_KEY)
            localStorage.removeItem('auth_token')
          }
        }
      } catch (error) {
        console.error('Failed to initialize auth:', error)
      } finally {
        setLoading(false)
      }
    }

    initAuth()
  }, [])

  const login = (userData: User) => {
    setUser(userData)
    localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(userData))
  }

  const logout = () => {
    authService.logout().catch(console.error)
    localStorage.removeItem(USER_STORAGE_KEY)
    localStorage.removeItem('auth_token')
    setUser(null)
  }

  const value = {
    user,
    isAuthenticated: !!user,
    loading,
    login,
    logout,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
