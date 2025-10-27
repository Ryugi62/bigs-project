'use client';

const SKELETON_COUNT = 4;

export default function BoardListSkeleton() {
  return (
    <div className="grid gap-6 sm:grid-cols-2" aria-hidden>
      {Array.from({ length: SKELETON_COUNT }).map((_, index) => (
        <div
          key={index}
          className="animate-pulse rounded-2xl border border-[#dfe4f4] bg-white p-6 shadow-sm"
        >
          <div className="mb-4 h-5 w-24 rounded-full bg-[#e3e7f4]" />
          <div className="mb-4 h-6 w-3/4 rounded-full bg-[#d4daed]" />
          <div className="mb-2 h-4 w-full rounded-full bg-[#e3e7f4]" />
          <div className="h-4 w-2/3 rounded-full bg-[#e3e7f4]" />
        </div>
      ))}
    </div>
  );
}
