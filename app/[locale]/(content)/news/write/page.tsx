import { getMessages, getTranslations } from 'next-intl/server';
import NewsUploadContainer from '@/components/containers/board/NewsUploadContainer';

export async function generateMetadata() {
  const t = await getTranslations('board.admin.newsUploadForm');
  return { title: `${t('title')} | CrestLab` };
}

export default async function NewsWritePage() {
  const t = await getTranslations('board.admin.newsUploadForm');
  const allMessages = await getMessages();
  const common = allMessages.common as Record<string, unknown>;

  const messages = {
    title: t('title'),
    subtitle: t('subtitle'),
    modeUrl: t('modeUrl'),
    modeManual: t('modeManual'),
    url: t('url'),
    urlPlaceholder: t('urlPlaceholder'),
    scrapeButton: t('scrapeButton'),
    scraping: t('scraping'),
    scrapeSuccess: t('scrapeSuccess'),
    newsTitle: t('newsTitle'),
    newsTitlePlaceholder: t('newsTitlePlaceholder'),
    content: t('content'),
    contentPlaceholder: t('contentPlaceholder'),
    source: t('source'),
    sourcePlaceholder: t('sourcePlaceholder'),
    sourceUrl: t('sourceUrl'),
    sourceUrlPlaceholder: t('sourceUrlPlaceholder'),
    thumbnail: t('thumbnail'),
    thumbnailHint: t('thumbnailHint'),
    selectFile: t('selectFile'),
    changeFile: t('changeFile'),
    noFileSelected: t('noFileSelected'),
    submit: t('submit'),
    submitAriaLabel: t('submitAriaLabel'),
    backToList: t('backToList'),
    errors: {
      urlRequired: t('errors.urlRequired'),
      urlInvalid: t('errors.urlInvalid'),
      scrapeFailed: t('errors.scrapeFailed'),
      titleRequired: t('errors.titleRequired'),
      contentRequired: t('errors.contentRequired'),
      sourceRequired: t('errors.sourceRequired'),
    },
  };

  return (
    <NewsUploadContainer
      messages={messages}
      editorMessages={common.editor as never}
    />
  );
}
