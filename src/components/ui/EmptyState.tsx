import type { ReactNode } from 'react';
import { cx } from '@/lib/cx';

export type EmptyStateProps = {
  title: string;
  description?: string;
  action?: ReactNode;
  icon?: ReactNode;
  className?: string;
};

export default function EmptyState({
  title,
  description,
  action,
  icon,
  className,
}: EmptyStateProps) {
  return (
    <div
      className={cx(
        'rounded-3xl border border-dashed border-[#c8d3f0] bg-white/70 p-12 text-center text-[#425079] shadow-[0_12px_48px_rgba(18,32,80,0.08)]',
        className,
      )}
    >
      <div className="flex flex-col items-center justify-center gap-4">
        {icon}
        <div className="space-y-2">
          <p className="text-lg font-semibold text-[#1c2b65]">{title}</p>
          {description && <p className="text-sm text-[#5a688f]">{description}</p>}
        </div>
        {action && <div className="flex flex-wrap items-center justify-center gap-2">{action}</div>}
      </div>
    </div>
  );
}
