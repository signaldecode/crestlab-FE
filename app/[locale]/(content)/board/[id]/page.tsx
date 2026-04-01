import { getMessages } from 'next-intl/server';
import BoardDetailContainer from '@/components/containers/board/BoardDetailContainer';

interface BoardDetailPageProps {
  params: Promise<{ id: string }>;
}

const MOCK_POST = {
  id: 1,
  title: '첫 번째 게시글입니다',
  author: 'user1',
  date: '2026-03-28',
  views: 42,
  content: '게시글 본문 내용이 여기에 표시됩니다.\n\n여러 줄의 내용을 포함할 수 있습니다.',
};

export async function generateMetadata() {
  // TODO: fetch post by id for dynamic title
  return { title: `${MOCK_POST.title} | CrestLab` };
}

export default async function BoardDetailPage({ params }: BoardDetailPageProps) {
  const { id } = await params;
  const messages = await getMessages();
  const board = messages.board as Record<string, unknown>;

  // TODO: fetch post by id from API (GET /api/board/{id})
  const post = { ...MOCK_POST, id: Number(id) };

  return (
    <BoardDetailContainer
      messages={board.community as never}
      data={post}
    />
  );
}
