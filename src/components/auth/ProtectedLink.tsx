'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import type { ReactNode, MouseEvent } from 'react';
import { useAuthStore } from '@/store/auth';
import { useToastStore } from '@/store/toast';

const DEFAULT_MESSAGE = '로그인한 사용자만 이용할 수 있는 메뉴입니다.';

type ProtectedLinkProps = {
  href: string;
  nextPath?: string;
  reason?: string;
  children: ReactNode;
  className?: string;
};

export default function ProtectedLink({
  href,
  nextPath,
  reason,
  children,
  className,
}: ProtectedLinkProps) {
  const isAuthenticated = useAuthStore((state) => Boolean(state.user));
  const pushToast = useToastStore((state) => state.push);
  const router = useRouter();

  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    if (isAuthenticated) return;
    event.preventDefault();
    const message = reason ?? DEFAULT_MESSAGE;
    pushToast({ type: 'warning', message });
    const params = new URLSearchParams();
    const next = nextPath ?? href;
    params.set('next', next);
    params.set('reason', encodeURIComponent(message));
    router.push(`/sign-in?${params.toString()}`);
  };

  return (
    <Link href={href} onClick={handleClick} className={className} prefetch={false}>
      {children}
    </Link>
  );
}
