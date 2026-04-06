import { getTranslations } from 'next-intl/server';
import EducationPageContainer from '@/components/containers/education/EducationPageContainer';
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

  const messages = {
    tabs: {
      videos: t('tabs.videos'),
      articles: t('tabs.articles'),
      faq: t('tabs.faq'),
    },
    videos: {
      title: t('videos.title'),
      filterAll: t('videos.filterAll'),
      categories: {
        beginner: t('videos.categories.beginner'),
        'technical-analysis': t('videos.categories.technicalAnalysis'),
        'crypto-basics': t('videos.categories.cryptoBasics'),
      },
    },
    articles: {
      title: t('articles.title'),
      empty: t('articles.empty'),
    },
    faq: {
      title: t('faq.title'),
    },
  };

  return (
    <EducationPageContainer
      messages={messages}
      videosData={educationData.videos as VideoItem[]}
    />
  );
}
