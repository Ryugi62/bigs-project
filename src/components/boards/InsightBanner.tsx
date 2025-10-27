import Link from 'next/link';
import { buttonClasses } from '@/components/ui/Button';

const insights = [
  {
    title: '본인 게시글만 안전하게 로드',
    description:
      'BFF 프록시와 토큰 검증을 통과한 사용자 글만 불러와 다른 동료의 데이터가 섞이지 않습니다.',
  },
  {
    title: '카테고리 · 키워드 필터링',
    description:
      'NOTICE, QNA, FREE, ETC 분류와 검색어를 조합해 내가 필요한 글을 즉시 찾을 수 있습니다.',
  },
  {
    title: '즉시 수정/삭제 워크플로',
    description: 'React Query 캐시와 토스트 피드백으로 목록과 상세가 자동으로 동기화됩니다.',
  },
];

export default function InsightBanner() {
  return (
    <section className="relative overflow-hidden rounded-3xl border border-[#dfe4f4] bg-white px-6 py-8 shadow-sm sm:px-10 sm:py-10">
      <div
        className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(28,43,101,0.08),transparent_70%)]"
        aria-hidden="true"
      />
      <div className="relative flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
        <div className="space-y-4 text-[#0b1a3a]">
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[#1c2b65]/70">
            Workspace Features
          </p>
          <h2 className="text-2xl font-bold leading-snug sm:text-3xl">
            내 게시글 관리에 필요한 기능만 담았습니다.
          </h2>
          <p className="text-sm text-[#425079] sm:text-base">
            카테고리 필터, 키워드 검색, 작성/수정/삭제 흐름을 집중적으로 지원해 개인 작업 로그를
            빠르게 정리할 수 있습니다.
          </p>
          <div className="flex flex-wrap gap-2 text-sm text-[#1c2b65]/70">
            <span className="rounded-full bg-[#eff2fb] px-3 py-1 font-medium">Next.js 16</span>
            <span className="rounded-full bg-[#eff2fb] px-3 py-1 font-medium">React Query 5</span>
            <span className="rounded-full bg-[#eff2fb] px-3 py-1 font-medium">Zustand</span>
            <span className="rounded-full bg-[#eff2fb] px-3 py-1 font-medium">Axios</span>
            <span className="rounded-full bg-[#eff2fb] px-3 py-1 font-medium">Tailwind CSS</span>
          </div>
        </div>
        <div className="flex flex-1 flex-col gap-6 rounded-2xl border border-[#e6ebf7] bg-[#f8f9fd] p-6">
          <ul className="space-y-4">
            {insights.map((item) => (
              <li key={item.title} className="flex items-start gap-3">
                <span
                  className="mt-1 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#1c2b65] text-xs font-bold text-white"
                  aria-hidden
                >
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
            새 글 작성하기
          </Link>
        </div>
      </div>
    </section>
  );
}
