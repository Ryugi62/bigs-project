'use client';

import { BOARD_FILTER_TABS, type BoardCategoryFilter } from '@/config/boards';
import { Input } from '@/components/ui/Input';
import { cx } from '@/lib/cx';
import { buttonClasses } from '@/components/ui/Button';
import type { ReactNode } from 'react';

const tabBaseClass =
  'cursor-pointer rounded-full px-4 py-2 text-sm font-medium transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1c2b65] lg:px-5';

type BoardFilterBarProps = {
  category: BoardCategoryFilter;
  onCategoryChange: (category: BoardCategoryFilter) => void;
  keyword: string;
  onKeywordChange: (value: string) => void;
  onReset?: () => void;
  actions?: ReactNode;
  isBusy?: boolean;
};

export default function BoardFilterBar({
  category,
  onCategoryChange,
  keyword,
  onKeywordChange,
  onReset,
  actions,
  isBusy,
}: BoardFilterBarProps) {
  const hasActiveFilters = category !== 'ALL' || keyword.trim().length > 0;

  return (
    <div className="flex flex-col gap-4 rounded-3xl border border-[#dfe4f4] bg-white p-5 shadow-sm lg:flex-row lg:items-center lg:justify-between lg:p-6">
      <div
        className="-mx-1 flex flex-1 flex-wrap items-center gap-2 overflow-x-auto pb-1"
        role="tablist"
        aria-label="게시판 카테고리"
      >
        {BOARD_FILTER_TABS.map((tab) => (
          <button
            key={tab.value}
            type="button"
            role="tab"
            aria-selected={category === tab.value}
            onClick={() => onCategoryChange(tab.value)}
            className={cx(
              tabBaseClass,
              category === tab.value
                ? 'bg-[#1c2b65] text-white shadow-sm'
                : 'border border-[#d9def0] bg-white text-[#1c2b65]/80 hover:bg-[#f5f7ff]',
            )}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div className="flex w-full flex-col gap-3 sm:flex-row sm:items-center sm:justify-end sm:gap-4 lg:w-auto">
        <div className="relative flex-1 sm:max-w-xs lg:max-w-sm">
          <Input
            type="search"
            placeholder="키워드로 검색"
            value={keyword}
            onChange={(event) => onKeywordChange(event.target.value)}
            className="pr-12"
            aria-label="게시글 검색"
          />
          <span className="pointer-events-none absolute right-4 top-1/2 inline-flex h-6 w-6 -translate-y-1/2 items-center justify-center text-[#1c2b65]/50">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="h-5 w-5"
              aria-hidden
            >
              <path
                fillRule="evenodd"
                d="M9 3.5a5.5 5.5 0 1 1-3.476 9.732l-2.798 2.8a.75.75 0 1 1-1.06-1.061l2.797-2.799A5.5 5.5 0 0 1 9 3.5Zm0 1.5a4 4 0 1 0 0 8 4 4 0 0 0 0-8Z"
                clipRule="evenodd"
              />
            </svg>
          </span>
        </div>
        {(onReset || actions) && (
          <div className="flex flex-wrap items-center gap-2 sm:justify-end">
            {onReset && (
              <button
                type="button"
                onClick={onReset}
                className={buttonClasses({ variant: 'ghost', className: 'text-[#1c2b65]/80' })}
                disabled={!hasActiveFilters}
              >
                필터 초기화
              </button>
            )}
            {actions}
          </div>
        )}
      </div>
      <span className="sr-only" aria-live="polite">
        {isBusy ? '게시글을 불러오는 중입니다.' : '필터가 적용되었습니다.'}
      </span>
    </div>
  );
}
