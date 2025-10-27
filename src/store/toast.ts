'use client';

import { create } from 'zustand';

export type Toast = {
  id: string;
  type?: 'info' | 'success' | 'error' | 'warning';
  message: string;
  timeoutMs?: number;
  dedupeKey?: string;
};

type ToastState = {
  toasts: Toast[];
  push: (t: Omit<Toast, 'id'>) => string;
  remove: (id: string) => void;
  clear: () => void;
};

export const useToastStore = create<ToastState>((set, get) => ({
  toasts: [],
  push: (t) => {
    const id = Math.random().toString(36).slice(2);
    const dedupeKey = t.dedupeKey ?? `${t.type ?? 'info'}::${t.message}`;
    const toast: Toast = { id, type: 'info', timeoutMs: 4000, ...t, dedupeKey };
    set((state) => {
      const filtered = state.toasts.filter((existing) => existing.dedupeKey !== dedupeKey);
      return { toasts: [...filtered, toast] };
    });
    if (toast.timeoutMs && toast.timeoutMs > 0) {
      const schedule = typeof window !== 'undefined' ? window.setTimeout : setTimeout;
      schedule(() => {
        const exists = get().toasts.some((existing) => existing.id === id);
        if (exists) get().remove(id);
      }, toast.timeoutMs);
    }
    return id;
  },
  remove: (id) => set((s) => ({ toasts: s.toasts.filter((x) => x.id !== id) })),
  clear: () => set({ toasts: [] }),
}));
