'use client';

import Link from 'next/link';
import BoardCard from '@/components/boards/BoardCard';
import BoardListSkeleton from '@/components/boards/BoardListSkeleton';
import EmptyState from '@/components/ui/EmptyState';
import { buttonClasses } from '@/components/ui/Button';
import { useLatestBoardsQuery } from '@/lib/query/boards';

const LATEST_LIMIT = 4;

export default function LatestBoardsSection() {
  const { data, error, isPending, refetch } = useLatestBoardsQuery(LATEST_LIMIT);
  const boards = data?.items.slice(0, LATEST_LIMIT) ?? [];
  const showEmpty = !isPending && !error && boards.length === 0;

  return (
    <section className="flex flex-col gap-6">
      <header className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.35em] text-[#1c2b65]/70">
            Latest posts
          </p>
          <h2 className="text-2xl font-bold text-[#0f1f4b]">최신 게시물</h2>
        </div>
      </header>

      {isPending ? (
        <BoardListSkeleton />
      ) : error ? (
        <EmptyState
          title="게시글을 불러오지 못했어요."
          description={error instanceof Error ? error.message : '잠시 후 다시 시도해주세요.'}
          action={
            <button
              type="button"
              onClick={() => refetch()}
              className={buttonClasses({ variant: 'ghost', className: 'text-[#1c2b65]/80' })}
            >
              다시 시도
            </button>
          }
        />
      ) : showEmpty ? (
        <EmptyState
          title="등록된 게시글이 없습니다."
          description="첫 번째 게시글을 작성해보세요."
          action={
            <Link href="/boards/new" className={buttonClasses()}>
              새 글 작성
            </Link>
          }
        />
      ) : (
        <div className="grid gap-6 sm:grid-cols-2" role="list">
          {boards.map((board) => (
            <BoardCard key={board.id} board={board} />
          ))}
        </div>
      )}

      <div className="flex items-center gap-2">
        <Link
          href="/boards"
          className={
            'w-full text-center border rounded-full p-3 group flex h-full flex-col gap-4 rounded-2xl border border-[#dfe4f4] bg-white shadow-sm transition-transform hover:shadow-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1c2b65]'
          }
        >
          더보기
        </Link>
      </div>
    </section>
  );
}
