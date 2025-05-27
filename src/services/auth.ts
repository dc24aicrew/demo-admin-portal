import { api } from '@/lib/api'
import type { User } from '@/types/auth'

interface LoginRequest {
  username: string
  password: string
}

interface LoginResponse {
  token: string
  username: string
  roles: string
}

export const authService = {
  login: async (credentials: LoginRequest): Promise<User> => {
    const response = await api.post<LoginResponse>('/auth/login', credentials)

    // Store the token
    if (response.token) {
      localStorage.setItem('auth_token', response.token)
    } else {
      throw new Error('No authentication token received')
    } // Convert API response to User object
    const user: User = {
      id: response.username, // Using username as id since we don't have a specific id
      username: response.username,
      role: 'admin', // Assuming 'ADMIN' role translates to 'admin' in our app
      token: response.token,
    }

    return user
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
    const response = await api.get<{ username: string; roles: string }>(
      '/auth/verify'
    )

    // Convert API response to User object
    const user: User = {
      id: response.username,
      username: response.username,
      role: 'admin', // Assuming 'ADMIN' role translates to 'admin' in our app
    }

    return user
  },

  // Check if there's a stored token
  hasToken: (): boolean => {
    return !!localStorage.getItem('auth_token')
  },
}
