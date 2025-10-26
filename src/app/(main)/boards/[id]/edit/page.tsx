import BoardEditor from '@/components/boards/BoardEditor';
import { getBoardDetail } from '@/app/(main)/boards/_lib/getBoardDetail';

export default async function BoardEditPage({ params }: { params: { id: string } }) {
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
