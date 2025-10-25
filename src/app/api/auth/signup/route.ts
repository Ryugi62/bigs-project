import { NextRequest } from 'next/server';
import { upstream, HttpError, jsonError } from '@/lib/http';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { status } = await upstream('POST', '/auth/signup', { body });
    return new Response(null, { status }); // upstream returns no body on success
  } catch (e) {
    if (e instanceof HttpError) return jsonError(e.status, e.message, e.data, 'SIGNUP_FAILED');
    return jsonError(500, 'Signup failed', undefined, 'SIGNUP_FAILED');
  }
}
