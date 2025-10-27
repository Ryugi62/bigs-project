'use client';

import Link from 'next/link';
import { useEffect, useMemo, useRef, useState } from 'react';
import BoardCard from '@/components/boards/BoardCard';
import BoardFilterBar from '@/components/boards/BoardFilterBar';
import BoardListSkeleton from '@/components/boards/BoardListSkeleton';
import ProtectedLink from '@/components/auth/ProtectedLink';
import EmptyState from '@/components/ui/EmptyState';
import { buttonClasses } from '@/components/ui/Button';
import SeedBoardsButton from '@/components/boards/SeedBoardsButton';
import { useInfiniteBoardsQuery } from '@/lib/query/boards';
import { useAuthStore } from '@/store/auth';
import { selectBoardCategory, selectBoardKeyword, useBoardFilterStore } from '@/store/boardFilters';
import type { Board } from '@/types/boards';
import type { BoardCategoryFilter } from '@/config/boards';
import { cx } from '@/lib/cx';

export default function BoardGrid() {
  const category = useBoardFilterStore(selectBoardCategory);
  const keyword = useBoardFilterStore(selectBoardKeyword);
  const setCategory = useBoardFilterStore((state) => state.setCategory);
  const setKeyword = useBoardFilterStore((state) => state.setKeyword);
  const reset = useBoardFilterStore((state) => state.reset);
  const isAuthenticated = useAuthStore((state) => Boolean(state.user));

  const queryOptions = useMemo(
    () => ({
      ...(keyword ? { keyword } : {}),
      ...(category === 'ALL' ? {} : { category }),
    }),
    [keyword, category],
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
  const normalizedKeyword = keyword.trim().toLowerCase();
  const filteredBoards = useMemo(
    () =>
      filterBoards({
        boards,
        category,
        keyword: normalizedKeyword,
      }),
    [boards, category, normalizedKeyword],
  );

  const [fallbackBoards, setFallbackBoards] = useState<Board[]>([]);
  useEffect(() => {
    if (filteredBoards.length === 0) return;
    queueMicrotask(() => {
      setFallbackBoards(filteredBoards);
    });
  }, [filteredBoards]);

  const useFallbackBoards =
    (isPending || (isFetching && !isFetchingNextPage)) &&
    filteredBoards.length === 0 &&
    fallbackBoards.length > 0;
  const boardsToRender = useFallbackBoards ? fallbackBoards : filteredBoards;

  const hasRenderedBoards = boardsToRender.length > 0;
  const isFiltering = useFallbackBoards;
  const isRefreshing = !isPending && isFetching && !isFetchingNextPage && hasRenderedBoards;
  const showSkeleton = !hasRenderedBoards && isPending;
  const showEmpty =
    !isPending && !isFetching && !isFetchingNextPage && !error && filteredBoards.length === 0;
  const listBusy = isFetching || isFetchingNextPage || isFiltering;

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
      { rootMargin: '600px 0px 600px 0px' },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [fetchNextPage, hasNextPage, isFetchingNextPage, boards.length]);

  const errorMessage = resolveErrorMessage(error);

  useEffect(() => {
    if (!data) return;
    if (!hasNextPage || isFetchingNextPage) return;
    if (filteredBoards.length > 0) return;
    fetchNextPage();
  }, [data, fetchNextPage, filteredBoards.length, hasNextPage, isFetchingNextPage]);

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
          <BoardList
            boards={boardsToRender}
            isBusy={listBusy}
            isFiltering={isFiltering || isRefreshing}
            showLoadingPlaceholders={isFetchingNextPage}
          />
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

function BoardList({
  boards,
  isBusy,
  isFiltering,
  showLoadingPlaceholders,
}: {
  boards: Board[];
  isBusy: boolean;
  isFiltering: boolean;
  showLoadingPlaceholders: boolean;
}) {
  return (
    <div
      className={cx(
        'grid gap-6 sm:grid-cols-2 transition-opacity duration-200',
        isFiltering ? 'opacity-60 pointer-events-none' : 'opacity-100',
      )}
      role="list"
      aria-busy={isBusy}
      aria-live="polite"
    >
      {boards.map((board) => (
        <BoardCard key={board.id} board={board} />
      ))}
      {showLoadingPlaceholders && <LoadingPlaceholders />}
    </div>
  );
}

function LoadingPlaceholders() {
  return (
    <>
      {Array.from({ length: 2 }).map((_, index) => (
        <div
          key={`placeholder-${index}`}
          className="h-full animate-pulse rounded-2xl border border-[#dfe4f4] bg-white p-6 shadow-sm"
          aria-hidden
        >
          <div className="mb-4 h-5 w-24 rounded-full bg-[#e3e7f4]" />
          <div className="mb-4 h-6 w-3/4 rounded-full bg-[#d4daed]" />
          <div className="mb-2 h-4 w-full rounded-full bg-[#e3e7f4]" />
          <div className="h-4 w-2/3 rounded-full bg-[#e3e7f4]" />
        </div>
      ))}
    </>
  );
}

function filterBoards({
  boards,
  category,
  keyword,
}: {
  boards: Board[];
  category: BoardCategoryFilter;
  keyword: string;
}) {
  if (boards.length === 0) return boards;
  const hasKeyword = keyword.length > 0;
  return boards.filter((board) => {
    const matchCategory = category === 'ALL' || board.boardCategory === category;
    if (!matchCategory) return false;
    if (!hasKeyword) return true;
    return board.title.toLowerCase().includes(keyword);
  });
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
