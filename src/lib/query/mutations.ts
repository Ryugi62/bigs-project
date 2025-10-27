import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteBoard, createBoardFormData } from '@/lib/api/boards';
import { post } from '@/lib/http/client';
import { useToastStore } from '@/store/toast';
import type { BoardCategory } from '@/types/boards';

type SeedBoardsInput = {
  count: number;
};

const SEED_CATEGORIES: BoardCategory[] = ['NOTICE', 'QNA', 'FREE', 'ETC'];

function buildSeedContent(index: number) {
  const timestamp = new Date().toISOString();
  return `게시글 시드 자동 생성 ${index + 1} / ${timestamp}`;
}

export function useDeleteBoardMutation(boardId: number) {
  const qc = useQueryClient();
  return useMutation({
    mutationKey: ['boards', 'delete', boardId],
    mutationFn: () => deleteBoard(boardId),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['boards'] });
    },
  });
}

export function useSeedBoardsMutation() {
  const qc = useQueryClient();
  const toast = useToastStore.getState();

  return useMutation({
    mutationKey: ['boards', 'seed'],
    mutationFn: async ({ count }: SeedBoardsInput) => {
      let created = 0;
      const failures: Array<{ index: number; reason: string }> = [];

      for (let index = 0; index < count; index++) {
        const category = SEED_CATEGORIES[index % SEED_CATEGORIES.length];
        const title = `인터뷰 더미 게시글 #${index + 1}`;
        const content = `<p>${buildSeedContent(index)}</p>`;
        const formData = createBoardFormData({
          title,
          content,
          category,
          attachment: null,
        });

        try {
          await post('/boards', formData);
          created += 1;
        } catch (error) {
          const reason = error instanceof Error ? error.message : '알 수 없는 오류';
          failures.push({ index: index + 1, reason });
        }
      }

      return { created, failures };
    },
    onSuccess: ({ created, failures }) => {
      qc.invalidateQueries({ queryKey: ['boards'] });
      qc.invalidateQueries({ queryKey: ['boards', 'latest'] });
      if (failures.length > 0) {
        toast.push({
          type: 'warning',
          message: `더미 게시글 ${created}건 생성, ${failures.length}건 실패했습니다.`,
        });
      } else {
        toast.push({ type: 'success', message: `${created}건의 더미 게시글을 생성했어요.` });
      }
    },
    onError: (error: unknown) => {
      const message = error instanceof Error ? error.message : '더미 게시글 생성에 실패했어요.';
      toast.push({ type: 'error', message });
    },
  });
}
