<div align="center">

# Bigs-Project

<!-- 배너 이미지를 `public/banner.png` 로 추가하면 아래 이미지가 표시됩니다. 없으면 이 줄을 지워도 됩니다. -->
<img src="public/banner.png" alt="Bigs-Project Banner" width="720" />

[![Next.js](https://img.shields.io/badge/Next.js-16-black?style=flat&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-20232A?style=flat&logo=react&logoColor=61DAFB)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=flat&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?style=flat&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![ESLint](https://img.shields.io/badge/ESLint-9-4B32C3?style=flat&logo=eslint&logoColor=white)](https://eslint.org/)

</div>

## 프로젝트 개요
Bigs-Payments 관련 과제 프로젝트로, 지불자 정보 공유 커뮤니티(가칭)를 목표로 한 Next.js 기반 웹 애플리케이션입니다. 현재는 초기 스캐폴딩 상태이며, 점진적으로 기능을 확장하는 형태로 진행합니다.

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

---

문의/피드백은 이슈로 남겨 주세요. 문서나 내용 보강이 필요하면 알려주시면 바로 반영하겠습니다.