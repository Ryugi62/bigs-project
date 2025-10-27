import type { ReactNode } from 'react';
import Header from '@/components/Header';
import SiteShell from '@/components/layout/SiteShell';
import SkipNavLink from '@/components/layout/SkipNavLink';

export default function MainAppShell({ children }: { children: ReactNode }) {
  return (
    <div className="relative min-h-screen bg-slate-100">
      <SkipNavLink href="#main-content" />
      <Header />
      <SiteShell>{children}</SiteShell>
    </div>
  );
}
