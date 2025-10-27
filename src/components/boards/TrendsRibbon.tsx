const highlights = [
  { label: '카테고리 필터', value: 'NOTICE · QNA · FREE · ETC' },
  { label: '키워드 검색', value: '제목·본문 텍스트 즉시 찾기' },
  { label: '작성한 글 관리', value: '등록 · 수정 · 삭제 지원' },
];

export default function TrendsRibbon() {
  return (
    <div className="flex w-full flex-col gap-4 rounded-2xl border border-[#dfe4f4] bg-white/80 px-5 py-4 text-sm text-[#1c2b65] backdrop-blur sm:flex-row sm:items-center sm:gap-6">
      {highlights.map((item) => (
        <div key={item.label} className="flex flex-1 flex-col gap-1">
          <span className="text-xs font-semibold uppercase tracking-[0.3em] text-[#1c2b65]/60">
            {item.label}
          </span>
          <span className="text-xl font-semibold text-[#10234b]">{item.value}</span>
        </div>
      ))}
    </div>
  );
}
