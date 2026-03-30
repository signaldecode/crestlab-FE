import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getMessages } from 'next-intl/server';
import VideoDetailContainer from '@/components/containers/board/VideoDetailContainer';
import videosData from '@/data/videosData.json';

interface Props {
  params: Promise<{ locale: string; slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const video = videosData.items.find((item) => item.slug === slug);
  return { title: video ? `${video.title} | CrestLab` : 'CrestLab' };
}

export default async function VideoDetailPage({ params }: Props) {
  const { slug } = await params;
  const video = videosData.items.find((item) => item.slug === slug);

  if (!video) notFound();

  const messages = await getMessages();
  const board = messages.board as Record<string, unknown>;
  const admin = board.admin as Record<string, string>;
  return (
    <VideoDetailContainer
      messages={board.videos as never}
      data={video}
      adminMessages={{ editVideo: admin.editVideo, deleteVideo: admin.deleteVideo }}
    />
  );
}
