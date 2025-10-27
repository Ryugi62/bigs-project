import type { BoardCategory } from '@/types/boards';

export type BoardCategoryFilter = BoardCategory | 'ALL';

export const BOARD_CATEGORY_LABELS: Record<BoardCategory, string> = {
  NOTICE: '공지',
  FREE: '자유',
  QNA: 'Q&A',
  ETC: '기타',
};

export const BOARD_FILTER_TABS: Array<{ value: BoardCategoryFilter; label: string }> = [
  { value: 'ALL', label: '전체' },
  { value: 'NOTICE', label: BOARD_CATEGORY_LABELS.NOTICE },
  { value: 'FREE', label: BOARD_CATEGORY_LABELS.FREE },
  { value: 'QNA', label: BOARD_CATEGORY_LABELS.QNA },
  { value: 'ETC', label: BOARD_CATEGORY_LABELS.ETC },
];

export const BOARD_PAGE_SIZE = 10;
