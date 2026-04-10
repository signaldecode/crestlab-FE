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

  const related = educationData.videos
    .filter((v) => v.slug !== slug && v.category === video.category)
    .slice(0, 4) as VideoItem[];

  const messages = {
    backToList: t('backToList'),
    relatedTitle: t('detail.relatedTitle'),
    categoryLabel: t('detail.categoryLabel'),
    disclaimer: t('detail.disclaimer'),
    categories: {
      beginner: t('videos.categories.beginner'),
      intermediate: t('videos.categories.intermediate'),
      'technical-analysis': t('videos.categories.technicalAnalysis'),
      'crypto-basics': t('videos.categories.cryptoBasics'),
      'market-strategy': t('videos.categories.marketStrategy'),
    },
  };

  return (
    <VideoPlayerContainer messages={messages} data={video as VideoItem} related={related} />
  );
}
