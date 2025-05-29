import axios, {
  AxiosError,
  type AxiosRequestConfig,
  type AxiosRequestHeaders,
} from 'axios'
import type { ApiError } from '@/types/api'

const apiUrl = import.meta.env.VITE_API_URL

const axiosInstance = axios.create({
  baseURL: apiUrl,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Request interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('auth_token')

    if (!config.headers) {
      config.headers = {} as AxiosRequestHeaders
    }
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }

    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Response interceptor
axiosInstance.interceptors.response.use(
  (response) => {
    return response
  },
  (error: AxiosError) => {
    // Handle authentication errors (401 Unauthorized)
    if (
      error.response?.status === 401 &&
      // Don't redirect on login/logout/verify endpoints
      (() => {
        try {
          const url = new URL(error.config?.url || '', apiUrl)
          const allowedPaths = ['/auth/login', '/auth/logout', '/auth/verify']
          return !allowedPaths.includes(url.pathname)
        } catch {
          return true // Default to redirecting if URL parsing fails
        }
      })()
    ) {
      // Clear auth data on unauthorized errors
      localStorage.removeItem('auth_token')
      localStorage.removeItem('auth_user')

      // Redirect to login page if we're in browser environment
      if (typeof window !== 'undefined') {
        window.location.href = '/auth/login'
      }
    }

    const apiError: ApiError = {
      message: error.message || 'Unknown error occurred',
      code: error.code,
      details: error.response?.data,
      status: error.response?.status,
    }

    return Promise.reject(apiError)
  }
)

export const api = {
  get: <T>(url: string, config?: AxiosRequestConfig) => {
    return axiosInstance.get<T>(url, config).then((response) => response.data)
  },

  post: <T, D = unknown>(
    url: string,
    data?: D,
    config?: AxiosRequestConfig
  ) => {
    return axiosInstance
      .post<T>(url, data, config)
      .then((response) => response.data)
  },

  put: <T, D = unknown>(url: string, data?: D, config?: AxiosRequestConfig) => {
    return axiosInstance
      .put<T>(url, data, config)
      .then((response) => response.data)
  },

  patch: <T, D = unknown>(
    url: string,
    data?: D,
    config?: AxiosRequestConfig
  ) => {
    return axiosInstance
      .patch<T>(url, data, config)
      .then((response) => response.data)
  },

  delete: <T>(url: string, config?: AxiosRequestConfig) => {
    return axiosInstance
      .delete<T>(url, config)
      .then((response) => response.data)
  },
}
