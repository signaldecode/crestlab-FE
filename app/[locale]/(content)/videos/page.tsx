import { getMessages, getTranslations } from 'next-intl/server';
import VideoListContainer from '@/components/containers/board/VideoListContainer';
import videosData from '@/data/videosData.json';

export async function generateMetadata() {
  const t = await getTranslations('board.videos');
  return { title: `${t('title')} | CrestLab` };
}

export default async function VideosPage() {
  const messages = await getMessages();
  const board = messages.board as Record<string, unknown>;
  const admin = board.admin as Record<string, string>;
  return (
    <VideoListContainer
      messages={board.videos as never}
      data={videosData}
      adminMessages={{ uploadVideo: admin.uploadVideo }}
    />
  );
}
