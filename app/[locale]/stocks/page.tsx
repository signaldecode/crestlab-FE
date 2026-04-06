import { getTranslations } from 'next-intl/server';
import StocksPageContainer from '@/components/containers/stocks/StocksPageContainer';
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

  const messages = {
    tabs: {
      livePrices: t('tabs.livePrices'),
      chartView: t('tabs.chartView'),
      watchlist: t('tabs.watchlist'),
    },
    indices: { title: t('indices.title') },
    table: {
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
    },
    watchlist: {
      title: t('watchlist.title'),
      empty: t('watchlist.empty'),
      addPlaceholder: t('watchlist.addPlaceholder'),
    },
    chartView: {
      title: t('chartView.title'),
      selectStock: t('chartView.selectStock'),
    },
  };

  return (
    <StocksPageContainer
      messages={messages}
      indicesData={stocksData.indices}
      stocksData={stocksData.stocks}
    />
  );
}
