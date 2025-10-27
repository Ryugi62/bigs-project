import type { ReactNode } from 'react';

export default function SiteShell({ children }: { children: ReactNode }) {
  return (
    <main className="relative flex min-h-[calc(100vh-77px)] flex-col bg-[#f4f7fb]">
      <div
        className="pointer-events-none absolute inset-x-0 top-0 mx-auto h-[320px] w-full max-w-[1200px] -translate-y-20 rounded-[32px] bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.75),transparent_70%)]"
        aria-hidden="true"
      />
      <div className="relative mx-auto flex w-full max-w-[1200px] flex-1 flex-col gap-12 px-4 pb-20 pt-12 sm:px-6 lg:px-8">
        {children}
      </div>
    </main>
  );
}
