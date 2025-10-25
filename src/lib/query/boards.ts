import { useQuery } from "@tanstack/react-query";
import api from "@/lib/api/client";

// 타입은 서버 응답에 맞춰 추후 보강
export type Board = {
  id: string;
  title: string;
  // ...
};

async function getBoards() {
  const { data } = await api.get("/boards");
  return data as Board[];
}

export function useBoardsQuery() {
  return useQuery({ queryKey: ["boards"], queryFn: getBoards });
}

