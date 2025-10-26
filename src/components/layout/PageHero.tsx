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
        'relative overflow-hidden rounded-[32px] bg-gradient-to-br from-[#091841] via-[#102c6b] to-[#13418f] px-8 py-16 text-white shadow-[0_40px_120px_rgba(9,24,65,0.55)]',
        className,
      )}
    >
      <div
        className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.18),transparent_60%)]"
        aria-hidden="true"
      />
      <div className="relative flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
        <div className="max-w-2xl space-y-4">
          {eyebrow && (
            <p className="text-xs uppercase tracking-[0.35em] text-white/70">{eyebrow}</p>
          )}
          <h1 className="text-4xl font-bold leading-tight tracking-tight lg:text-5xl">{title}</h1>
          {description && <p className="text-lg text-white/80 lg:text-xl">{description}</p>}
        </div>
        {actions && (
          <div className="flex shrink-0 flex-col items-start gap-4 lg:items-end">{actions}</div>
        )}
      </div>
    </section>
  );
}
