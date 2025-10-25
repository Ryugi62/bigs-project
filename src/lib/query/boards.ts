import { useQuery } from '@tanstack/react-query';
import { get } from '@/lib/http/client';
import type { Board } from '@/types/boards';

async function getBoards() {
  return await get<Board[]>('/boards');
}

export function useBoardsQuery() {
  return useQuery({ queryKey: ['boards'], queryFn: getBoards });
}
