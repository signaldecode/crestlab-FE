import { getTranslations } from 'next-intl/server';
import NewsFeedContainer from '@/components/containers/news/NewsFeedContainer';
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

  const msg = {
    title: t('title'),
    filterAll: t('filterAll'),
    categories: {
      stocks: t('categories.stocks'),
      crypto: t('categories.crypto'),
      macro: t('categories.macro'),
    },
  };

  return <NewsFeedContainer messages={msg} data={newsData.items as NewsItem[]} />;
}
