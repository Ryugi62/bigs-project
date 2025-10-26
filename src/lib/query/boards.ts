import { useQuery } from '@tanstack/react-query';
import { get } from '@/lib/http/client';
import type { Board, BoardCategory, BoardListResponse } from '@/types/boards';

export type BoardsQueryOptions = {
  page?: number;
  size?: number;
  keyword?: string;
  category?: BoardCategory;
};

export const mapListToBoards = (payload: BoardListResponse): Board[] =>
  payload.content.map((item) => ({
    id: item.id,
    title: item.title,
    boardCategory: item.category,
    createdAt: item.createdAt,
    content: '',
  }));

async function getBoards({
  page = 0,
  size = 10,
  keyword,
  category,
}: BoardsQueryOptions = {}): Promise<Board[]> {
  const params: Record<string, unknown> = { page, size };
  if (keyword) params.keyword = keyword;
  if (category) params.category = category;
  const response = await get<BoardListResponse>('/boards', params);
  return mapListToBoards(response);
}

export function useBoardsQuery(options: BoardsQueryOptions = {}) {
  return useQuery({
    queryKey: ['boards', options],
    queryFn: () => getBoards(options),
  });
}
