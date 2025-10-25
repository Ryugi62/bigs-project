import axios, { AxiosError, AxiosInstance } from 'axios';
import { getApiBaseUrl } from '@/config/env';
import type { Method } from '@/lib/http/types';

export class HttpError<T = unknown> extends Error {
  status: number;
  data?: T;
  constructor(status: number, message?: string, data?: T) {
    super(message || `HTTP ${status}`);
    this.status = status;
    this.data = data;
  }
}

let upstreamClient: AxiosInstance | null = null;
function getUpstream(): AxiosInstance {
  if (!upstreamClient) {
    const API_BASE = getApiBaseUrl();
    upstreamClient = axios.create({
      baseURL: API_BASE,
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      // no cookies to upstream
      withCredentials: false,
    });
  }
  return upstreamClient;
}

export async function upstream<T = unknown>(
  method: Method,
  path: string,
  options?: {
    body?: unknown;
    token?: string | null;
    headers?: Record<string, string>;
  },
): Promise<{ data: T; status: number; headers: Record<string, string> }> {
  try {
    const headers: Record<string, string> = { ...(options?.headers || {}) };
    if (options?.token) headers['Authorization'] = `Bearer ${options.token}`;
    const res = await getUpstream().request<T>({
      method,
      url: path,
      data: options?.body,
      headers,
      // Axios parses JSON automatically
      responseType: 'json',
      validateStatus: () => true, // handle non-2xx manually
    });
    const allHeaders: Record<string, string> = {};
    Object.entries(res.headers || {}).forEach(([k, v]) => {
      if (typeof v === 'string') allHeaders[k.toLowerCase()] = v;
      else if (Array.isArray(v)) allHeaders[k.toLowerCase()] = v.join(', ');
    });
    if (res.status >= 200 && res.status < 300) {
      return { data: res.data, status: res.status, headers: allHeaders };
    }
    throw new HttpError(res.status, undefined, res.data as T);
  } catch (err) {
    if (axios.isAxiosError(err)) {
      const e = err as AxiosError<unknown>;
      const status = e.response?.status ?? 500;
      const data = e.response?.data;
      const message =
        typeof data === 'object' &&
        data !== null &&
        'message' in (data as Record<string, unknown>) &&
        typeof (data as Record<string, unknown>).message === 'string'
          ? ((data as Record<string, unknown>).message as string)
          : e.message;
      throw new HttpError(status, message, data);
    }
    throw err;
  }
}
