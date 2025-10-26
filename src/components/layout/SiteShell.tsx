import type { ReactNode } from 'react';

export default function SiteShell({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-[calc(100vh-77px)] flex-col bg-[#f4f7fb]">
      <div className="mx-auto flex w-full max-w-[1200px] flex-1 flex-col gap-12 px-4 pb-20 pt-12 sm:px-6 lg:px-8">
        {children}
      </div>
    </div>
  );
}
