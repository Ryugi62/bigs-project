import Link from 'next/link';
import CategoryBadge from '@/components/ui/CategoryBadge';
import { buttonClasses } from '@/components/ui/Button';
import { getBoardDetail } from '@/app/(main)/boards/_lib/getBoardDetail';

const formatter = new Intl.DateTimeFormat('ko-KR', {
  year: 'numeric',
  month: '2-digit',
  day: '2-digit',
  hour: '2-digit',
  minute: '2-digit',
});

export default async function BoardDetailPage({ params }: { params: { id: string } }) {
  const board = await getBoardDetail(params.id);

  return (
    <article className="mx-auto flex w-full max-w-4xl flex-col gap-10 rounded-[32px] border border-white/50 bg-white/95 p-10 shadow-[0_40px_140px_rgba(15,32,88,0.18)]">
      <header className="space-y-5">
        <CategoryBadge category={board.boardCategory} />
        <h1 className="text-4xl font-bold text-[#0f1f4b]">{board.title}</h1>
        <div className="flex flex-wrap items-center gap-4 text-sm text-[#425079]">
          <time dateTime={board.createdAt}>{formatter.format(new Date(board.createdAt))}</time>
          {board.author?.name && (
            <span className="inline-flex items-center gap-2">
              <span className="h-8 w-8 rounded-full bg-[#e4ecff] text-center text-xs font-semibold leading-8 text-[#1c2b65]">
                {board.author.name
                  .split(' ')
                  .map((part) => part.charAt(0))
                  .join('')
                  .slice(0, 2)}
              </span>
              <span>{board.author.name}</span>
            </span>
          )}
          <span className="rounded-full bg-[#f0f4ff] px-3 py-1 text-xs font-semibold text-[#1c2b65]">
            문서 번호 #{board.id}
          </span>
        </div>
      </header>

      {board.imageUrl && (
        <div className="overflow-hidden rounded-3xl border border-[#e2e8f5]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={board.imageUrl} alt="게시글 이미지" className="h-auto w-full object-cover" />
        </div>
      )}

      <div className="prose max-w-none text-[#1c2b65] prose-headings:font-bold prose-headings:text-[#0f1f4b] prose-a:text-[#1c2b65] prose-strong:text-[#0f1f4b] prose-code:rounded-md prose-code:bg-[#f6f7fb] prose-code:px-1.5 prose-code:py-1">
        <div dangerouslySetInnerHTML={{ __html: board.content }} />
      </div>

      <footer className="flex flex-col gap-4 border-t border-[#e2e8f5] pt-6 text-sm text-[#425079] sm:flex-row sm:items-center sm:justify-between">
        <Link href="/boards" className="text-[#1c2b65] hover:underline">
          목록으로 돌아가기
        </Link>
        <div className="flex flex-wrap gap-3">
          <Link
            href={`/boards/${board.id}/edit`}
            className={buttonClasses({ variant: 'secondary' })}
          >
            글 수정
          </Link>
          <button type="button" className={buttonClasses({ variant: 'ghost' })}>
            삭제 요청
          </button>
        </div>
      </footer>
    </article>
  );
}
