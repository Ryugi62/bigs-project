'use client';

import { QueryClientProvider } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { createQueryClient } from '@/lib/query/client';
import { hydrateUserFromServer } from '@/lib/query/auth';

export default function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(() => createQueryClient());
  useEffect(() => {
    hydrateUserFromServer();
  }, []);
  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
}
