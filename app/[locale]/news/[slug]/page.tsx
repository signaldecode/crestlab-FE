import { notFound } from 'next/navigation';
import { getTranslations } from 'next-intl/server';
import NewsDetailContainer from '@/components/containers/news/NewsDetailContainer';
import type { NewsItem } from '@/types/finance';
import newsData from '@/data/newsData.json';

interface NewsDetailPageProps {
  params: Promise<{ locale: string; slug: string }>;
}

export async function generateMetadata({ params }: NewsDetailPageProps) {
  const { slug } = await params;
  const item = (newsData.items as NewsItem[]).find((n) => n.slug === slug);
  if (!item) return { title: 'Not Found' };
  return {
    title: `${item.title} | CrestLab News`,
    description: item.summary,
    openGraph: {
      title: item.title,
      description: item.summary,
      type: 'article',
      publishedTime: item.publishedAt,
    },
  };
}

export async function generateStaticParams() {
  return (newsData.items as NewsItem[]).map((item) => ({ slug: item.slug }));
}

export default async function NewsDetailPage({ params }: NewsDetailPageProps) {
  const { locale, slug } = await params;
  const t = await getTranslations('news');

  const items = newsData.items as NewsItem[];
  const item = items.find((n) => n.slug === slug);
  if (!item) notFound();

  const related = items.filter((n) => n.slug !== slug && n.category === item.category).slice(0, 4);

  const messages = {
    backToList: t('detail.backToList'),
    publishedOn: t('detail.publishedOn'),
    by: t('detail.by'),
    source: t('detail.source'),
    originalLink: t('detail.originalLink'),
    relatedTitle: t('detail.relatedTitle'),
    breadcrumbHome: t('detail.breadcrumbHome'),
    breadcrumbNews: t('detail.breadcrumbNews'),
    disclaimer: t('detail.disclaimer'),
    categories: {
      stocks: t('autoFeed.categories.stocks'),
      crypto: t('autoFeed.categories.crypto'),
      macro: t('autoFeed.categories.macro'),
    },
  };

  return <NewsDetailContainer messages={messages} data={item} related={related} locale={locale} />;
}
