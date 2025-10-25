import axios, { AxiosInstance } from 'axios';

// Base client for calling our own Next API routes
// - baseURL '/api' (BFF)
// - sends cookies (withCredentials)
// - JSON headers + timeout

const api: AxiosInstance = axios.create({
  baseURL: '/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
  withCredentials: true,
});

api.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject(error),
);

export default api;
