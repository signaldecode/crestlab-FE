import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import NoticeDetailContainer from '@/components/containers/board/NoticeDetailContainer';
import boardMsg from '@/messages/ko/board.json';
import noticesData from '@/data/noticesData.json';

interface NoticeDetailPageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: NoticeDetailPageProps): Promise<Metadata> {
  const { id } = await params;
  const notice = noticesData.items.find((item) => item.id === Number(id));

  if (!notice) {
    return { title: '공지사항 | CrestLab' };
  }

  return {
    title: `${notice.title} | CrestLab`,
    description: notice.content.slice(0, 160),
  };
}

export default async function NoticeDetailPage({ params }: NoticeDetailPageProps) {
  const { id } = await params;
  const notice = noticesData.items.find((item) => item.id === Number(id));

  if (!notice) {
    notFound();
  }

  return (
    <main id="main-content">
      <NoticeDetailContainer messages={boardMsg.notices} data={notice} />
    </main>
  );
}
