import { del } from '@/lib/http/client';

export async function deleteBoard(boardId: number) {
  await del(`/boards/${boardId}`);
}
