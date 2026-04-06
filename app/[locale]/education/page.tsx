import { getTranslations } from 'next-intl/server';
import VideoCategoryContainer from '@/components/containers/education/VideoCategoryContainer';
import type { VideoItem } from '@/types/finance';
import educationData from '@/data/mock/educationData.json';

export async function generateMetadata() {
  const t = await getTranslations('seo.education');
  return {
    title: t('title'),
    description: t('description'),
  };
}

export default async function EducationPage() {
  const t = await getTranslations('education');

  const msg = {
    title: t('title'),
    filterAll: t('filterAll'),
    categories: {
      beginner: t('categories.beginner'),
      'technical-analysis': t('categories.technicalAnalysis'),
      'crypto-basics': t('categories.cryptoBasics'),
    },
  };

  return <VideoCategoryContainer messages={msg} data={educationData.videos as VideoItem[]} />;
}
