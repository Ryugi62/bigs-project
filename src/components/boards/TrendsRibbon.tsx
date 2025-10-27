const highlights = [
  { label: '오늘 등록된 신규 공지', value: '3건' },
  { label: '대기 중 질문', value: '5건' },
  { label: '처리 완료 런북', value: '12건' },
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
