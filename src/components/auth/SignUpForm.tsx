'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import FormField from '@/components/ui/FormField';
import { Input } from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import { useSignUpMutation, useSignInMutation } from '@/lib/query/auth';
import { ClientError } from '@/lib/http/client';
import { useToastStore } from '@/store/toast';

export default function SignUpForm() {
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const pushToast = useToastStore((s) => s.push);
  const router = useRouter();
  const signUp = useSignUpMutation();
  const signIn = useSignInMutation();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    if (!name || !username || !password || !confirmPassword) {
      setError('필수 항목을 모두 입력해주세요.');
      return;
    }
    if (password !== confirmPassword) {
      setError('비밀번호가 일치하지 않습니다.');
      return;
    }

    try {
      await signUp.mutateAsync({ name, username, password, confirmPassword });
      pushToast({ type: 'success', message: '회원가입이 완료되었습니다.' });
      await signIn.mutateAsync({ username, password });
      pushToast({ type: 'success', message: '로그인에 성공했어요.' });
      router.push('/');
    } catch (err) {
      if (err instanceof ClientError) {
        setError(err.message);
        pushToast({ type: 'error', message: err.message });
      } else {
        setError('회원가입 중 오류가 발생했습니다.');
        pushToast({ type: 'error', message: '회원가입에 실패했습니다. 다시 시도해주세요.' });
      }
    }
  };

  return (
    <div className="w-full max-w-[460px] rounded-[32px] border border-white/15 bg-white/90 p-10 text-[#0f1f4b] shadow-[0_30px_120px_rgba(12,24,64,0.25)]">
      <div className="space-y-2">
        <h2 className="text-3xl font-bold">OpsHub 계정을 생성하세요</h2>
        <p className="text-sm text-[#425079]">
          운영 팀 구성원과 지식을 공유하기 위한 개인 계정을 만들어주세요.
        </p>
      </div>
      <form className="mt-8 flex flex-col gap-6" onSubmit={handleSubmit}>
        <FormField label="이름" htmlFor="name" required>
          <Input
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="홍길동"
          />
        </FormField>
        <FormField label="이메일" htmlFor="signup-username" required>
          <Input
            id="signup-username"
            type="email"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="ops@bigs.im"
          />
        </FormField>
        <FormField
          label="비밀번호"
          htmlFor="signup-password"
          required
          hint="영문/숫자/특수문자 조합 8자 이상"
        >
          <Input
            id="signup-password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="비밀번호"
          />
        </FormField>
        <FormField
          label="비밀번호 확인"
          htmlFor="confirm-password"
          required
          error={error?.includes('비밀번호') ? error : undefined}
        >
          <Input
            id="confirm-password"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="비밀번호 확인"
          />
        </FormField>
        {error && !error.includes('비밀번호') && (
          <p className="rounded-2xl bg-[#ffe5e8] px-4 py-3 text-sm text-[#d12d3e]">{error}</p>
        )}
        <Button type="submit" disabled={signUp.isPending || signIn.isPending}>
          {signUp.isPending ? '회원가입 중...' : '회원가입'}
        </Button>
      </form>
      <p className="mt-8 text-center text-sm text-[#425079]">
        이미 계정이 있다면{' '}
        <Link href="/sign-in" className="font-semibold text-[#1c2b65] hover:underline">
          로그인
        </Link>
      </p>
    </div>
  );
}
