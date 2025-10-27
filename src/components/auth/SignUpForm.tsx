'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import FormField from '@/components/ui/FormField';
import { Input } from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import { useSignUpMutation, useSignInMutation } from '@/lib/query/auth';
import { ClientError } from '@/lib/http/client';
import { extractErrorMessage } from '@/lib/http/error-message';
import { useToastStore } from '@/store/toast';

const SIGN_UP_MOBILE_STEPS = [
  {
    title: '이름을 알려주세요',
    description: '내 게시글 리스트에 표시될 이름입니다. 동료가 알아보기 쉽게 입력하세요.',
    label: '이름',
    placeholder: '홍길동',
  },
  {
    title: '회사 이메일을 입력하세요',
    description: '본인 게시글만 식별하기 위해 회사 도메인 이메일을 사용합니다.',
    label: '이메일',
    placeholder: 'ops@bigs.im',
  },
  {
    title: '비밀번호를 설정하세요',
    description: '영문/숫자/특수문자 조합 8자 이상으로 안전하게 설정해주세요.',
    label: '비밀번호',
    placeholder: '비밀번호',
  },
  {
    title: '비밀번호를 한번 더 확인할게요',
    description: '같은 비밀번호를 입력해 비밀번호를 확인해주세요.',
    label: '비밀번호 확인',
    placeholder: '비밀번호 확인',
  },
] as const;

