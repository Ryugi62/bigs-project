import type { BoardCategory } from '@/types/boards';
import { cx } from '@/lib/cx';
import { BOARD_CATEGORY_LABELS } from '@/config/boards';

const categoryStyles: Record<BoardCategory, string> = {
  NOTICE: 'bg-[#fff0e0] text-[#a65700] border-[#ffd3a1]',
  FREE: 'bg-[#e5f2ff] text-[#15539b] border-[#a4d0ff]',
  QNA: 'bg-[#e9f8f1] text-[#1c7d4f] border-[#9de0bc]',
  ETC: 'bg-[#f0effa] text-[#4339b7] border-[#c3baf5]',
};

export default function CategoryBadge({ category }: { category: BoardCategory }) {
  return (
    <span
      className={cx(
        'inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-wide',
        categoryStyles[category],
      )}
    >
      {BOARD_CATEGORY_LABELS[category] ?? category}
    </span>
  );
}
