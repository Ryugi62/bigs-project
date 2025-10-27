import { redirect } from 'next/navigation';
import { getAccessToken } from '@/lib/http/cookies';

const DEFAULT_MESSAGE = '로그인 후에 이용하실 수 있는 메뉴입니다.';

export async function requireAuth(nextPath: string, message?: string) {
  const token = await getAccessToken();
  if (!token) {
    const params = new URLSearchParams();
    if (nextPath) params.set('next', nextPath);
    params.set('reason', message || DEFAULT_MESSAGE);
    redirect(`/sign-in?${params.toString()}`);
  }
  return token;
}
