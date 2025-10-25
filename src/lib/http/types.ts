export type Method = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

export type ApiErrorBody = {
  error?: {
    message?: string;
    code?: string;
    details?: unknown;
  };
  [k: string]: unknown;
};
