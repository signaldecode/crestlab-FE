import { getTranslations } from 'next-intl/server';
import IndexCardsContainer from '@/components/containers/stocks/IndexCardsContainer';
import StockTableContainer from '@/components/containers/stocks/StockTableContainer';
import stocksData from '@/data/mock/stocksData.json';

export async function generateMetadata() {
  const t = await getTranslations('seo.stocks');
  return {
    title: t('title'),
    description: t('description'),
  };
}

export default async function StocksPage() {
  const t = await getTranslations('stocks');

  const indexMsg = { title: t('indices.title') };
  const tableMsg = {
    title: t('table.title'),
    filterAll: t('table.filterAll'),
    columns: {
      symbol: t('table.columns.symbol'),
      name: t('table.columns.name'),
      price: t('table.columns.price'),
      change: t('table.columns.change'),
      volume: t('table.columns.volume'),
      marketCap: t('table.columns.marketCap'),
    },
    sectors: {
      tech: t('table.sectors.tech'),
      energy: t('table.sectors.energy'),
      finance: t('table.sectors.finance'),
      healthcare: t('table.sectors.healthcare'),
      consumer: t('table.sectors.consumer'),
      industrial: t('table.sectors.industrial'),
    },
  };

  return (
    <>
      <IndexCardsContainer messages={indexMsg} data={stocksData.indices} />
      <StockTableContainer messages={tableMsg} data={stocksData.stocks} />
    </>
  );
}
