<div align="center">

# **BIGS OpsHub — 상태·릴리스·런북 포털**

<!-- 배너 이미지를 `public/banner.png` 로 추가하면 아래 이미지가 표시됩니다. 없으면 이 줄을 지워도 됩니다. -->
<img src="public/banner.png" alt="Bigs-Project Banner" width="720" />

[![Next.js](https://img.shields.io/badge/Next.js-16-black?style=flat&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-20232A?style=flat&logo=react&logoColor=61DAFB)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=flat&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?style=flat&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![ESLint](https://img.shields.io/badge/ESLint-9-4B32C3?style=flat&logo=eslint&logoColor=white)](https://eslint.org/)

</div>

# 설명

빅스페이먼츠 기술과제 프로젝트로, 제공 API(`/auth`, `/boards`)만으로 공지·장애(Status)·배포(Changelog)·운영 가이드(Runbook)를 한 화면에서 관리/소비할 수 있게 만드는 경량 포털입니다.

게시글 카테고리(NOTICE/QNA/… )와 제목 태그(`[OUTAGE]`, `[RELEASE]`, `[RUNBOOK]`, `[SEV:n]`, `[COMP:x]`)를 파싱해 상단 장애 배너, 릴리스 타임라인, 단계형 가이드를 프론트 규칙만으로 자동 구성합니다. 로그인/회원가입은 `/auth`, 사용자 표시는 JWT 페이로드 디코딩으로 처리하며, 글 등록·수정·삭제·페이지네이션은 `/boards`를 그대로 사용합니다. 반응형·접근성·에러 처리까지 갖춘, 사내 커뮤니케이션 허브를 목표로 제작했습니다.

## 데모/배포
- 배포 주소: https://test.com/

## 기술 스택
- Next.js 16 (App Router)
- React 19, TypeScript 5
- Tailwind CSS 4, PostCSS
- ESLint 9, eslint-config-next

## 폴더 구조
```
.
├─ next.config.ts           # Next.js 설정
├─ postcss.config.mjs       # PostCSS/Tailwind 설정
├─ eslint.config.mjs        # ESLint 설정
├─ tsconfig.json            # TS 설정
├─ public/                  # 정적 자산 (배너, 아이콘 등)
└─ src/
   └─ app/
      ├─ layout.tsx        # 루트 레이아웃
      ├─ page.tsx          # 홈 페이지
      └─ globals.css       # 전역 스타일 (Tailwind 포함)
```

## 빠른 시작
사전 요구 사항
- Node.js 18.18 이상 또는 20 이상 권장
- npm 사용 (이 저장소는 `package-lock.json`을 포함합니다)

설치 및 실행
```
# 저장소 클론
git clone https://github.com/Ryugi62/bigs-project.git
cd bigs-project

# 의존성 설치
npm install

# 개발 서버 실행 (http://localhost:3000)
npm run dev

# 프로덕션 빌드 및 실행
npm run build
npm start

# 코드 품질 점검
npm run lint
```

## 주요 기능
- [ ] 사용자 인증 (이메일/소셜)
- [ ] 게시글 CRUD 및 태깅
- [ ] 검색/필터 및 정렬
- [ ] 알림 및 구독
- [ ] 반응형 UI 및 다크 모드

## 개발 일정
- 1차: 기본 페이지/레이아웃 구성, UI 토큰 정리
- 2차: 핵심 도메인(게시글) CRUD, 라우팅/상태관리
- 3차: 인증 연동, 배포/모니터링, 성능 점검

## 코드 스타일 & 규칙
- TypeScript를 기본으로 사용합니다.
- ESLint(Next.js 권장 구성)로 린팅합니다: `npm run lint`
- Tailwind CSS 4를 사용하여 유틸리티 우선 스타일을 적용합니다.

## 배포 가이드 (권장)
- Vercel에 손쉽게 배포할 수 있습니다.
  - 환경 변수 필요 시 Vercel Project Settings → Environment Variables에서 관리
  - `npm run build`가 성공하는지 로컬에서 먼저 확인

## 서버/클라이언트 상태 관리 가이드

- 서버 상태: @tanstack/react-query로 페칭/캐싱/리페치/리트라이 관리
- 클라이언트 상태: Zustand로 UI/세션 등의 로컬 상태 관리

### React Query 사용법
- Provider: 앱은 이미 `QueryClientProvider`로 래핑되어 있습니다.
  - 파일: `src/app/providers.tsx`, `src/lib/query/client.ts`
- 예시 쿼리 훅: `useBoardsQuery`
  - 파일: `src/lib/query/boards.ts`
```
import { useBoardsQuery } from '@/lib/query/boards'

export default function Boards() {
  const { data, isLoading, error } = useBoardsQuery()
  if (isLoading) return <div>Loading...</div>
  if (error) return <div>에러가 발생했어요.</div>
  return <pre>{JSON.stringify(data, null, 2)}</pre>
}
```

### Zustand 사용법
- UI 스토어 예시: 사이드바 열림/닫힘 상태
  - 파일: `src/store/ui.ts`
```
import { useUiStore } from '@/store/ui'

function ToggleSidebar() {
  const open = useUiStore(s => s.isSidebarOpen)
  const toggle = useUiStore(s => s.toggleSidebar)
  return <button onClick={toggle}>{open ? '닫기' : '열기'}</button>
}
```

### 환경 변수
- Axios 베이스 URL: `NEXT_PUBLIC_API_BASE_URL`
  - 예시: `.env.local` → `NEXT_PUBLIC_API_BASE_URL=http://localhost:4000`
  - 공통 클라이언트 파일: `src/lib/api/client.ts`

---

문의/피드백은 이슈로 남겨 주세요. 문서나 내용 보강이 필요하면 알려주시면 바로 반영하겠습니다.