import { api } from '@/lib/api'
import { User } from '@/types/auth'

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
    localStorage.setItem('auth_token', response.token)
    
    return response.user
  },
  
  logout: async (): Promise<void> => {
    await api.post<void>('/auth/logout')
    localStorage.removeItem('auth_token')
  },
  
  verifyToken: async (): Promise<User> => {
    return await api.get<User>('/auth/verify')
  },
}