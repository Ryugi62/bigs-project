'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import FormField from '@/components/ui/FormField';
import { Input } from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import { useSignInMutation } from '@/lib/query/auth';
import { ClientError } from '@/lib/http/client';
import { useToastStore } from '@/store/toast';

type SignInFormProps = {
  notice?: string;
};

export default function SignInForm({ notice }: SignInFormProps) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const pushToast = useToastStore((s) => s.push);
  const { mutateAsync, isPending } = useSignInMutation();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    if (!username || !password) {
      setError('이메일과 비밀번호를 입력해주세요.');
      return;
    }

    try {
      await mutateAsync({ username, password });
      pushToast({ type: 'success', message: '로그인에 성공했어요.' });
      router.push('/');
    } catch (err) {
      if (err instanceof ClientError) {
        setError(err.message);
        pushToast({ type: 'error', message: err.message });
      } else {
        setError('로그인에 실패했어요. 잠시 후 다시 시도해주세요.');
        pushToast({ type: 'error', message: '로그인 요청 중 문제가 발생했습니다.' });
      }
    }
  };

  return (
    <div className="w-full max-w-[420px] rounded-[32px] border border-white/15 bg-white/90 p-10 text-[#0f1f4b] shadow-[0_30px_120px_rgba(12,24,64,0.25)]">
      <div className="space-y-2">
        <h2 className="text-3xl font-bold">다시 만나 반가워요</h2>
        <p className="text-sm text-[#425079]">
          사내 운영 대시보드 접속을 위해 계정으로 로그인하세요.
        </p>
      </div>
      {notice && (
        <div className="mt-6 flex items-start gap-3 rounded-2xl bg-[#f2f6ff] px-4 py-3 text-sm text-[#1c2b65] shadow-[0_12px_36px_rgba(12,24,64,0.12)]">
          <span className="mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#1c2b65] text-xs font-semibold text-white">
            !
          </span>
          <p className="leading-relaxed">{notice}</p>
        </div>
      )}
      <form className="mt-8 flex flex-col gap-6" onSubmit={handleSubmit}>
        <FormField
          label="이메일"
          htmlFor="username"
          required
          hint="회사 이메일을 입력해주세요"
          error={error?.includes('이메일') ? error : undefined}
        >
          <Input
            id="username"
            type="email"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="ops@bigs.im"
          />
        </FormField>
        <FormField
          label="비밀번호"
          htmlFor="password"
          required
          error={error && !error.includes('이메일') ? error : undefined}
        >
          <Input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="비밀번호"
          />
        </FormField>
        <div className="flex items-center justify-between text-sm text-[#425079]">
          <label className="inline-flex items-center gap-2">
            <input type="checkbox" className="h-4 w-4 rounded border-[#c8d3f0] text-[#1c2b65]" />
            로그인 상태 유지
          </label>
          <Link href="/support" className="font-semibold text-[#1c2b65] hover:underline">
            비밀번호 찾기
          </Link>
        </div>
        <Button type="submit" disabled={isPending}>
          {isPending ? '로그인 중...' : '로그인'}
        </Button>
      </form>
      <p className="mt-8 text-center text-sm text-[#425079]">
        아직 계정이 없다면?{' '}
        <Link href="/sign-up" className="font-semibold text-[#1c2b65] hover:underline">
          회원가입
        </Link>
      </p>
    </div>
  );
}
