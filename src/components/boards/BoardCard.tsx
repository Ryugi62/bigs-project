'use client';

import Link from 'next/link';
import type { Board } from '@/types/boards';
import CategoryBadge from '@/components/ui/CategoryBadge';

const formatter = new Intl.DateTimeFormat('ko-KR', {
  year: 'numeric',
  month: '2-digit',
  day: '2-digit',
  hour: '2-digit',
  minute: '2-digit',
});

type BoardCardProps = {
  board: Board;
};

function stripHtml(value: string) {
  return value.replace(/<[^>]+>/g, '');
}

export default function BoardCard({ board }: BoardCardProps) {
  const createdAt = formatter.format(new Date(board.createdAt));
  const fallbackPreview = board.content ? stripHtml(board.content) : '';
  const preview = board.preview ?? fallbackPreview;
  return (
    <article role="listitem" className="h-full">
      <Link
        href={`/boards/${board.id}`}
        className="group flex h-full flex-col gap-4 rounded-2xl border border-[#dfe4f4] bg-white p-6 shadow-sm transition-transform hover:-translate-y-1 hover:shadow-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1c2b65]"
        aria-describedby={`board-${board.id}-preview`}
      >
        <div className="flex items-start justify-between gap-4">
          <CategoryBadge category={board.boardCategory} />
          <time className="text-sm font-medium text-[#6f7ca2]" dateTime={board.createdAt}>
            {createdAt}
          </time>
        </div>
        <h2 className="text-xl font-semibold leading-snug text-[#0f1f4b] transition-colors group-hover:text-[#1c2b65]">
          {board.title}
        </h2>
        <p
          id={`board-${board.id}-preview`}
          className="line-clamp-3 text-sm text-[#425079] text-balance"
        >
          {preview ? preview : '상세 페이지에서 전문을 확인하세요.'}
        </p>
        {board.author && (
          <div className="mt-auto flex items-center gap-2 text-sm font-medium text-[#1c2b65] opacity-80">
            <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-[#f0f3ff] text-xs font-bold uppercase text-[#1c2b65]">
              {board.author.name
                .split(' ')
                .map((part) => part.charAt(0))
                .join('')
                .slice(0, 2)}
            </span>
            <span>{board.author.name}</span>
          </div>
        )}
      </Link>
    </article>
  );
}
