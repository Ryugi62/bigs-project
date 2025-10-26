import { redirect } from 'next/navigation';
import { getAccessToken } from '@/lib/http/cookies';

export async function requireAuth(nextPath: string) {
  const token = await getAccessToken();
  if (!token) {
    const next = encodeURIComponent(nextPath);
    redirect(`/sign-in?next=${next}`);
  }
  return token;
}
