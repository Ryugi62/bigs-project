import { del } from '@/lib/http/client';
import type { BoardCategory } from '@/types/boards';

export type BoardRequestPayload = {
  title: string;
  content: string;
  category: BoardCategory;
  attachment?: File | null;
};

export function createBoardFormData({ title, content, category, attachment }: BoardRequestPayload) {
  const data = new FormData();
  const payload = {
    title,
    content,
    category,
  } satisfies Omit<BoardRequestPayload, 'attachment'>;
  data.append(
    'request',
    new Blob([JSON.stringify(payload)], {
      type: 'application/json',
    }),
  );
  if (attachment instanceof File) {
    data.append('file', attachment);
  }
  return data;
}

export async function deleteBoard(boardId: number) {
  await del(`/boards/${boardId}`);
}
