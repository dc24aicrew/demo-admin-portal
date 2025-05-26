import { api } from '@/lib/api'
import type { User } from '@/types/auth'

interface LoginRequest {
  username: string
  password: string
}

interface LoginResponse {
  user: User
  token: string
}

export const authService = {
  login: async (credentials: LoginRequest): Promise<User> => {
    const response = await api.post<LoginResponse>('/auth/login', credentials)

    // Store the token
    if (response.token) {
      localStorage.setItem('auth_token', response.token)
    } else {
      throw new Error('No authentication token received')
    }

    return response.user
  },

  logout: async (): Promise<void> => {
    try {
      await api.post<void>('/auth/logout')
    } catch (error) {
      console.error('Logout API error:', error)
      // Continue with local logout even if API call fails
    }
    
    // Always clear local storage on logout
    localStorage.removeItem('auth_token')
  },

  verifyToken: async (): Promise<User> => {
    return await api.get<User>('/auth/verify')
  },

  // Check if there's a stored token
  hasToken: (): boolean => {
    return !!localStorage.getItem('auth_token')
  },
}
