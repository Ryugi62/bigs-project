'use client';

import { useMemo } from 'react';
import { useToastStore } from '@/store/toast';

const variantStyles: Record<NonNullable<ReturnType<typeof resolveVariant>>, string> = {
  success:
    'border border-[#c8f2dc] bg-white shadow-[0_12px_30px_rgba(15,32,88,0.12)] text-[#16452d]',
  error: 'border border-[#ffced6] bg-white shadow-[0_12px_30px_rgba(88,15,32,0.12)] text-[#5a1420]',
  warning:
    'border border-[#ffe4b5] bg-white shadow-[0_12px_30px_rgba(88,60,15,0.12)] text-[#5a4014]',
  info: 'border border-[#dbe4ff] bg-white shadow-[0_12px_30px_rgba(15,32,88,0.12)] text-[#1c2b65]',
};

const variantAccent: Record<NonNullable<ReturnType<typeof resolveVariant>>, string> = {
  success: 'bg-[#d3f8e4] text-[#0e8a4a]',
  error: 'bg-[#ffdce1] text-[#d6364b]',
  warning: 'bg-[#ffe9c2] text-[#a66110]',
  info: 'bg-[#e5ecff] text-[#1c2b65]',
};

function resolveVariant(type?: string) {
  if (type === 'success' || type === 'error' || type === 'warning' || type === 'info') {
    return type;
  }
  return 'info';
}

export default function Toaster() {
  const toasts = useToastStore((s) => s.toasts);
  const remove = useToastStore((s) => s.remove);

  const renderedToasts = useMemo(() => toasts.slice(-4), [toasts]);

  return (
    <div
      className="pointer-events-none fixed inset-x-0 bottom-6 z-[9999] flex flex-col items-center gap-3 px-4 sm:items-end sm:px-6"
      role="status"
      aria-live="polite"
    >
      {renderedToasts.map((toast) => {
        const variant = resolveVariant(toast.type);
        return (
          <div
            key={toast.id}
            className={`pointer-events-auto flex w-full max-w-sm items-start gap-3 rounded-2xl px-4 py-3 transition-all duration-200 ${variantStyles[variant]}`}
          >
            <span
              aria-hidden
              className={`mt-1 inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-xl text-base font-semibold ${variantAccent[variant]}`}
            >
              {variant === 'success'
                ? '✓'
                : variant === 'error'
                  ? '✕'
                  : variant === 'warning'
                    ? '!'
                    : 'ℹ'}
            </span>
            <p className="flex-1 text-sm leading-5 text-pretty">{toast.message}</p>
            <button
              type="button"
              onClick={() => remove(toast.id)}
              className="mt-1 inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-[#1c2b65]/50 transition-colors hover:bg-[#f0f3ff] hover:text-[#1c2b65] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1c2b65]"
              aria-label="알림 닫기"
            >
              ×
            </button>
          </div>
        );
      })}
    </div>
  );
}
