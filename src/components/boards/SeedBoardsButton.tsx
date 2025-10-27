'use client';

import { useState } from 'react';
import Button from '@/components/ui/Button';
import { useSeedBoardsMutation } from '@/lib/query/mutations';
import { useAuthStore } from '@/store/auth';

const ENABLE_SEED_BUTTON = process.env.NEXT_PUBLIC_ENABLE_SEED_BUTTON === 'true';

export default function SeedBoardsButton({ count = 100 }: { count?: number }) {
  const isAuthenticated = useAuthStore((state) => Boolean(state.user));
  const [confirming, setConfirming] = useState(false);
  const seedMutation = useSeedBoardsMutation();

  if (!ENABLE_SEED_BUTTON || !isAuthenticated) {
    return null;
  }

  const handleRequest = async () => {
    try {
      await seedMutation.mutateAsync({ count });
    } finally {
      setConfirming(false);
    }
  };

  return confirming ? (
    <div className="flex items-center gap-2">
      <Button
        variant="ghost"
        onClick={handleRequest}
        disabled={seedMutation.isPending}
        className="text-[#1c2b65]"
      >
        {seedMutation.isPending ? '생성 중...' : `${count}개 생성 확정`}
      </Button>
      <Button
        variant="ghost"
        onClick={() => setConfirming(false)}
        disabled={seedMutation.isPending}
      >
        취소
      </Button>
    </div>
  ) : (
    <Button
      variant="ghost"
      onClick={() => setConfirming(true)}
      disabled={seedMutation.isPending}
      className="text-[#1c2b65]"
    >
      {seedMutation.isPending ? '생성 중...' : `면접용 더미 ${count}개 만들기`}
    </Button>
  );
}
