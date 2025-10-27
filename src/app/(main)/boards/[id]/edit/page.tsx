import BoardEditor from '@/components/boards/BoardEditor';
import { getBoardDetail } from '@/app/(main)/boards/_lib/getBoardDetail';
import { requireAuth } from '@/app/(main)/boards/_lib/requireAuth';

type BoardEditParams = { id: string };

type BoardEditPageProps = {
  params: Promise<BoardEditParams>;
};

export default async function BoardEditPage({ params }: BoardEditPageProps) {
  const resolved = await params;
  const boardIdParam = resolved.id;
  await requireAuth(`/boards/${boardIdParam}/edit`, '게시글 수정은 로그인한 사용자만 가능합니다.');
  const board = await getBoardDetail(boardIdParam);
  return (
    <BoardEditor
      mode="edit"
      boardId={Number.parseInt(boardIdParam, 10)}
      initial={{
        title: board.title,
        content: board.content,
        boardCategory: board.boardCategory,
      }}
    />
  );
}
