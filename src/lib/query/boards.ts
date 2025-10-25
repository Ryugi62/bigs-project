import { useQuery } from '@tanstack/react-query';
import { get } from '@/lib/http/client';

// 타입은 서버 응답에 맞춰 추후 보강
export type Board = {
  id: string;
  title: string;
  // ...
};

async function getBoards() {
  return await get<Board[]>('/boards');
}

export function useBoardsQuery() {
  return useQuery({ queryKey: ['boards'], queryFn: getBoards });
}
