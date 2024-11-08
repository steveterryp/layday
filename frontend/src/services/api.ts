import axios, { AxiosError, AxiosInstance, AxiosRequestConfig } from 'axios';
import { ApiResponse } from '../types/common';

// Create axios instance with default config
const api: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:4000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor for API calls
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for API calls
api.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as AxiosRequestConfig & { _retry?: boolean };

    // Handle 401 Unauthorized errors (token expired)
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const refreshToken = localStorage.getItem('refreshToken');
        const response = await axios.post('/auth/refresh', { refreshToken });
        const { accessToken } = response.data;
        
        localStorage.setItem('accessToken', accessToken);
        
        if (originalRequest.headers) {
          originalRequest.headers.Authorization = `Bearer ${accessToken}`;
        }
        
        return api(originalRequest);
      } catch (refreshError) {
        // Refresh token failed, redirect to login
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        window.location.href = '/login';
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);

// Generic API request method
async function request<T>(config: AxiosRequestConfig): Promise<ApiResponse<T>> {
  try {
    const response = await api(config);
    return {
      data: response.data,
      status: response.status,
      message: response.statusText,
    };
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw {
        message: error.response?.data?.message || error.message,
        status: error.response?.status || 500,
        data: error.response?.data,
      };
    }
    throw {
      message: 'An unexpected error occurred',
      status: 500,
      data: null,
    };
  }
}

// Utility methods for common HTTP methods
export const apiService = {
  get: <T>(url: string, config?: AxiosRequestConfig) =>
    request<T>({ ...config, method: 'GET', url }),

  post: <T>(url: string, data?: any, config?: AxiosRequestConfig) =>
    request<T>({ ...config, method: 'POST', url, data }),

  put: <T>(url: string, data?: any, config?: AxiosRequestConfig) =>
    request<T>({ ...config, method: 'PUT', url, data }),

  patch: <T>(url: string, data?: any, config?: AxiosRequestConfig) =>
    request<T>({ ...config, method: 'PATCH', url, data }),

  delete: <T>(url: string, config?: AxiosRequestConfig) =>
    request<T>({ ...config, method: 'DELETE', url }),
};

export default apiService;
