export interface ApiError {
  message: string
  code?: string
  details?: any
}

export interface ApiResponse<T> {
  data: T
  status: number
  success: boolean
  message?: string
}