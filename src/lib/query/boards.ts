import { useInfiniteQuery } from '@tanstack/react-query';
import { ClientError, get } from '@/lib/http/client';
import { BOARD_PAGE_SIZE } from '@/config/boards';
import type { Board, BoardCategory, BoardListResponse } from '@/types/boards';

const UNKNOWN_AUTHOR_FALLBACK = '알 수 없는 작성자';

export type BoardsFilters = {
  keyword?: string;
  category?: BoardCategory;
};

export type BoardsQueryOptions = BoardsFilters & {
  size?: number;
  enabled?: boolean;
};

type FetchBoardsOptions = BoardsFilters & {
  page: number;
  size: number;
};

export type BoardsPage = {
  items: Board[];
  page: number;
  hasMore: boolean;
  totalElements: number;
};

export const mapListToBoards = (payload: BoardListResponse): Board[] =>
  payload.content.map((item) => {
    const preview =
      typeof item.preview === 'string'
        ? item.preview
        : typeof item.summary === 'string'
          ? item.summary
          : typeof item.snippet === 'string'
            ? item.snippet
            : undefined;
    const author = item.author
      ? {
          id: String(item.author.id ?? ''),
          name: item.author.name ?? UNKNOWN_AUTHOR_FALLBACK,
        }
      : undefined;
    return {
      id: item.id,
      title: item.title,
      boardCategory: item.category,
      createdAt: item.createdAt,
      content: typeof item.content === 'string' ? item.content : '',
      preview: preview?.trim() || undefined,
      author,
    } satisfies Board;
  });

function normalizeFilters(filters: BoardsFilters): BoardsFilters {
  const normalized: BoardsFilters = {};
  if (filters.keyword && filters.keyword.trim().length > 0) {
    normalized.keyword = filters.keyword.trim();
  }
  if (filters.category) {
    normalized.category = filters.category;
  }
  return normalized;
}

async function fetchBoardsPage({
  page,
  size,
  keyword,
  category,
}: FetchBoardsOptions): Promise<BoardsPage> {
  const params: Record<string, unknown> = { page, size };
  if (keyword) params.keyword = keyword;
  if (category) params.category = category;

  try {
    const response = await get<BoardListResponse>('/boards', params);
    return {
      items: mapListToBoards(response),
      page,
      hasMore: !response.last,
      totalElements: response.totalElements,
    } satisfies BoardsPage;
  } catch (error) {
    if (error instanceof ClientError && (error.status === 401 || error.status === 403)) {
      return {
        items: [],
        page,
        hasMore: false,
        totalElements: 0,
      } satisfies BoardsPage;
    }
    throw error;
  }
}

export const boardsInfiniteQueryKey = (filters: BoardsFilters = {}) =>
  ['boards', 'infinite', filters] as const;

export function useInfiniteBoardsQuery(options: BoardsQueryOptions = {}) {
  const { enabled = true, size = BOARD_PAGE_SIZE, ...rawFilters } = options;
  const filters = normalizeFilters(rawFilters);

  return useInfiniteQuery({
    queryKey: boardsInfiniteQueryKey(filters),
    initialPageParam: 0,
    enabled,
    queryFn: ({ pageParam }) =>
      fetchBoardsPage({
        page: pageParam,
        size,
        keyword: filters.keyword,
        category: filters.category,
      }),
    getNextPageParam: (lastPage) => (lastPage.hasMore ? lastPage.page + 1 : undefined),
    staleTime: 30_000,
    gcTime: 300_000,
  });
}

export { fetchBoardsPage };
