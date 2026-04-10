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
    title: t('title'),
    subtitle: t('subtitle'),
    videos: {
      title: t('videos.title'),
      filterAll: t('videos.filterAll'),
      filterAriaLabel: t('videos.filterAriaLabel'),
      empty: t('videos.empty'),
      categories: {
        beginner: t('videos.categories.beginner'),
        intermediate: t('videos.categories.intermediate'),
        'technical-analysis': t('videos.categories.technicalAnalysis'),
        'crypto-basics': t('videos.categories.cryptoBasics'),
        'market-strategy': t('videos.categories.marketStrategy'),
      },
    },
    admin: {
      openButton: t('admin.openButton'),
      openButtonAriaLabel: t('admin.openButtonAriaLabel'),
      closeAriaLabel: t('admin.closeAriaLabel'),
      title: t('admin.title'),
      subtitle: t('admin.subtitle'),
      urlLabel: t('admin.urlLabel'),
      urlPlaceholder: t('admin.urlPlaceholder'),
      categoryLabel: t('admin.categoryLabel'),
      submit: t('admin.submit'),
      cancel: t('admin.cancel'),
      submitting: t('admin.submitting'),
      successMessage: t('admin.successMessage'),
      fetching: t('admin.fetching'),
      fetched: t('admin.fetched'),
      fetchError: t('admin.fetchError'),
      errors: {
        invalidUrl: t('admin.errors.invalidUrl'),
        titleRequired: t('admin.errors.titleRequired'),
        categoryRequired: t('admin.errors.categoryRequired'),
      },
    },
  };

  return (
    <EducationPageContainer
      messages={messages}
      videosData={educationData.videos as VideoItem[]}
    />
  );
}
