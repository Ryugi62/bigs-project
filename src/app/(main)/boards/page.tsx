import PageHero from '@/components/layout/PageHero';
import BoardGrid from '@/components/boards/BoardGrid';

export default function BoardsPage() {
  return (
    <div className="flex flex-col gap-10">
      <PageHero
        eyebrow="Boards"
        title="전체 게시글"
        description="카테고리 별로 공지, Q&A, 자유게시판을 탐색하고 필요한 정보를 신속하게 찾아보세요."
      />
      <BoardGrid />
    </div>
  );
}
