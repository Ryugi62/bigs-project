import { useMutation, useQueryClient } from '@tanstack/react-query';
import {
  signIn,
  signUp,
  signOut,
  fetchMe,
  SignInBody,
  SignUpBody,
  SignInResponse,
} from '@/lib/api/auth';
import { useAuthStore } from '@/store/auth';

export function useSignUpMutation() {
  return useMutation({
    mutationKey: ['auth', 'signup'],
    mutationFn: (body: SignUpBody) => signUp(body),
  });
}

export function useSignInMutation() {
  const setUser = useAuthStore((s) => s.setUser);
  const qc = useQueryClient();
  return useMutation({
    mutationKey: ['auth', 'signin'],
    mutationFn: (body: SignInBody) => signIn(body),
    onSuccess: (data: SignInResponse) => {
      setUser(data.user ?? null);
      qc.invalidateQueries();
    },
  });
}

export function useSignOutMutation() {
  const setUser = useAuthStore((s) => s.setUser);
  const qc = useQueryClient();
  return useMutation({
    mutationKey: ['auth', 'signout'],
    mutationFn: () => signOut(),
    onSuccess: () => {
      setUser(null);
      qc.clear();
    },
  });
}

export async function hydrateUserFromServer() {
  try {
    const { user } = await fetchMe();
    const setUser = useAuthStore.getState().setUser;
    setUser(user ?? null);
  } catch {
    const setUser = useAuthStore.getState().setUser;
    setUser(null);
  }
}
