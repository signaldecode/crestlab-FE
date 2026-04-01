import { getTranslations } from 'next-intl/server';
import VideoUploadContainer from '@/components/containers/board/VideoUploadContainer';

export async function generateMetadata() {
  const t = await getTranslations('board.admin.uploadForm');
  return { title: `${t('title')} | CrestLab` };
}

export default async function VideoUploadPage() {
  const t = await getTranslations('board.admin.uploadForm');

  const messages = {
    title: t('title'),
    subtitle: t('subtitle'),
    videoTitle: t('videoTitle'),
    videoTitlePlaceholder: t('videoTitlePlaceholder'),
    description: t('description'),
    descriptionPlaceholder: t('descriptionPlaceholder'),
    category: t('category'),
    categoryPlaceholder: t('categoryPlaceholder'),
    categories: {
      market: t('categories.market'),
      strategy: t('categories.strategy'),
      beginner: t('categories.beginner'),
      advanced: t('categories.advanced'),
    },
    videoFile: t('videoFile'),
    videoFileHint: t('videoFileHint'),
    thumbnail: t('thumbnail'),
    thumbnailHint: t('thumbnailHint'),
    selectFile: t('selectFile'),
    changeFile: t('changeFile'),
    noFileSelected: t('noFileSelected'),
    submit: t('submit'),
    submitAriaLabel: t('submitAriaLabel'),
    backToList: t('backToList'),
    errors: {
      titleRequired: t('errors.titleRequired'),
      descriptionRequired: t('errors.descriptionRequired'),
      categoryRequired: t('errors.categoryRequired'),
      videoFileRequired: t('errors.videoFileRequired'),
    },
  };

  return <VideoUploadContainer messages={messages} />;
}
