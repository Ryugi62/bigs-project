import { NextRequest } from 'next/server';
import {
  getAccessToken,
  upstream,
  HttpError,
  jsonError,
  jsonOk,
  ensureCsrfCookie,
  getCsrfCookie,
  ERROR_CODES,
} from '@/lib/http';

/** Build upstream path including query string */
function buildBoardsPath(req: NextRequest, segments: string[] = []) {
  const qs = req.nextUrl.search || '';
  const suffix = segments.join('/');
  return suffix ? `/boards/${suffix}${qs}` : `/boards${qs}`;
}

/** Generic handler for boards proxy without request body */
export async function handleBoardsNoBody(
  method: 'GET' | 'DELETE',
  req: NextRequest,
  segments?: string[],
) {
  try {
    if (method === 'GET') {
      await ensureCsrfCookie();
    } else if (method === 'DELETE') {
      const header = req.headers.get('x-csrf-token');
      const token = await getCsrfCookie();
      if (!header || !token || header !== token) {
        return jsonError(403, 'Invalid CSRF token', undefined, ERROR_CODES.CSRF_INVALID);
      }
    }
    const token = await getAccessToken();
    const url = buildBoardsPath(req, segments || []);
    const { data, status } = await upstream(method, url, { token });
    return jsonOk(data, { status });
  } catch (e) {
    const code =
      method === 'GET' ? ERROR_CODES.BOARDS_FETCH_FAILED : ERROR_CODES.BOARDS_DELETE_FAILED;
    if (e instanceof HttpError) return jsonError(e.status, e.message, e.data, code);
    return jsonError(500, 'Boards request failed', undefined, code);
  }
}

/** Generic handler for boards proxy with JSON request body */
export async function handleBoardsWithBody(
  method: 'POST' | 'PUT' | 'PATCH',
  req: NextRequest,
  segments?: string[],
) {
  try {
    const header = req.headers.get('x-csrf-token');
    const tokenCookie = await getCsrfCookie();
    if (!header || !tokenCookie || header !== tokenCookie) {
      return jsonError(403, 'Invalid CSRF token', undefined, ERROR_CODES.CSRF_INVALID);
    }
    const token = await getAccessToken();
    const body = await req.json();
    const url = buildBoardsPath(req, segments || []);
    const { data, status } = await upstream(method, url, { token, body });
    return jsonOk(data, { status });
  } catch (e) {
    const code =
      method === 'POST'
        ? ERROR_CODES.BOARDS_CREATE_FAILED
        : method === 'PUT'
          ? ERROR_CODES.BOARDS_UPDATE_FAILED
          : ERROR_CODES.BOARDS_PATCH_FAILED;
    if (e instanceof HttpError) return jsonError(e.status, e.message, e.data, code);
    return jsonError(500, 'Boards request failed', undefined, code);
  }
}
