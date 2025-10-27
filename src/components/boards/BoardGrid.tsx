'use client';

import Link from 'next/link';
import { useEffect, useMemo, useRef } from 'react';
import BoardCard from '@/components/boards/BoardCard';
import BoardFilterBar from '@/components/boards/BoardFilterBar';
import BoardListSkeleton from '@/components/boards/BoardListSkeleton';
import ProtectedLink from '@/components/auth/ProtectedLink';
import EmptyState from '@/components/ui/EmptyState';
import { buttonClasses } from '@/components/ui/Button';
import SeedBoardsButton from '@/components/boards/SeedBoardsButton';
import { useInfiniteBoardsQuery } from '@/lib/query/boards';
import { useDebouncedValue } from '@/lib/hooks/useDebouncedValue';
import { useAuthStore } from '@/store/auth';
import { selectBoardCategory, selectBoardKeyword, useBoardFilterStore } from '@/store/boardFilters';
import type { Board } from '@/types/boards';

export default function BoardGrid() {
  const category = useBoardFilterStore(selectBoardCategory);
  const keyword = useBoardFilterStore(selectBoardKeyword);
  const setCategory = useBoardFilterStore((state) => state.setCategory);
  const setKeyword = useBoardFilterStore((state) => state.setKeyword);
  const reset = useBoardFilterStore((state) => state.reset);
  const debouncedKeyword = useDebouncedValue(keyword, 250);
  const isAuthenticated = useAuthStore((state) => Boolean(state.user));

  const queryOptions = useMemo(
    () => ({
      ...(debouncedKeyword ? { keyword: debouncedKeyword } : {}),
      ...(category === 'ALL' ? {} : { category }),
    }),
    [debouncedKeyword, category],
  );

  const {
    data,
    error,
    isPending,
    isFetching,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
    refetch,
  } = useInfiniteBoardsQuery(queryOptions);

  const boards = useMemo(() => data?.pages.flatMap((page) => page.items) ?? [], [data]);

  const showSkeleton = isPending && boards.length === 0;
  const showEmpty = !isPending && !error && boards.length === 0;
  const busyLabel = isFetching && !isFetchingNextPage && boards.length > 0;
  const listBusy = isFetching || isFetchingNextPage;

  const loadMoreRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!hasNextPage || isFetchingNextPage) return;
    const node = loadMoreRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry?.isIntersecting) {
          fetchNextPage();
        }
      },
      { rootMargin: '200px' },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [fetchNextPage, hasNextPage, isFetchingNextPage, boards.length]);

  const errorMessage = resolveErrorMessage(error);

  return (
    <section className="space-y-8" aria-live="polite">
      <BoardFilterBar
        category={category}
        onCategoryChange={setCategory}
        keyword={keyword}
        onKeywordChange={setKeyword}
        onReset={reset}
        isBusy={isFetching}
        actions={
          <div className="flex flex-wrap items-center gap-2">
            <ProtectedLink
              href="/boards/new"
              nextPath="/boards/new"
              reason="게시글 작성은 로그인한 사용자만 이용하실 수 있어요."
              className={buttonClasses()}
            >
              새 글 작성
            </ProtectedLink>
            <SeedBoardsButton count={100} />
          </div>
        }
      />

      {busyLabel && (
        <p className="text-sm text-[#425079]" role="status">
          최신 게시글을 불러오는 중이에요…
        </p>
      )}

      {error ? (
        <EmptyState
          title="게시글을 불러오지 못했어요."
          description={errorMessage}
          action={
            <button
              type="button"
              onClick={() => refetch()}
              className={buttonClasses({ variant: 'secondary' })}
            >
              다시 시도
            </button>
          }
        />
      ) : showSkeleton ? (
        <BoardListSkeleton />
      ) : showEmpty ? (
        isAuthenticated ? (
          <EmptyState
            title="조건에 맞는 게시글이 없습니다."
            description="검색어나 카테고리를 변경하거나 필터를 초기화해주세요."
            action={
              <button type="button" onClick={reset} className={buttonClasses({ variant: 'ghost' })}>
                필터 초기화
              </button>
            }
          />
        ) : (
          <EmptyState
            title="게시판을 보려면 로그인이 필요해요."
            description="회사 계정으로 로그인하고 운영 히스토리를 확인해보세요."
            action={
              <Link href="/sign-in" className={buttonClasses({ variant: 'secondary' })}>
                로그인하기
              </Link>
            }
          />
        )
      ) : (
        <>
          <BoardList boards={boards} isBusy={listBusy} />
          {hasNextPage && (
            <div className="flex flex-col items-center gap-4 pt-4">
              <button
                type="button"
                onClick={() => fetchNextPage()}
                disabled={isFetchingNextPage}
                className={buttonClasses({ variant: 'ghost', className: 'text-[#1c2b65]/80' })}
              >
                {isFetchingNextPage ? '더 불러오는 중...' : '더 불러오기'}
              </button>
              <div ref={loadMoreRef} className="h-1 w-full" aria-hidden />
            </div>
          )}
        </>
      )}
    </section>
  );
}

function BoardList({ boards, isBusy }: { boards: Board[]; isBusy: boolean }) {
  return (
    <div className="grid gap-6 sm:grid-cols-2" role="list" aria-busy={isBusy} aria-live="polite">
      {boards.map((board) => (
        <BoardCard key={board.id} board={board} />
      ))}
    </div>
  );
}

function resolveErrorMessage(error: unknown): string {
  if (!error) return '잠시 후 다시 시도해주세요.';
  if (error instanceof Error) return error.message;
  if (
    typeof error === 'object' &&
    error !== null &&
    'message' in error &&
    typeof (error as { message: unknown }).message === 'string'
  ) {
    return (error as { message: string }).message;
  }
  return '잠시 후 다시 시도해주세요.';
}
