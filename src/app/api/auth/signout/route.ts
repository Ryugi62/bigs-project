import { clearAuthCookies } from '@/lib/http';

export async function POST() {
  await clearAuthCookies();
  return new Response(null, { status: 200 });
}
