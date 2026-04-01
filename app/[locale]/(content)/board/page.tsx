import { getMessages, getTranslations } from 'next-intl/server';
import BoardListContainer from '@/components/containers/board/BoardListContainer';

export async function generateMetadata() {
  const t = await getTranslations('board.community');
  return { title: `${t('title')} | CrestLab` };
}

const MOCK_ITEMS = [
  { id: 1, title: '첫 번째 게시글입니다', author: 'user1', date: '2026-03-28', views: 42 },
  { id: 2, title: '투자 관련 질문이 있습니다', author: 'user2', date: '2026-03-30', views: 15 },
  { id: 3, title: 'CrestLab 후기 공유합니다', author: 'user3', date: '2026-04-01', views: 8 },
];

export default async function BoardPage() {
  const messages = await getMessages();
  const board = messages.board as Record<string, unknown>;

  return (
    <BoardListContainer
      messages={board.community as never}
      data={{ items: MOCK_ITEMS }}
    />
  );
}
