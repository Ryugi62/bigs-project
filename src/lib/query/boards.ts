import { useQuery } from '@tanstack/react-query';
import { ClientError, get } from '@/lib/http/client';
import type { Board, BoardCategory, BoardListResponse } from '@/types/boards';

export type BoardsQueryOptions = {
  page?: number;
  size?: number;
  keyword?: string;
  category?: BoardCategory;
  enabled?: boolean;
};

type RequestOptions = Omit<BoardsQueryOptions, 'enabled'>;

export const mapListToBoards = (payload: BoardListResponse): Board[] =>
  payload.content.map((item) => ({
    id: item.id,
    title: item.title,
    boardCategory: item.category,
    createdAt: item.createdAt,
    content: '',
  }));

async function getBoards({ page = 0, size = 10, keyword, category }: RequestOptions = {}): Promise<
  Board[]
> {
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

export function useBoardsQuery(options: BoardsQueryOptions = {}) {
  const { enabled = true, ...requestOptions } = options;
  return useQuery({
    queryKey: ['boards', requestOptions],
    queryFn: () => getBoards(requestOptions),
    enabled,
  });
}
