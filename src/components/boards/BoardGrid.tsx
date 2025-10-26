'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { useBoardsQuery } from '@/lib/query/boards';
import type { BoardsQueryOptions } from '@/lib/query/boards';
import type { BoardCategory } from '@/types/boards';
import BoardCard from '@/components/boards/BoardCard';
import { Input } from '@/components/ui/Input';
import { buttonClasses } from '@/components/ui/Button';
import { cx } from '@/lib/cx';

const categoryTabs: Array<{ key: BoardCategory | 'ALL'; label: string }> = [
  { key: 'ALL', label: '전체' },
  { key: 'NOTICE', label: '공지' },
  { key: 'FREE', label: '자유' },
  { key: 'QNA', label: 'Q&A' },
  { key: 'ETC', label: '기타' },
];

export default function BoardGrid() {
  const [keyword, setKeyword] = useState('');
  const [category, setCategory] = useState<BoardCategory | 'ALL'>('ALL');
  const queryOptions = useMemo<BoardsQueryOptions>(
    () => ({
      ...(keyword ? { keyword } : {}),
      ...(category === 'ALL' ? {} : { category }),
    }),
    [keyword, category],
  );
  const { data, isLoading } = useBoardsQuery(queryOptions);

  return (
    <section className="space-y-8">
      <div className="flex flex-col gap-4 rounded-3xl bg-white/80 p-6 shadow-[0_20px_64px_rgba(20,38,94,0.08)] lg:flex-row lg:items-center lg:justify-between">
        <div className="flex flex-1 flex-wrap items-center gap-2">
          {categoryTabs.map((tab) => (
            <button
              key={tab.key}
              type="button"
              onClick={() => setCategory(tab.key)}
              className={cx(
                'rounded-full px-4 py-2 text-sm font-medium transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1c2b65] lg:px-5',
                category === tab.key
                  ? 'bg-[#1c2b65] text-white shadow-[0_12px_32px_rgba(10,24,68,0.25)]'
                  : 'bg-white text-[#1c2b65]/70 border border-[#d9def0] hover:bg-[#f5f7ff]',
              )}
            >
              {tab.label}
            </button>
          ))}
        </div>
        <div className="flex w-full flex-col gap-3 sm:flex-row sm:items-center sm:gap-4 lg:w-auto">
          <div className="relative flex-1">
            <Input
              type="search"
              placeholder="키워드로 검색"
              value={keyword}
              onChange={(event) => setKeyword(event.target.value)}
              className="pr-12"
            />
            <span className="pointer-events-none absolute right-4 top-1/2 inline-flex h-6 w-6 -translate-y-1/2 items-center justify-center text-[#1c2b65]/50">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="h-5 w-5"
                aria-hidden
              >
                <path
                  fillRule="evenodd"
                  d="M9 3.5a5.5 5.5 0 1 1-3.476 9.732l-2.798 2.8a.75.75 0 1 1-1.06-1.061l2.797-2.799A5.5 5.5 0 0 1 9 3.5Zm0 1.5a4 4 0 1 0 0 8 4 4 0 0 0 0-8Z"
                  clipRule="evenodd"
                />
              </svg>
            </span>
          </div>
          <Link href="/boards/new" className={buttonClasses()}>
            새 글 작성
          </Link>
        </div>
      </div>

      {isLoading ? (
        <div className="grid gap-6 md:grid-cols-2">
          {Array.from({ length: 4 }).map((_, index) => (
            <div
              key={index}
              className="animate-pulse rounded-3xl bg-white/60 p-8 shadow-[0_24px_80px_rgba(20,38,94,0.08)]"
            >
              <div className="mb-4 h-5 w-24 rounded-full bg-[#d9def0]" />
              <div className="mb-4 h-7 w-3/4 rounded-full bg-[#c3cbe4]" />
              <div className="mb-2 h-4 w-full rounded-full bg-[#d9def0]" />
              <div className="h-4 w-2/3 rounded-full bg-[#d9def0]" />
            </div>
          ))}
        </div>
      ) : data && data.length > 0 ? (
        <div className="grid gap-6 md:grid-cols-2">
          {data.map((board) => (
            <BoardCard key={board.id} board={board} />
          ))}
        </div>
      ) : (
        <div className="rounded-3xl border border-dashed border-[#c8d3f0] bg-white/70 p-12 text-center text-[#425079]">
          <p className="text-lg font-semibold text-[#1c2b65]">게시글이 없습니다.</p>
          <p className="mt-2 text-sm">새 글을 작성하거나 검색 조건을 변경해보세요.</p>
        </div>
      )}
    </section>
  );
}
