import { decodeJwt, JwtPayload } from '@/lib/auth/jwt';
import { jsonError, jsonOk, getAccessToken } from '@/lib/http';

export async function GET() {
  const access = await getAccessToken();
  if (!access) return jsonError(401, 'Unauthorized', undefined, 'UNAUTHORIZED');
  const payload = decodeJwt<JwtPayload>(access);
  if (!payload) return jsonError(401, 'Unauthorized', undefined, 'UNAUTHORIZED');
  return jsonOk({ user: { name: payload.name, username: payload.username } });
}
