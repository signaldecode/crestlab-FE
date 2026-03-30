import type { Metadata } from 'next';
import NewsListContainer from '@/components/containers/board/NewsListContainer';
import boardMsg from '@/messages/ko/board.json';
import newsData from '@/data/newsData.json';

export const metadata: Metadata = {
  title: '뉴스 | CrestLab',
  description: '투자 관련 최신 뉴스를 확인하세요.',
};

export default function NewsPage() {
  return (
    <main id="main-content">
      <NewsListContainer messages={boardMsg.news} data={newsData} />
    </main>
  );
}
