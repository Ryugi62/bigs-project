import PageHero from '@/components/layout/PageHero';
import BoardGrid from '@/components/boards/BoardGrid';
import InsightBanner from '@/components/boards/InsightBanner';
import TrendsRibbon from '@/components/boards/TrendsRibbon';
import type { Board } from '@/types/boards';
import type { BoardListResponse } from '@/types/boards';
import { getAccessToken } from '@/lib/http/cookies';
import { upstream } from '@/lib/http/upstream';
import { HydrationBoundary, QueryClient, dehydrate } from '@tanstack/react-query';
import { mapListToBoards, boardsQueryKey } from '@/lib/query/boards';
import { HttpError } from '@/lib/http/upstream';

async function getInitialBoards(): Promise<Board[]> {
  try {
    const token = await getAccessToken();
    if (!token) {
      return [];
    }
    const { data } = await upstream<BoardListResponse>('GET', '/boards?page=0&size=10', { token });
    return mapListToBoards(data);
  } catch (error) {
    if (error instanceof HttpError) {
      if (error.status === 401 || error.status === 403) {
        return [];
      }
      console.error('Failed to prefetch boards', error.status, error.message);
      return [];
    }
    if (
      error instanceof Error &&
      (error.message.includes('ENOTFOUND') || error.message.includes('getaddrinfo'))
    ) {
      console.warn('Skipping board prefetch: upstream host unreachable.');
      return [];
    }
    throw error;
  }
}

export default async function HomePage() {
  const queryClient = new QueryClient();
  const boards = await getInitialBoards();
  queryClient.setQueryData(boardsQueryKey(), boards);
  const state = dehydrate(queryClient);

  return (
    <HydrationBoundary state={state}>
      <div className="flex flex-col gap-10">
        <PageHero
          eyebrow="My Ops Workspace"
          title="내가 작성한 게시글을 한 곳에서 관리"
          description="인증된 사용자 본인의 게시글만 안전하게 모아두고, 카테고리와 키워드로 빠르게 찾아 바로 수정하거나 삭제할 수 있어요."
          actions={<TrendsRibbon />}
        />
        <InsightBanner />
        <BoardGrid />
      </div>
    </HydrationBoundary>
  );
}
