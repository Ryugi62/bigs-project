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
  return (
    <Link
      href={`/boards/${board.id}`}
      className="group flex flex-col gap-4 rounded-3xl bg-white/90 p-8 shadow-[0_24px_80px_rgba(20,38,94,0.08)] transition-transform hover:-translate-y-1 hover:shadow-[0_32px_120px_rgba(15,32,88,0.18)]"
      aria-label={`${board.title} 상세 보기`}
    >
      <div className="flex items-start justify-between gap-4">
        <CategoryBadge category={board.boardCategory} />
        <time className="text-sm font-medium text-[#6f7ca2]" dateTime={board.createdAt}>
          {createdAt}
        </time>
      </div>
      <h2 className="text-2xl font-semibold text-[#0f1f4b] transition-colors group-hover:text-[#1c2b65]">
        {board.title}
      </h2>
      <p className="line-clamp-3 text-base text-[#425079] text-balance">
        {stripHtml(board.content)}
      </p>
      {board.author && (
        <div className="flex items-center gap-2 text-sm font-medium text-[#1c2b65] opacity-80">
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
  );
}
