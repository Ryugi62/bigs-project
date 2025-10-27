import PageHero from '@/components/layout/PageHero';
import BoardGrid from '@/components/boards/BoardGrid';

export default function BoardsPage() {
  return (
    <div className="flex flex-col gap-10">
      <PageHero
        eyebrow="My Boards"
        title="내 게시글 목록"
        description="NOTICE, QNA, FREE, ETC 카테고리와 검색어 필터를 조합해 내가 작성한 글을 빠르게 찾아보세요."
      />
      <BoardGrid />
    </div>
  );
}