export default function SignUpForm() {
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [mobileStep, setMobileStep] = useState(0);
  const pushToast = useToastStore((s) => s.push);
  const router = useRouter();
  const signUp = useSignUpMutation();
  const signIn = useSignInMutation();

  const handleSubmit = async (event?: React.FormEvent<HTMLFormElement>) => {
    event?.preventDefault();
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
        const detailMessage = extractErrorMessage(err.details) || err.message;
        setError(detailMessage);
        pushToast({ type: 'error', message: detailMessage });
      } else {
        setError('회원가입 중 오류가 발생했습니다.');
        pushToast({ type: 'error', message: '회원가입에 실패했습니다. 다시 시도해주세요.' });
      }
    }
  };

  const handleMobileNext = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    switch (mobileStep) {
      case 0:
        if (!name.trim()) {
          setError('이름을 입력해주세요.');
          return;
        }
        break;
      case 1:
        if (!username.trim()) {
          setError('회사 이메일을 입력해주세요.');
          return;
        }
        break;
      case 2:
        if (!password) {
          setError('비밀번호를 입력해주세요.');
          return;
        }
        break;
      default:
        break;
    }
    setError(null);
    setMobileStep((prev) => Math.min(prev + 1, SIGN_UP_MOBILE_STEPS.length - 1));
  };

  const handleMobileBack = () => {
    setError(null);
    setMobileStep((prev) => Math.max(prev - 1, 0));
  };

  const renderMobileStepField = () => {
    if (mobileStep === 0) {
      return (
        <FormField
          label={SIGN_UP_MOBILE_STEPS[0].label}
          htmlFor="signup-name-mobile"
          required
          error={error ?? undefined}
        >
          <Input
            id="signup-name-mobile"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder={SIGN_UP_MOBILE_STEPS[0].placeholder}
          />
        </FormField>
      );
    }
    if (mobileStep === 1) {
      return (
        <FormField
          label={SIGN_UP_MOBILE_STEPS[1].label}
          htmlFor="signup-email-mobile"
          required
          error={error ?? undefined}
        >
          <Input
            id="signup-email-mobile"
            type="email"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder={SIGN_UP_MOBILE_STEPS[1].placeholder}
          />
        </FormField>
      );
    }
    if (mobileStep === 2) {
      return (
        <FormField
          label={SIGN_UP_MOBILE_STEPS[2].label}
          htmlFor="signup-password-mobile"
          required
          hint="영문/숫자/특수문자 조합 8자 이상"
          error={error ?? undefined}
        >
          <Input
            id="signup-password-mobile"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder={SIGN_UP_MOBILE_STEPS[2].placeholder}
          />
        </FormField>
      );
    }
    return (
      <FormField
        label={SIGN_UP_MOBILE_STEPS[3].label}
        htmlFor="signup-confirm-mobile"
        required
        error={error ?? undefined}
      >
        <Input
          id="signup-confirm-mobile"
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder={SIGN_UP_MOBILE_STEPS[3].placeholder}
        />
      </FormField>
    );
  };

  return (
    <>
      {/* Desktop / Tablet */}
      <div className="hidden w-full max-w-[460px] rounded-[32px] border border-white/15 bg-white/90 p-10 text-[#0f1f4b] shadow-[0_30px_120px_rgba(12,24,64,0.25)] md:block">
        <div className="space-y-2">
          <h2 className="text-3xl font-bold">OpsHub Personal 계정을 생성하세요</h2>
          <p className="text-sm text-[#425079]">
            본인이 작성한 게시글을 관리할 수 있도록 계정을 생성해주세요.
          </p>
        </div>
        <form className="mt-8 flex flex-col gap-6" onSubmit={handleSubmit}>
          <FormField label="이름" htmlFor="name-desktop" required>
            <Input
              id="name-desktop"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="홍길동"
            />
          </FormField>
          <FormField label="이메일" htmlFor="signup-username-desktop" required>
            <Input
              id="signup-username-desktop"
              type="email"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="ops@bigs.im"
            />
          </FormField>
          <FormField
            label="비밀번호"
            htmlFor="signup-password-desktop"
            required
            hint="영문/숫자/특수문자 조합 8자 이상"
          >
            <Input
              id="signup-password-desktop"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="비밀번호"
            />
          </FormField>
          <FormField
            label="비밀번호 확인"
            htmlFor="confirm-password-desktop"
            required
            error={error?.includes('비밀번호') ? error : undefined}
          >
            <Input
              id="confirm-password-desktop"
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
        <p className="mt-8 text-center text-sm text-white/80 md:text-[#425079]">
          이미 계정이 있다면{' '}
          <Link
            href="/sign-in"
            className="font-semibold text-white md:text-[#1c2b65] md:hover:underline"
          >
            로그인
          </Link>
        </p>
      </div>

      {/* Mobile stepper */}
      <div className="md:hidden flex w-full flex-col gap-8 text-[#0f1f4b]">
        <div className="flex flex-col gap-8 rounded-[32px] bg-white/95 px-6 py-7 shadow-[0_24px_90px_rgba(12,24,64,0.18)]">
          <div className="flex items-center justify-between text-[11px] font-semibold uppercase tracking-[0.45em] text-[#7b86a7]">
            <span>{String(mobileStep + 1).padStart(2, '0')}</span>
            <span>{`STEP ${mobileStep + 1}`}</span>
          </div>
          <div className="space-y-4">
            <h2 className="text-[22px] font-bold leading-tight text-[#0f1f4b]">
              {SIGN_UP_MOBILE_STEPS[mobileStep].title}
            </h2>
            <p className="text-sm text-[#4f5b7f]">{SIGN_UP_MOBILE_STEPS[mobileStep].description}</p>
          </div>
          {mobileStep < SIGN_UP_MOBILE_STEPS.length - 1 ? (
            <form className="flex flex-col gap-6" onSubmit={handleMobileNext}>
              {renderMobileStepField()}
              <div className="flex flex-col gap-2 pb-[calc(env(safe-area-inset-bottom,0)+4px)]">
                <Button type="submit" fullWidth>
                  계속
                </Button>
                {mobileStep > 0 && (
                  <Button type="button" variant="ghost" onClick={handleMobileBack} fullWidth>
                    이전으로
                  </Button>
                )}
              </div>
            </form>
          ) : (
            <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
              {renderMobileStepField()}
              <div className="flex flex-col gap-2 pb-[calc(env(safe-area-inset-bottom,0)+4px)]">
                <Button type="submit" disabled={signUp.isPending || signIn.isPending} fullWidth>
                  {signUp.isPending ? '회원가입 중...' : 'OpsHub Personal 시작하기'}
                </Button>
                <Button type="button" variant="ghost" onClick={handleMobileBack} fullWidth>
                  이전으로
                </Button>
              </div>
            </form>
          )}
        </div>
        <p className="text-center text-sm text-white/80">
          이미 계정이 있다면{' '}
          <Link href="/sign-in" className="font-semibold text-white">
            로그인
          </Link>
        </p>
      </div>
    </>
  );
}
