import { getTranslations } from 'next-intl/server';
import NewsPageContainer from '@/components/containers/news/NewsPageContainer';
import type { NewsItem } from '@/types/finance';
import newsData from '@/data/newsData.json';

export async function generateMetadata() {
  const t = await getTranslations('seo.news');
  return {
    title: t('title'),
    description: t('description'),
  };
}

export default async function NewsPage() {
  const t = await getTranslations('news');

  const messages = {
    title: t('title'),
    subtitle: t('subtitle'),
    filterAll: t('filterAll'),
    filterAriaLabel: t('filterAriaLabel'),
    categories: {
      stocks: t('categories.stocks'),
      crypto: t('categories.crypto'),
      macro: t('categories.macro'),
    },
    search: {
      label: t('search.label'),
      placeholder: t('search.placeholder'),
      ariaLabel: t('search.ariaLabel'),
      clear: t('search.clear'),
      noResults: t('search.noResults'),
    },
    empty: t('empty'),
    loadMore: t('loadMore'),
    autoUpdate: t('autoUpdate'),
  };

  return (
    <NewsPageContainer
      messages={messages}
      newsData={newsData.items as NewsItem[]}
    />
  );
}
