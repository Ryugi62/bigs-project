import { NextRequest } from 'next/server';
import { clearAuthCookies, jsonError, getCsrfCookie } from '@/lib/http';

export const runtime = 'nodejs';

export async function POST(req: NextRequest) {
  // CSRF protection for signout
  const cookieToken = await getCsrfCookie();
  const header = req.headers.get('x-csrf-token');
  if (!cookieToken || !header || header !== cookieToken) {
    return jsonError(403, 'Invalid CSRF token', undefined, 'CSRF_INVALID');
  }
  await clearAuthCookies();
  return new Response(null, { status: 200 });
}
