import { DefaultOptions, QueryClient, QueryCache, MutationCache } from '@tanstack/react-query';
import { ClientError } from '@/lib/http/client';
import { useAuthStore } from '@/store/auth';
import { useToastStore } from '@/store/toast';

const defaultOptions: DefaultOptions = {
  queries: {
    retry: 1,
    refetchOnWindowFocus: false,
    staleTime: 30_000,
  },
};

function handleGlobalRQError(err: unknown) {
  const toast = useToastStore.getState();

  if (err instanceof ClientError) {
    const status = err.status;
    const message = err.message || '요청에 실패했습니다.';
    toast.push({ type: status >= 500 ? 'error' : 'warning', message });

    if (status === 401) {
      // clear auth and redirect to sign-in
      useAuthStore.getState().clear();
      if (typeof window !== 'undefined') {
        const current = window.location.pathname;
        if (current !== '/sign-in') {
          const params = new URLSearchParams();
          params.set('next', `${window.location.pathname}${window.location.search}`);
          params.set('reason', '세션이 만료되었습니다. 다시 로그인해주세요.');
          window.location.assign(`/sign-in?${params.toString()}`);
        }
      }
    }
    return;
  }

  const msg = err instanceof Error ? err.message : '요청에 실패했습니다.';
  toast.push({ type: 'error', message: msg });
}

export function createQueryClient() {
  return new QueryClient({
    defaultOptions,
    queryCache: new QueryCache({
      onError: (error, _query) => handleGlobalRQError(error),
    }),
    mutationCache: new MutationCache({
      onError: (error, _vars, _ctx, _mutation) => handleGlobalRQError(error),
    }),
  });
}
