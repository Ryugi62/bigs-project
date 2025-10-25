import { NextRequest } from 'next/server';
import { decodeJwt, JwtPayload } from '@/lib/auth/jwt';
import { upstream, HttpError, jsonError, jsonOk, setAuthCookies } from '@/lib/http';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { data } = await upstream<{ accessToken: string; refreshToken: string }>(
      'POST',
      '/auth/signin',
      { body },
    );

    const payload = decodeJwt<JwtPayload>(data.accessToken) || undefined;
    const expSec = payload?.exp;
    const maxAge = expSec ? Math.max(expSec - Math.floor(Date.now() / 1000), 0) : 60 * 60; // default 1h

    await setAuthCookies(
      { accessToken: data.accessToken, refreshToken: data.refreshToken },
      maxAge,
    );

    return jsonOk({ user: payload ? { name: payload.name, username: payload.username } : null });
  } catch (e) {
    if (e instanceof HttpError) return jsonError(e.status, e.message, e.data, 'SIGNIN_FAILED');
    return jsonError(500, 'Signin failed', undefined, 'SIGNIN_FAILED');
  }
}
