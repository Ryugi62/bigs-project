'use client';

import { create } from 'zustand';
import type { BoardCategoryFilter } from '@/config/boards';

type BoardFilterState = {
  category: BoardCategoryFilter;
  keyword: string;
  setCategory: (category: BoardCategoryFilter) => void;
  setKeyword: (keyword: string) => void;
  reset: () => void;
};

const DEFAULT_STATE: Pick<BoardFilterState, 'category' | 'keyword'> = {
  category: 'ALL',
  keyword: '',
};

export const useBoardFilterStore = create<BoardFilterState>((set) => ({
  ...DEFAULT_STATE,
  setCategory: (category) => set({ category }),
  setKeyword: (keyword) => set({ keyword }),
  reset: () => set(DEFAULT_STATE),
}));

export const selectBoardCategory = (state: BoardFilterState) => state.category;
export const selectBoardKeyword = (state: BoardFilterState) => state.keyword;
