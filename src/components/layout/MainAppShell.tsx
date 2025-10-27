import type { ReactNode } from 'react';
import Header from '@/components/Header';
import SiteShell from '@/components/layout/SiteShell';

export default function MainAppShell({ children }: { children: ReactNode }) {
  return (
    <div className="relative min-h-screen bg-[#edf1f9]">
      <div
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_right,rgba(28,67,137,0.12),transparent_55%)]"
        aria-hidden="true"
      />
      <Header />
      <SiteShell>{children}</SiteShell>
    </div>
  );
}
