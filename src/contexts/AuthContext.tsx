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
  loading: boolean
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

  // Verify token on app initialization
  useEffect(() => {
    const verifyAuth = async () => {
      try {
        // Check if token exists in localStorage
        const token = localStorage.getItem('auth_token')
        if (token) {
          // Verify the token and get user data
          const userData = await authService.verifyToken()
          setUser(userData)
        }
      } catch (error) {
        console.error('Authentication verification failed:', error)
        // Clear invalid token
        localStorage.removeItem('auth_token')
      } finally {
        setLoading(false)
      }
    }

    verifyAuth()
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
    localStorage.removeItem('auth_token')
  }

  const value = {
    user,
    isAuthenticated: !!user,
    loading,
    login,
    logout,
    loading,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
