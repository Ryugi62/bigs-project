import type { ReactNode } from 'react';

export default function SiteShell({ children }: { children: ReactNode }) {
  return (
    <main
      id="main-content"
      className="relative flex min-h-[calc(100vh-64px)] flex-col bg-slate-100"
      tabIndex={-1}
    >
      <div className="relative mx-auto flex w-full max-w-screen-xl flex-1 flex-col gap-12 px-4 pb-16 pt-10 sm:px-6 lg:px-8">
        {children}
      </div>
    </main>
  );
}
