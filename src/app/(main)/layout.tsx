import Header from '@/components/Header';
import SiteShell from '@/components/layout/SiteShell';

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#edf1f9]">
      <Header />
      <SiteShell>{children}</SiteShell>
    </div>
  );
}
