import type { Metadata } from 'next';
import './globals.css';
import Providers from '@/app/providers';
import Toaster from '@/components/Toaster';

export const metadata: Metadata = {
  title: 'Bigs | OpsHub Personal',
  description:
    '로그인한 사용자의 게시글만 안전하게 불러와 카테고리와 검색으로 관리하는 개인 운영 게시판.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className="antialiased">
        <Providers>
          {children}
          <Toaster />
        </Providers>
      </body>
    </html>
  );
}
