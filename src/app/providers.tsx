'use client';

import { QueryClientProvider } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { createQueryClient } from '@/lib/query/client';
import { hydrateUserFromServer } from '@/lib/query/auth';
import { useAuthStore } from '@/store/auth';

export default function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(() => createQueryClient());
  const hasUser = useAuthStore((state) => Boolean(state.user));
  useEffect(() => {
    if (!hasUser) return;
    hydrateUserFromServer();
  }, [hasUser]);
  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
}
