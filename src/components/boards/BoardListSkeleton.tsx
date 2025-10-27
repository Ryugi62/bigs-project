'use client';

const SKELETON_COUNT = 4;

export default function BoardListSkeleton() {
  return (
    <div className="grid gap-6 md:grid-cols-2" aria-hidden>
      {Array.from({ length: SKELETON_COUNT }).map((_, index) => (
        <div
          key={index}
          className="animate-pulse rounded-3xl bg-white/60 p-8 shadow-[0_24px_80px_rgba(20,38,94,0.08)]"
        >
          <div className="mb-4 h-5 w-24 rounded-full bg-[#d9def0]" />
          <div className="mb-4 h-7 w-3/4 rounded-full bg-[#c3cbe4]" />
          <div className="mb-2 h-4 w-full rounded-full bg-[#d9def0]" />
          <div className="h-4 w-2/3 rounded-full bg-[#d9def0]" />
        </div>
      ))}
    </div>
  );
}
