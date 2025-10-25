import { Buffer } from 'buffer';
export type JwtPayload = {
  // Server appears to include at least these two fields in payload
  name?: string;
  username?: string;
  iat?: number;
  exp?: number;
  [key: string]: unknown;
};

export function decodeJwt<T extends object = JwtPayload>(token: string): T | null {
  try {
    const [, payloadBase64] = token.split('.');
    if (!payloadBase64) return null;
    const base64 = payloadBase64.replace(/-/g, '+').replace(/_/g, '/');
    const padded = base64 + '==='.slice((base64.length + 3) % 4);
    let json = '';
    if (typeof window === 'undefined') {
      // Node/SSR
      json = Buffer.from(padded, 'base64').toString('utf8');
    } else {
      // Browser
      const binary = atob(padded);
      try {
        // Convert binary string to UTF-8
        json = decodeURIComponent(
          Array.prototype.map
            .call(binary, (c: string) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
            .join(''),
        );
      } catch {
        json = binary;
      }
    }
    return JSON.parse(json) as T;
  } catch {
    return null;
  }
}

export function isJwtExpired(token: string): boolean {
  const payload = decodeJwt<JwtPayload>(token);
  if (!payload?.exp) return false;
  const nowSec = Math.floor(Date.now() / 1000);
  return payload.exp <= nowSec;
}
