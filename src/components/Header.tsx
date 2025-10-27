'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import LogoImage from '@/app/assets/logo.png';
import { cx } from '@/lib/cx';
import { buttonClasses } from '@/components/ui/Button';
import { useAuthStore } from '@/store/auth';
import { useSignOutMutation } from '@/lib/query/auth';

type NavItem = { label: string; href: string };

const NAV_ITEMS: NavItem[] = [
  { label: 'OpsHub', href: '/' },
  { label: '게시판', href: '/boards' },
  { label: '새 글쓰기', href: '/boards/new' },
];

const navItemBase =
  "group relative inline-grid items-baseline justify-items-start pr-4 py-2 text-sm font-semibold uppercase tracking-[0.25em] transition-colors after:content-[''] after:absolute after:left-0 after:bottom-0 after:block after:h-[2px] after:bg-[#333] after:w-0 after:transition-[width] after:duration-300 after:ease-out hover:after:w-full focus-visible:after:w-full";

function NavLink({ item, isActive }: { item: NavItem; isActive: boolean }) {
  return (
    <Link
      href={item.href}
      className={cx(
        navItemBase,
        isActive ? 'text-[#1c2b65]' : 'text-[#4a5678] hover:text-[#1c2b65]',
      )}
      aria-current={isActive ? 'page' : undefined}
    >
      <span
        aria-hidden="true"
        className="font-bold col-start-1 row-start-1 opacity-0 select-none transition-opacity duration-150 group-hover:opacity-100 group-focus-visible:opacity-100"
      >
        {item.label}
      </span>
      <span className="col-start-1 row-start-1 transition-opacity duration-150 group-hover:opacity-0 group-focus-visible:opacity-0">
        {item.label}
      </span>
    </Link>
  );
}

export default function HeaderComponent() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const user = useAuthStore((state) => state.user);
  const signOutMutation = useSignOutMutation();

  // Lock body scroll when the drawer is open
  useEffect(() => {
    if (open) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = prev;
      };
    }
  }, [open]);

  const isActive = (href: string) => {
    if (!pathname) return false;
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href);
  };

  return (
    <>
      <header className="sticky top-0 z-[100000] border-b border-white/60 bg-white/80 backdrop-blur">
        <div className="mx-auto grid h-[77px] w-full max-w-[1400px] grid-cols-[auto,1fr,auto] items-center gap-6 px-4">
          <Link href="/" className="flex items-center gap-2" aria-label="홈으로 이동">
            <Image src={LogoImage} alt="Logo" className="h-[32px] w-auto object-contain" />
          </Link>

          <nav
            className="col-start-2 hidden h-full items-center justify-center gap-16 md:flex"
            aria-label="주요 메뉴"
          >
            {NAV_ITEMS.map((item) => (
              <NavLink key={item.href} item={item} isActive={isActive(item.href)} />
            ))}
          </nav>

          <div className="col-start-3 flex items-center justify-end gap-4">
            {user ? (
              <>
                <span className="hidden text-sm font-semibold text-[#1c2b65] md:inline-flex">
                  {user.name || user.username}
                </span>
                <button
                  type="button"
                  onClick={() => signOutMutation.mutate()}
                  className={cx('hidden md:inline-flex', buttonClasses({ variant: 'ghost' }))}
                  disabled={signOutMutation.isPending}
                >
                  {signOutMutation.isPending ? '로그아웃 중…' : '로그아웃'}
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/sign-in"
                  className={cx('hidden md:inline-flex', buttonClasses({ variant: 'ghost' }))}
                >
                  로그인
                </Link>
                <Link href="/sign-up" className={cx('hidden md:inline-flex', buttonClasses({}))}>
                  회원가입
                </Link>
              </>
            )}
            <span
              role="button"
              tabIndex={0}
              aria-controls="mobile-menu"
              aria-expanded={open}
              aria-label={open ? '모바일 메뉴 닫기' : '모바일 메뉴 열기'}
              onClick={() => setOpen((v) => !v)}
              className="inline-flex h-11 w-11 items-center justify-center md:hidden"
            >
              <span
                aria-hidden="true"
                className={cx(
                  'relative block h-px w-6 transition-all duration-[0.5s]',
                  open ? 'bg-transparent' : 'bg-[#333]',
                  "before:content-[''] before:absolute before:left-0 before:top-1/2 before:block before:h-px before:w-full before:bg-[#333] before:origin-center before:transition-transform before:duration-[0.5s]",
                  open ? 'before:-translate-y-1/2 before:rotate-45' : 'before:-translate-y-[7px]',
                  "after:content-[''] after:absolute after:left-0 after:top-1/2 after:block after:h-px after:w-full after:bg-[#333] after:origin-center after:transition-transform after:duration-[0.5s]",
                  open ? 'after:-translate-y-1/2 after:-rotate-45' : 'after:translate-y-[7px]',
                )}
              />
            </span>
          </div>
        </div>
      </header>

      {/* Mobile menu */}
      <div
        id="mobile-menu"
        className={cx(
          'md:hidden fixed inset-0 z-50 overflow-hidden transition-opacity duration-300',
          open ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none',
        )}
        aria-hidden={!open}
      >
        <div
          className={cx(
            'absolute right-0 top-0 h-full w-full bg-white shadow-xl transition-transform duration-300',
            open ? 'translate-x-0' : 'translate-x-full',
          )}
          role="dialog"
          aria-modal="true"
        >
          <nav className="flex flex-col gap-3 p-6 pt-24" aria-label="모바일 메뉴">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className={cx(
                  'rounded-md px-3 py-3 text-lg',
                  isActive(item.href) ? 'text-[#1c2b65]' : 'text-[#4a5678] hover:text-[#1c2b65]',
                )}
                aria-current={isActive(item.href) ? 'page' : undefined}
              >
                {item.label}
              </Link>
            ))}
            {user ? (
              <>
                <span className="inline-flex items-center gap-2 rounded-full bg-[#f0f4ff] px-4 py-3 text-sm font-semibold text-[#1c2b65]">
                  {user.name || user.username}
                </span>
                <button
                  type="button"
                  onClick={() => {
                    signOutMutation.mutate();
                    setOpen(false);
                  }}
                  className="rounded-full border border-[#1c2b65] px-4 py-3 text-sm font-semibold text-[#1c2b65]"
                  disabled={signOutMutation.isPending}
                >
                  {signOutMutation.isPending ? '로그아웃 중…' : '로그아웃'}
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/sign-in"
                  onClick={() => setOpen(false)}
                  className="rounded-full bg-[#1c2b65] px-4 py-3 text-center text-sm font-semibold text-white"
                >
                  로그인
                </Link>
                <Link
                  href="/sign-up"
                  onClick={() => setOpen(false)}
                  className="rounded-full border border-[#1c2b65] px-4 py-3 text-center text-sm font-semibold text-[#1c2b65]"
                >
                  회원가입
                </Link>
              </>
            )}
          </nav>
        </div>
      </div>
    </>
  );
}
