import PageHero from '@/components/layout/PageHero';
import LatestBoardsSection from '@/components/boards/LatestBoardsSection';
import InsightBanner from '@/components/boards/InsightBanner';
import TrendsRibbon from '@/components/boards/TrendsRibbon';
import type { BoardListResponse } from '@/types/boards';
import { getAccessToken } from '@/lib/http/cookies';
import { upstream, HttpError } from '@/lib/http/upstream';
import { HydrationBoundary, QueryClient, dehydrate } from '@tanstack/react-query';
import { mapListToBoards, latestBoardsQueryKey, type BoardsPage } from '@/lib/query/boards';

const LATEST_LIMIT = 4;

async function getInitialBoards(): Promise<BoardsPage> {
  try {
    const token = await getAccessToken();
    if (!token) {
      return {
        items: [],
        page: 0,
        hasMore: false,
        totalElements: 0,
      };
    }
    const params = new URLSearchParams({ page: '0', size: String(LATEST_LIMIT) });
    const { data } = await upstream<BoardListResponse>('GET', `/boards?${params.toString()}`, {
      token,
    });
    return {
      items: mapListToBoards(data).slice(0, LATEST_LIMIT),
      page: 0,
      hasMore: !data.last,
      totalElements: data.totalElements,
    } satisfies BoardsPage;
  } catch (error) {
    if (error instanceof HttpError) {
      if (error.status === 401 || error.status === 403) {
        return {
          items: [],
          page: 0,
          hasMore: false,
          totalElements: 0,
        };
      }
      console.error('Failed to prefetch boards', error.status, error.message);
      return {
        items: [],
        page: 0,
        hasMore: false,
        totalElements: 0,
      };
    }
    if (
      error instanceof Error &&
      (error.message.includes('ENOTFOUND') || error.message.includes('getaddrinfo'))
    ) {
      console.warn('Skipping board prefetch: upstream host unreachable.');
      return {
        items: [],
        page: 0,
        hasMore: false,
        totalElements: 0,
      };
    }
    throw error;
  }
}

export default async function HomePage() {
  const queryClient = new QueryClient();
  const boardsPage = await getInitialBoards();
  queryClient.setQueryData(latestBoardsQueryKey(LATEST_LIMIT, {}), boardsPage);
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
        <LatestBoardsSection />
      </div>
    </HydrationBoundary>
  );
}
