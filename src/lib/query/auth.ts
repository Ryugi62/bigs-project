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
    onSuccess: async (data: SignInResponse) => {
      setUser(data.user ?? null);
      useAuthStore.getState().setHydrationStatus('done');
      try {
        const me = await fetchMe();
        setUser(me.user ?? data.user ?? null);
        useAuthStore.getState().setHydrationStatus('done');
      } catch {
        // ignore fetch-me failure; user may be unauthenticated
        useAuthStore.getState().setHydrationStatus('done');
      }
      qc.invalidateQueries({ queryKey: ['boards'] });
      qc.invalidateQueries({ queryKey: ['boards', 'latest'] });
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
      useAuthStore.getState().setHydrationStatus('done');
      qc.clear();
    },
  });
}

export async function hydrateUserFromServer() {
  const store = useAuthStore.getState();
  if (store.hydrationStatus === 'loading') return;
  store.setHydrationStatus('loading');
  try {
    const { user } = await fetchMe();
    useAuthStore.getState().setUser(user ?? null);
  } catch {
    useAuthStore.getState().setUser(null);
  } finally {
    useAuthStore.getState().setHydrationStatus('done');
  }
}
