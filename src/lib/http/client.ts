import axios, { AxiosError } from 'axios';
import api from '@/lib/api/client';
import type { Method, ApiErrorBody } from '@/lib/http/types';

export class ClientError<T = unknown> extends Error {
  status: number;
  code?: string;
  details?: T;
  constructor(status: number, message: string, code?: string, details?: T) {
    super(message);
    this.status = status;
    this.code = code;
    this.details = details;
  }
}

export async function request<T = unknown>(
  method: Method,
  url: string,
  options?: {
    data?: unknown;
    params?: Record<string, unknown>;
    headers?: Record<string, string>;
  },
): Promise<T> {
  try {
    const res = await api.request<T>({
      method,
      url,
      data: options?.data,
      params: options?.params,
      headers: options?.headers,
    });
    return res.data;
  } catch (err) {
    if (axios.isAxiosError(err)) {
      const e = err as AxiosError<ApiErrorBody>;
      const status = e.response?.status ?? 0;
      const body: ApiErrorBody | unknown = e.response?.data;
      const code = (body as ApiErrorBody | undefined)?.error?.code;
      let msg: string | undefined;
      if (typeof body === 'object' && body !== null) {
        const b = body as Record<string, unknown>;
        const fromNested =
          b.error &&
          typeof b.error === 'object' &&
          b.error &&
          typeof (b.error as Record<string, unknown>).message === 'string'
            ? ((b.error as Record<string, unknown>).message as string)
            : undefined;
        const fromTop = typeof b.message === 'string' ? (b.message as string) : undefined;
        msg = fromNested || fromTop;
      }
      if (!msg) msg = e.message || 'Request failed';
      const details =
        typeof body === 'object' && body !== null
          ? ((body as ApiErrorBody).error?.details ?? body)
          : undefined;
      throw new ClientError(status, msg, code, details);
    }
    throw err;
  }
}

export const get = <T = unknown>(
  url: string,
  params?: Record<string, unknown>,
  headers?: Record<string, string>,
) => request<T>('GET', url, { params, headers });

export const post = <T = unknown>(url: string, data?: unknown, headers?: Record<string, string>) =>
  request<T>('POST', url, { data, headers });

export const put = <T = unknown>(url: string, data?: unknown, headers?: Record<string, string>) =>
  request<T>('PUT', url, { data, headers });

export const patch = <T = unknown>(url: string, data?: unknown, headers?: Record<string, string>) =>
  request<T>('PATCH', url, { data, headers });

export const del = <T = unknown>(url: string, headers?: Record<string, string>) =>
  request<T>('DELETE', url, { headers });
