import BoardEditor from '@/components/boards/BoardEditor';
import { requireAuth } from '@/app/(main)/boards/_lib/requireAuth';

export default async function NewBoardPage() {
  await requireAuth('/boards/new', '게시글 작성은 로그인한 사용자만 가능합니다.');
  return <BoardEditor mode="create" />;
}
