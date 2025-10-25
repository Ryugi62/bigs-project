'use client';

import { useToastStore } from '@/store/toast';

export default function Toaster() {
  const toasts = useToastStore((s) => s.toasts);
  const remove = useToastStore((s) => s.remove);
  return (
    <div
      style={{
        position: 'fixed',
        top: 12,
        right: 12,
        zIndex: 9999,
        display: 'flex',
        flexDirection: 'column',
        gap: 8,
      }}
    >
      {toasts.map((t) => (
        <div
          key={t.id}
          onClick={() => remove(t.id)}
          style={{
            padding: '10px 12px',
            borderRadius: 8,
            color: '#111',
            background:
              t.type === 'error'
                ? '#fecaca'
                : t.type === 'success'
                  ? '#bbf7d0'
                  : t.type === 'warning'
                    ? '#fde68a'
                    : '#e5e7eb',
            boxShadow: '0 4px 10px rgba(0,0,0,0.08)',
          }}
        >
          {t.message}
        </div>
      ))}
    </div>
  );
}
