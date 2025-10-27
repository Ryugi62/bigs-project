'use client';

import { useState } from 'react';
import ProtectedLink from '@/components/auth/ProtectedLink';
import { buttonClasses } from '@/components/ui/Button';
import { useDeleteBoardMutation } from '@/lib/query/mutations';
import { useToastStore } from '@/store/toast';

export default function BoardActions({ boardId }: { boardId: number }) {
  const [confirming, setConfirming] = useState(false);
  const deleteMutation = useDeleteBoardMutation(boardId);
  const pushToast = useToastStore((s) => s.push);

  const handleDelete = async () => {
    try {
      await deleteMutation.mutateAsync();
      pushToast({ type: 'success', message: '게시글을 삭제했어요.' });
      window.location.assign('/boards');
    } catch (error) {
      const message = error instanceof Error ? error.message : '삭제에 실패했습니다.';
      pushToast({ type: 'error', message });
      setConfirming(false);
    }
  };

  return (
    <div className="flex flex-wrap items-center gap-3">
      <ProtectedLink
        href={`/boards/${boardId}/edit`}
        nextPath={`/boards/${boardId}/edit`}
        reason="게시글 수정은 로그인한 사용자만 이용하실 수 있어요."
        className={buttonClasses({ variant: 'secondary' })}
      >
        글 수정
      </ProtectedLink>
      {confirming ? (
        <div className="flex items-center gap-2">
          <span className="text-sm text-[#d12d3e]">정말 삭제할까요?</span>
          <button
            type="button"
            onClick={handleDelete}
            className={buttonClasses({ variant: 'ghost', className: 'text-[#d12d3e]' })}
            disabled={deleteMutation.isPending}
          >
            {deleteMutation.isPending ? '삭제 중…' : '삭제'}
          </button>
          <button
            type="button"
            onClick={() => setConfirming(false)}
            className={buttonClasses({ variant: 'ghost' })}
          >
            취소
          </button>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => setConfirming(true)}
          className={buttonClasses({ variant: 'ghost' })}
        >
          글 삭제
        </button>
      )}
    </div>
  );
}
