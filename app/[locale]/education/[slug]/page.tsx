import { notFound } from 'next/navigation';
import { getTranslations } from 'next-intl/server';
import VideoPlayerContainer from '@/components/containers/education/VideoPlayerContainer';
import type { VideoItem } from '@/types/finance';
import educationData from '@/data/mock/educationData.json';

interface EducationDetailPageProps {
  params: Promise<{ locale: string; slug: string }>;
}

export async function generateMetadata({ params }: EducationDetailPageProps) {
  const { slug } = await params;
  const video = educationData.videos.find((v) => v.slug === slug);
  if (!video) return { title: 'Not Found' };
  return {
    title: `${video.title} | CrestLab Education`,
    description: video.description,
  };
}

export default async function EducationDetailPage({ params }: EducationDetailPageProps) {
  const { slug } = await params;
  const t = await getTranslations('education');

  const video = educationData.videos.find((v) => v.slug === slug);
  if (!video) notFound();

  const msg = { backToList: t('backToList') };

  return <VideoPlayerContainer messages={msg} data={video as VideoItem} />;
}
