import AuthShowcase from '@/components/auth/AuthShowcase';
import SignInForm from '@/components/auth/SignInForm';

const highlights = [
  {
    title: '본인 게시글만 확인',
    description: 'BFF 토큰 검증으로 내가 작성한 게시글만 안전하게 불러옵니다.',
  },
  {
    title: '카테고리 · 검색 필터',
    description: 'NOTICE, QNA, FREE, ETC 분류와 키워드로 원하는 글을 바로 찾습니다.',
  },
  {
    title: '즉시 수정/삭제',
    description: 'React Query 캐시로 목록과 상세가 즉시 동기화됩니다.',
  },
];

type SignInPageProps = {
  searchParams?: Record<string, string | string[]> | Promise<Record<string, string | string[]>>;
};

export default async function SignInPage({ searchParams }: SignInPageProps) {
  const paramsRaw = searchParams ?? {};
  const params = isPromise(paramsRaw) ? await paramsRaw : paramsRaw;
  const reasonParam = params.reason;
  const rawReason = Array.isArray(reasonParam) ? reasonParam[0] : reasonParam;
  const reason = (() => {
    if (!rawReason) return undefined;
    try {
      return decodeURIComponent(rawReason);
    } catch {
      return rawReason;
    }
  })();
  return (
    <>
      <AuthShowcase
        title="OpsHub Personal로 내 게시글을 관리하세요"
        subtitle="로그인한 사용자 본인의 게시글을 모아두고, 필터와 검색으로 빠르게 정리할 수 있습니다."
        highlights={highlights}
      />
      <SignInForm notice={reason ? reason : undefined} />
    </>
  );
}

function isPromise<T>(value: unknown): value is Promise<T> {
  return (
    typeof value === 'object' && value !== null && 'then' in (value as Record<string, unknown>)
  );
}
