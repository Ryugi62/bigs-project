import { NextRequest } from 'next/server';
import { decodeJwt, JwtPayload } from '@/lib/auth/jwt';
import { upstream, HttpError, jsonError, jsonOk, setAuthCookies, ERROR_CODES } from '@/lib/http';
import { getRefreshToken } from '@/lib/http/cookies';

export const runtime = 'nodejs';

export async function POST(_req: NextRequest) {
  try {
    const refreshToken = await getRefreshToken();
    if (!refreshToken)
      return jsonError(401, 'No refresh token', undefined, ERROR_CODES.UNAUTHORIZED);

    const { data } = await upstream<{ accessToken: string; refreshToken?: string }>(
      'POST',
      '/auth/refresh',
      { body: { refreshToken } },
    );

    const payload = decodeJwt<JwtPayload>(data.accessToken) || undefined;
    const expSec = payload?.exp;
    const maxAge = expSec ? Math.max(expSec - Math.floor(Date.now() / 1000), 0) : 60 * 60;

    await setAuthCookies(
      { accessToken: data.accessToken, refreshToken: data.refreshToken },
      maxAge,
    );

    return jsonOk({ ok: true });
  } catch (e) {
    if (e instanceof HttpError)
      return jsonError(e.status, e.message, e.data, ERROR_CODES.REFRESH_FAILED);
    return jsonError(500, 'Refresh failed', undefined, ERROR_CODES.REFRESH_FAILED);
  }
}
