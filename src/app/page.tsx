import Header from '@/components/Header';
import { HydrationBoundary, QueryClient, dehydrate } from '@tanstack/react-query';
import type { Board } from '@/types/boards';
import { upstream } from '@/lib/http/upstream';
import { getAccessToken } from '@/lib/http/cookies';

async function getInitialBoards(): Promise<Board[]> {
  const token = await getAccessToken();
  const { data } = await upstream<Board[]>('GET', '/boards', { token });
  return data;
}
export default async function Home() {
  const qc = new QueryClient();
  await qc.prefetchQuery({ queryKey: ['boards'], queryFn: getInitialBoards });
  const state = dehydrate(qc);
  return (
    <HydrationBoundary state={state}>
      <div className="h-full">
        <Header />
      </div>
    </HydrationBoundary>
  );
}
