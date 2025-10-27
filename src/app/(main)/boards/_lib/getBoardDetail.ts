import { notFound } from 'next/navigation';
import type { Board } from '@/types/boards';
import { upstream, HttpError } from '@/lib/http/upstream';
import { getAccessToken } from '@/lib/http/cookies';
import { getApiBaseUrl } from '@/config/env';

function toAbsoluteMediaUrl(url?: string | null): string | undefined {
  if (!url) return undefined;
  if (/^https?:\/\//i.test(url)) return url;
  try {
    return new URL(url, getApiBaseUrl()).toString();
  } catch {
    return url;
  }
}

export async function getBoardDetail(id: string): Promise<Board> {
  try {
    const token = await getAccessToken();
    const { data } = await upstream<Board>('GET', `/boards/${id}`, { token });
    return {
      ...data,
      imageUrl: toAbsoluteMediaUrl(data.imageUrl),
    };
  } catch (error) {
    if (error instanceof HttpError && error.status === 404) {
      notFound();
    }
    throw error;
  }
}
