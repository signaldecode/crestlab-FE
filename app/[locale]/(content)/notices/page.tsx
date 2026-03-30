import { getMessages, getTranslations } from 'next-intl/server';
import NoticeListContainer from '@/components/containers/board/NoticeListContainer';
import noticesData from '@/data/noticesData.json';

export async function generateMetadata() {
  const t = await getTranslations('board.notices');
  return { title: `${t('title')} | CrestLab` };
}

export default async function NoticesPage() {
  const messages = await getMessages();
  const board = messages.board as Record<string, unknown>;
  const admin = board.admin as Record<string, string>;
  return (
    <NoticeListContainer
      messages={board.notices as never}
      data={noticesData}
      adminMessages={{ writeNotice: admin.writeNotice }}
    />
  );
}
