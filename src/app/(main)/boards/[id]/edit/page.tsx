import BoardEditor from '@/components/boards/BoardEditor';
import { getBoardDetail } from '@/app/(main)/boards/_lib/getBoardDetail';
import { requireAuth } from '@/app/(main)/boards/_lib/requireAuth';

export default async function BoardEditPage({ params }: { params: { id: string } }) {
  await requireAuth(`/boards/${params.id}/edit`, '게시글 수정은 로그인한 사용자만 가능합니다.');
  const board = await getBoardDetail(params.id);
  return (
    <BoardEditor
      mode="edit"
      boardId={Number.parseInt(params.id, 10)}
      initial={{
        title: board.title,
        content: board.content,
        boardCategory: board.boardCategory,
      }}
    />
  );
}
