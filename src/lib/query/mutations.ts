import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteBoard } from '@/lib/api/boards';

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
