import type { ReactNode } from 'react';
import { cx } from '@/lib/cx';

export type PageHeroProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  actions?: ReactNode;
  className?: string;
};

export default function PageHero({
  eyebrow,
  title,
  description,
  actions,
  className,
}: PageHeroProps) {
  return (
    <section
      className={cx(
        'relative overflow-hidden rounded-3xl border border-[#d7deed] bg-white px-6 py-10 text-[#0f1f4b] shadow-sm sm:px-10 sm:py-14',
        className,
      )}
    >
      <div
        className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(28,43,101,0.1),transparent_65%)]"
        aria-hidden="true"
      />
      <div className="relative flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
        <div className="max-w-2xl space-y-4 text-balance">
          {eyebrow && (
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[#1c2b65]/70">
              {eyebrow}
            </p>
          )}
          <h1 className="text-3xl font-bold leading-tight tracking-tight sm:text-4xl lg:text-5xl">
            {title}
          </h1>
          {description && (
            <p className="text-base text-[#4a5678] sm:text-lg lg:text-xl">{description}</p>
          )}
        </div>
        {actions && (
          <div className="flex shrink-0 flex-col items-start gap-4 lg:items-end">{actions}</div>
        )}
      </div>
    </section>
  );
}
