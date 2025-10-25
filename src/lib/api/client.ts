import axios, { AxiosInstance, InternalAxiosRequestConfig } from 'axios';

// Base API client for server communication
// - Uses NEXT_PUBLIC_API_BASE_URL from environment
// - Adds JSON headers and a sane timeout
// - Attaches Authorization header from localStorage when available (client-side only)

const api: AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
  withCredentials: false,
});

api.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  if (typeof window !== 'undefined') {
    try {
      const token = localStorage.getItem('accessToken');
      if (token) {
        config.headers = {
          ...config.headers,
          Authorization: `Bearer ${token}`,
        } as any;
      }
    } catch {
      // no-op: accessing localStorage may fail in some environments
    }
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Forward error as-is; customize globally later if needed
    return Promise.reject(error);
  },
);

export default api;

