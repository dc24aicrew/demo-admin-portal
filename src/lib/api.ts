import axios, { AxiosError, AxiosRequestConfig } from 'axios'
import { ApiError } from '@/types/api'

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
    
    if (token) {
      config.headers.Authorization = `******    }
    
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
    const apiError: ApiError = {
      message: error.message || 'Unknown error occurred',
      code: error.code,
      details: error.response?.data,
    }
    
    return Promise.reject(apiError)
  }
)

export const api = {
  get: <T>(url: string, config?: AxiosRequestConfig) => {
    return axiosInstance.get<T>(url, config).then((response) => response.data)
  },
  
  post: <T>(url: string, data?: any, config?: AxiosRequestConfig) => {
    return axiosInstance.post<T>(url, data, config).then((response) => response.data)
  },
  
  put: <T>(url: string, data?: any, config?: AxiosRequestConfig) => {
    return axiosInstance.put<T>(url, data, config).then((response) => response.data)
  },
  
  delete: <T>(url: string, config?: AxiosRequestConfig) => {
    return axiosInstance.delete<T>(url, config).then((response) => response.data)
  },
}