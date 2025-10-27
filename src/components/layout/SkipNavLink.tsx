import type { ReactNode } from 'react';
import { cx } from '@/lib/cx';

type SkipNavLinkProps = {
  href: string;
  children?: ReactNode;
  className?: string;
};

export default function SkipNavLink({
  href,
  children = '본문 바로가기',
  className,
}: SkipNavLinkProps) {
  return (
    <a
      href={href}
      className={cx(
        'skip-nav-link',
        'pointer-events-none absolute left-1/2 z-[1000000] mt-2 -translate-x-1/2 rounded-full bg-[#1c2b65] px-5 py-2 text-sm font-semibold text-white opacity-0 focus:pointer-events-auto focus:opacity-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#1c2b65] md:mt-4',
        className,
      )}
    >
      {children}
    </a>
  );
}
