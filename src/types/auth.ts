export interface User {
  id: string
  username: string
  role: 'admin'
  token?: string
}

export interface AuthState {
  user: User | null
  loading: boolean
  error: string | null
}

export interface LoginCredentials {
  username: string
  password: string
}