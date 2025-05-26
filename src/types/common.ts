export type Status = 'idle' | 'loading' | 'success' | 'error'

export interface PaginationParams {
  page: number
  limit: number
}

export interface PaginatedResponse<T> {
  items: T[]
  total: number
  page: number
  limit: number
  pages: number
}

export interface SortingParams {
  field: string
  direction: 'asc' | 'desc'
}

export interface FilterParams {
  [key: string]: string | number | boolean | null
}