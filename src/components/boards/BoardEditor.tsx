'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import FormField from '@/components/ui/FormField';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Textarea';
import { Select } from '@/components/ui/Select';
import Button from '@/components/ui/Button';
import { ClientError, patch, post } from '@/lib/http/client';
import { extractErrorMessage } from '@/lib/http/error-message';
import { BOARD_CATEGORY_LABELS } from '@/config/boards';
import type { BoardCategory } from '@/types/boards';
import { useToastStore } from '@/store/toast';

const categories: Array<{ value: BoardCategory; label: string }> = (
  Object.entries(BOARD_CATEGORY_LABELS) as Array<[BoardCategory, string]>
).map(([value, label]) => ({ value, label }));

type BoardEditorProps = {
  mode: 'create' | 'edit';
  boardId?: number;
  initial?: {
    title: string;
    content: string;
    boardCategory: BoardCategory;
  };
};

type FormState = {
  title: string;
  content: string;
  boardCategory: BoardCategory;
  attachment: File | null;
};

export default function BoardEditor({ mode, boardId, initial }: BoardEditorProps) {
  const [form, setForm] = useState<FormState>({
    title: initial?.title ?? '',
    content: initial?.content ?? '',
    boardCategory: initial?.boardCategory ?? 'NOTICE',
    attachment: null,
  });
  const [attachmentName, setAttachmentName] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const qc = useQueryClient();
  const pushToast = useToastStore((s) => s.push);

  const mutation = useMutation({
    mutationKey: ['boards', mode, boardId],
    mutationFn: async (payload: FormState) => {
      const body = buildFormData(payload);
      if (mode === 'edit' && boardId) {
        await patch(`/boards/${boardId}`, body);
        return;
      }
      await post('/boards', body);
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['boards'] });
      pushToast({
        type: 'success',
        message: mode === 'create' ? '게시글이 등록되었습니다.' : '게시글이 수정되었습니다.',
      });
      router.push(mode === 'create' ? '/boards' : `/boards/${boardId}`);
    },
  });

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    if (!form.title || !form.content) {
      setError('제목과 내용을 입력해주세요.');
      return;
    }
    try {
      await mutation.mutateAsync(form);
    } catch (err) {
      if (err instanceof ClientError) {
        const message = extractErrorMessage(err.details) ?? err.message;
        setError(message);
        pushToast({ type: 'error', message });
      } else {
        setError('요청을 처리하는 중 문제가 발생했습니다.');
        pushToast({ type: 'error', message: '게시글 저장에 실패했습니다.' });
      }
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-8 rounded-[32px] border border-white/50 bg-white/95 p-10 shadow-[0_32px_120px_rgba(15,32,88,0.15)]"
    >
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-[#0f1f4b]">
          {mode === 'create' ? '새 글 작성' : '게시글 수정'}
        </h1>
        <p className="text-sm text-[#425079]">
          공지, Q&A, 자유 게시판 중 목적에 맞는 카테고리를 선택하고 팀이 이해하기 쉬운 제목과 본문을
          작성하세요.
        </p>
      </div>
      <div className="grid gap-6 lg:grid-cols-[2fr,1fr]">
        <div className="flex flex-col gap-6">
          <FormField label="제목" htmlFor="board-title" required>
            <Input
              id="board-title"
              placeholder="게시글 제목"
              value={form.title}
              onChange={(event) => setForm((prev) => ({ ...prev, title: event.target.value }))}
            />
          </FormField>
          <FormField
            label="내용"
            htmlFor="board-content"
            required
            hint="필요 시 마크다운/HTML을 사용해 정리할 수 있습니다."
          >
            <Textarea
              id="board-content"
              placeholder="본문 내용을 입력하세요."
              value={form.content}
              onChange={(event) => setForm((prev) => ({ ...prev, content: event.target.value }))}
            />
          </FormField>
        </div>
        <div className="flex flex-col gap-6 rounded-3xl border border-[#e2e8f5] bg-[#f6f8ff] p-6">
          <FormField label="카테고리" htmlFor="board-category" required>
            <Select
              id="board-category"
              value={form.boardCategory}
              onChange={(event) =>
                setForm((prev) => ({ ...prev, boardCategory: event.target.value as BoardCategory }))
              }
            >
              {categories.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </Select>
          </FormField>
          <FormField
            label="첨부 파일"
            htmlFor="board-attachment"
            hint={
              attachmentName
                ? `선택된 파일: ${attachmentName}`
                : '필요 시 관련 이미지를 첨부할 수 있습니다.'
            }
          >
            <Input
              id="board-attachment"
              type="file"
              accept="image/*"
              onChange={(event) => {
                const file = event.target.files?.[0] ?? null;
                setForm((prev) => ({ ...prev, attachment: file }));
                setAttachmentName(file ? file.name : null);
              }}
            />
          </FormField>
          <div className="rounded-2xl bg-white/80 p-5 text-sm text-[#425079]">
            <p className="font-semibold text-[#1c2b65]">작성 가이드</p>
            <ul className="mt-3 space-y-2">
              <li>• 제목 앞에 [OUTAGE], [RELEASE] 등 태그를 붙이면 자동 분류됩니다.</li>
              <li>• 관련 런북이나 Jira 링크를 본문에 첨부해주세요.</li>
              <li>• 이미지 업로드는 추후 업데이트 예정입니다.</li>
            </ul>
          </div>
        </div>
      </div>
      {error && (
        <p className="rounded-2xl bg-[#ffe5e8] px-4 py-3 text-sm text-[#d12d3e]">{error}</p>
      )}
      <div className="flex flex-wrap justify-end gap-3">
        <button
          type="button"
          onClick={() => router.back()}
          className="rounded-full px-5 py-3 text-sm font-semibold text-[#1c2b65] hover:underline"
        >
          취소
        </button>
        <Button type="submit" disabled={mutation.isPending}>
          {mutation.isPending ? '저장 중...' : mode === 'create' ? '등록하기' : '수정 완료'}
        </Button>
      </div>
    </form>
  );
}

function buildFormData(form: FormState) {
  const data = new FormData();
  const payload = {
    title: form.title,
    content: form.content,
    category: form.boardCategory,
  };
  data.append('request', new Blob([JSON.stringify(payload)], { type: 'application/json' }));
  if (form.attachment) {
    data.append('file', form.attachment);
  }
  return data;
}
