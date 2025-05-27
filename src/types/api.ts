export interface ApiError {
  message: string
  code?: string
  details?: any
  status?: number
}

export interface ApiResponse<T> {
  data: T
  status: number
  success: boolean
  message?: string
}