import Header from '@/components/Header';

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#0f1f4b] text-white">
      <div className="bg-white">
        <Header />
      </div>
      <div className="relative flex min-h-[calc(100vh-77px)] items-stretch justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-gradient-to-br from-[#0f1f4b] via-[#162a5c] to-[#1f3f88]"
          aria-hidden="true"
        />
        <div
          className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.18),transparent_55%)]"
          aria-hidden="true"
        />
        <div className="relative flex w-full max-w-[1200px] flex-col items-center px-4 py-12 sm:px-6 lg:flex-row lg:items-stretch lg:justify-between lg:py-20">
          {children}
        </div>
      </div>
    </div>
  );
}
