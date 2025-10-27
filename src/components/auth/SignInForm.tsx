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

const MOBILE_STEPS = [
  {
    title: '회사 이메일로 시작해요',
    description: 'OpsHub 계정으로 로그인하려면 회사 이메일을 입력해주세요.',
  },
  {
    title: '비밀번호를 입력하세요',
    description: '등록된 비밀번호를 입력하고 보안을 위해 주변을 확인해주세요.',
  },
] as const;

type SignInFormProps = {
  notice?: string;
};

export default function SignInForm({ notice }: SignInFormProps) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [mobileStep, setMobileStep] = useState(0);
  const router = useRouter();
  const pushToast = useToastStore((s) => s.push);
  const { mutateAsync, isPending } = useSignInMutation();

  const handleSubmit = async (event?: React.FormEvent<HTMLFormElement>) => {
    event?.preventDefault();
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

  const handleMobileNext = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!username) {
      setError('회사 이메일을 입력해주세요.');
      return;
    }
    setError(null);
    setMobileStep(1);
  };

  const handleMobileBack = () => {
    setError(null);
    setMobileStep(0);
  };

  return (
    <>
      {/* Desktop / Tablet */}
      <div className="hidden w-full max-w-[420px] rounded-[32px] border border-white/15 bg-white/90 p-10 text-[#0f1f4b] shadow-[0_30px_120px_rgba(12,24,64,0.25)] md:block">
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
            htmlFor="username-desktop"
            required
            hint="회사 이메일을 입력해주세요"
            error={error?.includes('이메일') ? error : undefined}
          >
            <Input
              id="username-desktop"
              type="email"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="ops@bigs.im"
            />
          </FormField>
          <FormField
            label="비밀번호"
            htmlFor="password-desktop"
            required
            error={error && !error.includes('이메일') ? error : undefined}
          >
            <Input
              id="password-desktop"
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
        <p className="mt-8 text-center text-sm text-white/80 md:text-[#425079]">
          아직 계정이 없다면{' '}
          <Link
            href="/sign-up"
            className="font-semibold text-white md:text-[#1c2b65] md:hover:underline"
          >
            회원가입
          </Link>
        </p>
      </div>

      {/* Mobile */}
      <div className="md:hidden flex w-full flex-col gap-8 text-[#0f1f4b]">
        <div className="flex flex-col gap-8 rounded-[32px] bg-white/95 px-6 py-7 shadow-[0_24px_90px_rgba(12,24,64,0.18)]">
          <div className="flex items-center justify-between text-[11px] font-semibold uppercase tracking-[0.45em] text-[#7b86a7]">
            <span>{String(mobileStep + 1).padStart(2, '0')}</span>
            <span>{`STEP ${mobileStep + 1}`}</span>
          </div>
          <div className="space-y-4">
            <h2 className="text-[22px] font-bold leading-tight text-[#0f1f4b]">
              {MOBILE_STEPS[mobileStep].title}
            </h2>
            <p className="text-sm text-[#4f5b7f]">{MOBILE_STEPS[mobileStep].description}</p>
            {mobileStep === 0 && notice && (
              <p className="rounded-2xl bg-[#f2f6ff] px-4 py-3 text-xs text-[#1c2b65]">{notice}</p>
            )}
          </div>
          {mobileStep === 0 ? (
            <form className="flex flex-col gap-6" onSubmit={handleMobileNext}>
              <FormField
                label="회사 이메일"
                htmlFor="username-mobile"
                required
                error={error ?? undefined}
              >
                <Input
                  id="username-mobile"
                  type="email"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="ops@bigs.im"
                  className="text-base"
                />
              </FormField>
              <div className="flex flex-col gap-2 pb-[calc(env(safe-area-inset-bottom,0)+4px)]">
                <Button type="submit" fullWidth>
                  계속
                </Button>
              </div>
            </form>
          ) : (
            <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
              <FormField
                label="비밀번호"
                htmlFor="password-mobile"
                required
                error={error ?? undefined}
              >
                <Input
                  id="password-mobile"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="비밀번호"
                  className="text-base"
                />
              </FormField>
              <div className="flex items-center justify-between text-xs text-[#4f5b7f]">
                <label className="inline-flex items-center gap-2">
                  <input
                    type="checkbox"
                    className="h-4 w-4 rounded border-[#c8d3f0] text-[#1c2b65]"
                  />
                  로그인 상태 유지
                </label>
                <Link href="/support" className="font-semibold text-[#1c2b65]">
                  비밀번호 찾기
                </Link>
              </div>
              <div className="flex flex-col gap-2 pb-[calc(env(safe-area-inset-bottom,0)+4px)]">
                <Button type="submit" disabled={isPending} fullWidth>
                  {isPending ? '로그인 중...' : '로그인'}
                </Button>
                <Button type="button" variant="ghost" onClick={handleMobileBack} fullWidth>
                  이전으로
                </Button>
              </div>
            </form>
          )}
        </div>
        <p className="text-center text-sm text-white/80">
          아직 계정이 없다면{' '}
          <Link href="/sign-up" className="font-semibold text-white">
            회원가입
          </Link>
        </p>
      </div>
    </>
  );
}
