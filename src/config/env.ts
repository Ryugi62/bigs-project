// Centralized environment helpers for server-side code

export const isProd = process.env.NODE_ENV === 'production';

export function getApiBaseUrl(): string {
  const base = process.env.API_BASE_URL || process.env.NEXT_PUBLIC_API_BASE_URL;
  if (!base) throw new Error('API base URL is not configured');
  return base;
}
