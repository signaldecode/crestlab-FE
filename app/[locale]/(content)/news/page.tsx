import { getMessages, getTranslations } from 'next-intl/server';
import NewsListContainer from '@/components/containers/board/NewsListContainer';
import newsData from '@/data/newsData.json';

export async function generateMetadata() {
  const t = await getTranslations('board.news');
  return { title: `${t('title')} | CrestLab` };
}

export default async function NewsPage() {
  const messages = await getMessages();
  const board = messages.board as Record<string, unknown>;
  return <NewsListContainer messages={board.news as never} data={newsData} />;
}
