'use client';

import { create } from 'zustand';

export type Toast = {
  id: string;
  type?: 'info' | 'success' | 'error' | 'warning';
  message: string;
  timeoutMs?: number;
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
    const toast: Toast = { id, type: 'info', timeoutMs: 3500, ...t };
    set((s) => ({ toasts: [...s.toasts, toast] }));
    if (toast.timeoutMs && toast.timeoutMs > 0) {
      setTimeout(() => get().remove(id), toast.timeoutMs);
    }
    return id;
  },
  remove: (id) => set((s) => ({ toasts: s.toasts.filter((x) => x.id !== id) })),
  clear: () => set({ toasts: [] }),
}));
