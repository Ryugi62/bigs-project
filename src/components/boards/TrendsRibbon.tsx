const highlights = [
  { label: '오늘 등록된 신규 공지', value: '3건' },
  { label: '대기 중 질문', value: '5건' },
  { label: '처리 완료 런북', value: '12건' },
];

export default function TrendsRibbon() {
  return (
    <div className="flex w-full flex-col gap-3 rounded-2xl bg-white/10 px-6 py-4 text-sm text-white/90 backdrop-blur lg:flex-row lg:items-center lg:gap-6">
      {highlights.map((item) => (
        <div key={item.label} className="flex flex-1 flex-col gap-1">
          <span className="text-xs uppercase tracking-[0.3em] text-white/60">{item.label}</span>
          <span className="text-xl font-semibold text-white">{item.value}</span>
        </div>
      ))}
    </div>
  );
}
