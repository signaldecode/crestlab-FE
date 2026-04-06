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
    tabs: {
      autoFeed: t('tabs.autoFeed'),
      marketMovers: t('tabs.marketMovers'),
      indices: t('tabs.indices'),
    },
    autoFeed: {
      title: t('autoFeed.title'),
      filterAll: t('autoFeed.filterAll'),
      categories: {
        stocks: t('autoFeed.categories.stocks'),
        crypto: t('autoFeed.categories.crypto'),
        macro: t('autoFeed.categories.macro'),
      },
    },
    marketMovers: {
      title: t('marketMovers.title'),
      gainers: t('marketMovers.gainers'),
      losers: t('marketMovers.losers'),
    },
    indices: {
      title: t('indices.title'),
    },
  };

  return (
    <NewsPageContainer
      messages={messages}
      newsData={newsData.items as NewsItem[]}
    />
  );
}
