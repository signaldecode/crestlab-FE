import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import VideoDetailContainer from '@/components/containers/board/VideoDetailContainer';
import boardMsg from '@/messages/ko/board.json';
import videosData from '@/data/videosData.json';

interface VideoDetailPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: VideoDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const video = videosData.items.find((item) => item.slug === slug);

  if (!video) {
    return { title: '투자 교육 영상 | CrestLab' };
  }

  return {
    title: `${video.title} | CrestLab`,
    description: video.description,
  };
}

export default async function VideoDetailPage({ params }: VideoDetailPageProps) {
  const { slug } = await params;
  const video = videosData.items.find((item) => item.slug === slug);

  if (!video) {
    notFound();
  }

  return (
    <main id="main-content">
      <VideoDetailContainer messages={boardMsg.videos} data={video} />
    </main>
  );
}
