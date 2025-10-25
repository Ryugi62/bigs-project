import { get, post } from '@/lib/http/client';
import type { User } from '@/types/auth';

export type SignUpBody = {
  username: string; // 이메일 형식
  name: string; // 사용자 이름
  password: string; // 8자 이상, 영문/숫자/특수문자 조합
  confirmPassword: string;
};

export type SignInBody = {
  username: string; // 이메일
  password: string;
};

export type SignInResponse = {
  user: User | null;
};

export async function signUp(body: SignUpBody): Promise<void> {
  await post('/auth/signup', body);
}

export async function signIn(body: SignInBody): Promise<SignInResponse> {
  return await post<SignInResponse>('/auth/signin', body);
}

export async function signOut(): Promise<void> {
  await post('/auth/signout');
}

export async function fetchMe(): Promise<{ user: User | null }> {
  return await get<{ user: User | null }>('/auth/me');
}
