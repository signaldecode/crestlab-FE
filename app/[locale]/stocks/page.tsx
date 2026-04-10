import { getLocale, getTranslations } from 'next-intl/server';
import StocksPageContainer from '@/components/containers/stocks/StocksPageContainer';
import { apiFetch } from '@/lib/api';
import type { StocksPageResponse } from '@/types/market';

export async function generateMetadata() {
  const t = await getTranslations('seo.stocks');
  return {
    title: t('title'),
    description: t('description'),
  };
}

export default async function StocksPage() {
  const t = await getTranslations('stocks');
  const locale = await getLocale();

  let data: StocksPageResponse | null = null;
  try {
    data = await apiFetch<StocksPageResponse>('/market/stocks');
  } catch {
    /* API failure — render empty */
  }

  const messages = {
    indices: {
      title: t('indices.title'),
      fetchedAtLabel: t('indices.fetchedAtLabel', { time: '{time}' }),
    },
    table: {
      title: t('table.title'),
      // description: t('table.description'),
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
        TECHNOLOGY: t('table.sectors.tech'),
        ENERGY: t('table.sectors.energy'),
        FINANCE: t('table.sectors.finance'),
        HEALTHCARE: t('table.sectors.healthcare'),
        CONSUMER: t('table.sectors.consumer'),
        INDUSTRIAL: t('table.sectors.industrial'),
      },
    },
    movers: {
      sectionTitle: t('movers.sectionTitle'),
      gainersTitle: t('movers.gainersTitle'),
      losersTitle: t('movers.losersTitle'),
      gainersBadge: t('movers.gainersBadge'),
      losersBadge: t('movers.losersBadge'),
    },
    detail: {
      closeAriaLabel: t('detail.closeAriaLabel'),
      chartView: {
        overview: t('detail.chartView.overview'),
        advanced: t('detail.chartView.advanced'),
        ariaLabel: t('detail.chartView.ariaLabel'),
      },
    },
  };

  return (
    <StocksPageContainer
      messages={messages}
      indicesData={data?.indices ?? []}
      stocksData={data?.stocks ?? []}
      topGainers={data?.topGainers ?? []}
      topLosers={data?.topLosers ?? []}
      fetchedAt={data?.fetchedAt}
      locale={locale}
    />
  );
}
