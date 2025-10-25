import axios, { AxiosError, AxiosInstance } from 'axios';

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

// Attach CSRF token for mutating methods
api.interceptors.request.use((config) => {
  const method = (config.method || 'get').toUpperCase();
  if (typeof window !== 'undefined' && ['POST', 'PUT', 'PATCH', 'DELETE'].includes(method)) {
    const token = getCookie('csrfToken');
    if (token) {
      config.headers = config.headers || {};
      (config.headers as Record<string, string>)['x-csrf-token'] = token;
    }
  }
  return config;
});

// Refresh flow on 401 once, then retry
let refreshPromise: Promise<void> | null = null;
api.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const status = error.response?.status;
    const cfg = error.config as (typeof error)['config'] & { _retry?: boolean };
    const url = cfg?.url || '';
    if (status === 401 && !cfg?._retry && !url?.includes('/auth/refresh')) {
      try {
        cfg._retry = true;
        if (!refreshPromise) {
          refreshPromise = api
            .post('/auth/refresh')
            .then(() => undefined)
            .finally(() => {
              refreshPromise = null;
            });
        }
        await refreshPromise;
        return api.request(cfg);
      } catch (_) {
        // fall through to reject original error
      }
    }
    return Promise.reject(error);
  },
);

function getCookie(name: string): string | null {
  if (typeof document === 'undefined') return null;
  const match = document.cookie.match(
    new RegExp('(?:^|; )' + name.replace(/([.$?*|{}()\[\]\\\/\+^])/g, '\\$1') + '=([^;]*)'),
  );
  return match ? decodeURIComponent(match[1]) : null;
}

export default api;
