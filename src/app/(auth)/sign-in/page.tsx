import AuthShowcase from '@/components/auth/AuthShowcase';
import SignInForm from '@/components/auth/SignInForm';

const highlights = [
  {
    title: '상황 공유 자동화',
    description: '장애/공지 게시글을 팀 채널과 연동해 실시간 전파합니다.',
  },
  {
    title: '런북 바로가기',
    description: '운영 가이드를 단계별로 정리해 누구나 빠르게 대응할 수 있습니다.',
  },
  {
    title: '태그 인텔리전스',
    description: '카테고리와 태그를 조합해 원하는 정보를 즉시 찾을 수 있습니다.',
  },
];

export default function SignInPage() {
  return (
    <>
      <AuthShowcase
        title="OpsHub으로 운영 워크플로우를 정리하세요"
        subtitle="통합된 사내 커뮤니케이션으로 장애 대응 시간을 단축하고, 팀과 지식을 공유하세요."
        highlights={highlights}
      />
      <SignInForm />
    </>
  );
}
