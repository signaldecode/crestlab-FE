import type { Metadata } from 'next';
import NoticeListContainer from '@/components/containers/board/NoticeListContainer';
import boardMsg from '@/messages/ko/board.json';
import noticesData from '@/data/noticesData.json';

export const metadata: Metadata = {
  title: '공지사항 | CrestLab',
  description: 'CrestLab의 최신 공지사항을 확인하세요.',
};

export default function NoticesPage() {
  return (
    <main id="main-content">
      <NoticeListContainer messages={boardMsg.notices} data={noticesData} />
    </main>
  );
}
