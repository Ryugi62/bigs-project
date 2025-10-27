'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { User } from '@/types/auth';

type AuthState = {
  user: User | null;
  hydrationStatus: 'idle' | 'loading' | 'done';
  setUser: (user: User | null) => void;
  clear: () => void;
  setHydrationStatus: (status: AuthState['hydrationStatus']) => void;
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      hydrationStatus: 'idle',
      setUser: (user) => set({ user }),
      clear: () => set({ user: null, hydrationStatus: 'done' }),
      setHydrationStatus: (status) => set({ hydrationStatus: status }),
    }),
    {
      name: 'auth',
      version: 2,
      partialize: (s) => ({ user: s.user }),
    },
  ),
);
