import AuthShowcase from '@/components/auth/AuthShowcase';
import SignUpForm from '@/components/auth/SignUpForm';

const highlights = [
  {
    title: '역할 기반 접근 제어',
    description: '권한 그룹을 설정해 민감한 정보를 안전하게 관리하세요.',
  },
  {
    title: '릴리즈 캘린더',
    description: '서비스별 배포 히스토리를 한 화면에서 비교하고 추적할 수 있습니다.',
  },
  { title: '인사이트 위젯', description: '팀에 필요한 지표를 위젯으로 구성해 한눈에 확인하세요.' },
];

export default function SignUpPage() {
  return (
    <>
      <AuthShowcase
        title="OpsHub과 함께 더 나은 운영 문화를 구축하세요"
        subtitle="계정을 만들고 각종 게시글과 런북을 손쉽게 공유해 팀의 응답성을 높이세요."
        highlights={highlights}
      />
      <SignUpForm />
    </>
  );
}
