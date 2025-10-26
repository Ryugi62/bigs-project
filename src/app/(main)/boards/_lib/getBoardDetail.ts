import { notFound } from 'next/navigation';
import type { Board } from '@/types/boards';
import { upstream, HttpError } from '@/lib/http/upstream';
import { getAccessToken } from '@/lib/http/cookies';

export async function getBoardDetail(id: string): Promise<Board> {
  try {
    const token = await getAccessToken();
    const { data } = await upstream<Board>('GET', `/boards/${id}`, { token });
    return data;
  } catch (error) {
    if (error instanceof HttpError && error.status === 404) {
      notFound();
    }
    throw error;
  }
}
