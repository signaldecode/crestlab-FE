import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getMessages } from 'next-intl/server';
import NoticeDetailContainer from '@/components/containers/board/NoticeDetailContainer';
import noticesData from '@/data/noticesData.json';

interface Props {
  params: Promise<{ locale: string; id: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const notice = noticesData.items.find((item) => item.id === Number(id));
  return { title: notice ? `${notice.title} | CrestLab` : 'CrestLab' };
}

export default async function NoticeDetailPage({ params }: Props) {
  const { id } = await params;
  const notice = noticesData.items.find((item) => item.id === Number(id));

  if (!notice) notFound();

  const messages = await getMessages();
  const board = messages.board as Record<string, unknown>;
  const admin = board.admin as Record<string, string>;
  return (
    <NoticeDetailContainer
      messages={board.notices as never}
      data={notice}
      adminMessages={{ editNotice: admin.editNotice, deleteNotice: admin.deleteNotice }}
    />
  );
}
