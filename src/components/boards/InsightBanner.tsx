import Link from 'next/link';
import { buttonClasses } from '@/components/ui/Button';

const insights = [
  {
    title: '실시간 장애 브리핑',
    description: '장애 게시글을 자동으로 모아서 상황판 형태로 보여줍니다.',
  },
  {
    title: '릴리스 캘린더',
    description: '주요 배포 일정을 타임라인으로 정렬해 후속 조치를 돕습니다.',
  },
  {
    title: 'AI 기반 요약',
    description: '게시글 전문을 읽기 어려울 때 핵심만 빠르게 파악하세요.',
  },
];

export default function InsightBanner() {
  return (
    <section className="relative overflow-hidden rounded-[28px] border border-white/40 bg-white/80 px-8 py-10 shadow-[0_30px_120px_rgba(15,32,88,0.12)]">
      <div
        className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(28,43,101,0.14),transparent_55%)]"
        aria-hidden="true"
      />
      <div className="relative flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
        <div className="space-y-3 text-[#0b1a3a]">
          <p className="text-sm font-semibold uppercase tracking-[0.4em] text-[#1c2b65]/60">
            Insights
          </p>
          <h2 className="text-3xl font-bold leading-snug">
            운영팀이 가장 자주 찾는 정보, 자동으로 정리됩니다.
          </h2>
          <p className="text-base text-[#425079]">
            반복되는 업무를 줄이고 핵심에 집중하세요. 맞춤 추천과 정교한 필터로 원하는 정보를 빠르게
            찾을 수 있습니다.
          </p>
          <div className="flex flex-wrap gap-2 text-sm text-[#1c2b65]/70">
            <span className="rounded-full bg-[#e4ecff] px-3 py-1 font-medium">태그 하이라이트</span>
            <span className="rounded-full bg-[#e4ecff] px-3 py-1 font-medium">오픈 API 연동</span>
            <span className="rounded-full bg-[#e4ecff] px-3 py-1 font-medium">접근성 준수</span>
          </div>
        </div>
        <div className="flex flex-1 flex-col gap-6 rounded-3xl border border-[#dfe6f6] bg-white/70 p-6">
          <ul className="space-y-4">
            {insights.map((item) => (
              <li key={item.title} className="flex items-start gap-3">
                <span className="mt-1 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#1c2b65] text-xs font-bold text-white">
                  •
                </span>
                <div>
                  <p className="text-base font-semibold text-[#1c2b65]">{item.title}</p>
                  <p className="text-sm text-[#425079]">{item.description}</p>
                </div>
              </li>
            ))}
          </ul>
          <Link href="/boards/new" className={buttonClasses({ variant: 'secondary' })}>
            운영 인사이트 만들기
          </Link>
        </div>
      </div>
    </section>
  );
}
