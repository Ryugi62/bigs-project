import { cookies } from 'next/headers';
import { isProd } from '@/config/env';

export const ACCESS_TOKEN_COOKIE = 'accessToken';
export const REFRESH_TOKEN_COOKIE = 'refreshToken';
export const CSRF_TOKEN_COOKIE = 'csrfToken';

export async function setAuthCookies(
  tokens: { accessToken: string; refreshToken?: string },
  maxAge?: number,
) {
  const cookieStore = await cookies();
  cookieStore.set(ACCESS_TOKEN_COOKIE, tokens.accessToken, {
    httpOnly: true,
    secure: isProd,
    sameSite: 'lax',
    path: '/',
    ...(typeof maxAge === 'number' ? { maxAge } : {}),
  });
  if (tokens.refreshToken) {
    cookieStore.set(REFRESH_TOKEN_COOKIE, tokens.refreshToken, {
      httpOnly: true,
      secure: isProd,
      sameSite: 'lax',
      path: '/',
    });
  }
}

export async function clearAuthCookies() {
  const cookieStore = await cookies();
  cookieStore.set(ACCESS_TOKEN_COOKIE, '', {
    path: '/',
    httpOnly: true,
    secure: isProd,
    sameSite: 'lax',
    maxAge: 0,
  });
  cookieStore.set(REFRESH_TOKEN_COOKIE, '', {
    path: '/',
    httpOnly: true,
    secure: isProd,
    sameSite: 'lax',
    maxAge: 0,
  });
}

export async function getAccessToken() {
  const cookieStore = await cookies();
  return cookieStore.get(ACCESS_TOKEN_COOKIE)?.value ?? null;
}

export async function getRefreshToken() {
  const cookieStore = await cookies();
  return cookieStore.get(REFRESH_TOKEN_COOKIE)?.value ?? null;
}

export async function ensureCsrfCookie() {
  const cookieStore = await cookies();
  const exists = cookieStore.get(CSRF_TOKEN_COOKIE)?.value;
  if (!exists) {
    const token =
      typeof crypto !== 'undefined' && 'randomUUID' in crypto
        ? crypto.randomUUID()
        : Math.random().toString(36).slice(2);
    cookieStore.set(CSRF_TOKEN_COOKIE, token, {
      httpOnly: false,
      secure: isProd,
      sameSite: 'lax',
      path: '/',
    });
    return token;
  }
  return exists;
}

export async function getCsrfCookie() {
  const cookieStore = await cookies();
  return cookieStore.get(CSRF_TOKEN_COOKIE)?.value ?? null;
}
