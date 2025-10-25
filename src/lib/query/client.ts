import { DefaultOptions, QueryClient } from '@tanstack/react-query';
import { ClientError } from '@/lib/http/client';
import { useAuthStore } from '@/store/auth';
import { useToastStore } from '@/store/toast';

const defaultOptions: DefaultOptions = {
  queries: {
    retry: 1,
    refetchOnWindowFocus: false,
    staleTime: 30 * 1000,
    onError: (err) => handleGlobalRQError(err),
  },
  mutations: {
    onError: (err) => handleGlobalRQError(err),
  },
};

function handleGlobalRQError(err: unknown) {
  const toast = useToastStore.getState();
  if (err instanceof ClientError) {
    const status = err.status;
    const message = err.message || '요청에 실패했습니다.';
    toast.push({ type: status >= 500 ? 'error' : 'warning', message });
    if (status === 401) {
      // clear auth and redirect to signin
      useAuthStore.getState().clear();
      if (typeof window !== 'undefined') {
        const current = window.location.pathname;
        if (current !== '/signin') {
          window.location.assign('/signin');
        }
      }
    }
    return;
  }
  // Fallback: unknown error
  const msg = err instanceof Error ? err.message : '요청에 실패했습니다.';
  useToastStore.getState().push({ type: 'error', message: msg });
}

export function createQueryClient() {
  return new QueryClient({ defaultOptions });
}
