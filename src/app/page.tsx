import MainAppShell from '@/components/layout/MainAppShell';
import HomePage from '@/app/(main)/page';

export default function RootPage() {
  return (
    <MainAppShell>
      <HomePage />
    </MainAppShell>
  );
}
