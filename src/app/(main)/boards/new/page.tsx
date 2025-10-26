import BoardEditor from '@/components/boards/BoardEditor';
import { requireAuth } from '@/app/(main)/boards/_lib/requireAuth';

export default async function NewBoardPage() {
  await requireAuth('/boards/new');
  return <BoardEditor mode="create" />;
}
