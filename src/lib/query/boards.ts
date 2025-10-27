import { useQuery, keepPreviousData } from '@tanstack/react-query';
import { ClientError, get } from '@/lib/http/client';
import { BOARD_PAGE_SIZE } from '@/config/boards';
import type { Board, BoardCategory, BoardListResponse } from '@/types/boards';

export type BoardsQueryOptions = {
  page?: number;
  size?: number;
  keyword?: string;
  category?: BoardCategory;
  enabled?: boolean;
};

type RequestOptions = Omit<BoardsQueryOptions, 'enabled'>;

const UNKNOWN_AUTHOR_FALLBACK = '알 수 없는 작성자';

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

async function getBoards({
  page = 0,
  size = BOARD_PAGE_SIZE,
  keyword,
  category,
}: RequestOptions = {}): Promise<Board[]> {
  const params: Record<string, unknown> = { page, size };
  if (keyword) params.keyword = keyword;
  if (category) params.category = category;
  try {
    const response = await get<BoardListResponse>('/boards', params);
    return mapListToBoards(response);
  } catch (error) {
    if (error instanceof ClientError && (error.status === 401 || error.status === 403)) {
      return [];
    }
    throw error;
  }
}

export const boardsQueryKey = (options: RequestOptions = {}) => ['boards', options] as const;

export function useBoardsQuery(options: BoardsQueryOptions = {}) {
  const { enabled = true, ...requestOptions } = options;
  return useQuery({
    queryKey: boardsQueryKey(requestOptions),
    queryFn: () => getBoards(requestOptions),
    enabled,
    staleTime: 30_000,
    gcTime: 300_000,
    placeholderData: keepPreviousData,
  });
}
