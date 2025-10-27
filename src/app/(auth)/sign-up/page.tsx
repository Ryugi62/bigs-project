import AuthShowcase from '@/components/auth/AuthShowcase';
import SignUpForm from '@/components/auth/SignUpForm';

const highlights = [
  {
    title: '본인 게시글 집중',
    description: '토큰 검증을 통과한 내 게시글만 모아서 다른 사용자의 글과 섞이지 않아요.',
  },
  {
    title: '카테고리 기반 정리',
    description: 'NOTICE, QNA, FREE, ETC 카테고리로 내가 남긴 게시글을 쉽게 정리합니다.',
  },
  {
    title: '빠른 수정 흐름',
    description: 'React Query와 Zustand로 수정/삭제 후 목록이 바로 동기화됩니다.',
  },
];

export default function SignUpPage() {
  return (
    <>
      <AuthShowcase
        title="OpsHub Personal로 내 게시글을 정리하세요"
        subtitle="계정을 생성해 내 게시글을 안전하게 관리하고, 필요한 글을 빠르게 찾아보세요."
        highlights={highlights}
      />
      <SignUpForm />
    </>
  );
}
