'use client';

import { useToastStore } from '@/store/toast';

export default function Toaster() {
  const toasts = useToastStore((s) => s.toasts);
  const remove = useToastStore((s) => s.remove);

  const bgClass = (type?: string) =>
    type === 'error'
      ? 'bg-red-200'
      : type === 'success'
        ? 'bg-green-200'
        : type === 'warning'
          ? 'bg-yellow-300'
          : 'bg-gray-200';

  return (
    <div className="fixed top-3 right-3 z-[9999] flex flex-col gap-2">
      {toasts.map((t) => (
        <button
          key={t.id}
          onClick={() => remove(t.id)}
          className={`text-[#111] ${bgClass(t.type)} rounded-lg px-3 py-2 shadow-md text-left`}
        >
          {t.message}
        </button>
      ))}
    </div>
  );
}
