import { getTranslations } from 'next-intl/server';
import CryptoPageContainer from '@/components/containers/crypto/CryptoPageContainer';
import cryptoData from '@/data/mock/cryptoData.json';

export async function generateMetadata() {
  const t = await getTranslations('seo.crypto');
  return {
    title: t('title'),
    description: t('description'),
  };
}

export default async function CryptoPage() {
  const t = await getTranslations('crypto');

  const messages = {
    tabs: {
      livePrice: t('tabs.livePrice'),
      top100: t('tabs.top100'),
      fearIndex: t('tabs.fearIndex'),
    },
    dominance: {
      title: t('dominance.title'),
      subtitle: t('dominance.subtitle'),
      btcLabel: t('dominance.btcLabel'),
      ethLabel: t('dominance.ethLabel'),
      othersLabel: t('dominance.othersLabel'),
      asOf: t('dominance.asOf'),
      periods: {
        '1w': t('dominance.periods.1w'),
        '1m': t('dominance.periods.1m'),
        '3m': t('dominance.periods.3m'),
        '1y': t('dominance.periods.1y'),
        '5y': t('dominance.periods.5y'),
      },
    },
    fearGreed: {
      title: t('fearGreed.title'),
      labels: {
        'extreme-fear': t('fearGreed.labels.extremeFear'),
        fear: t('fearGreed.labels.fear'),
        neutral: t('fearGreed.labels.neutral'),
        greed: t('fearGreed.labels.greed'),
        'extreme-greed': t('fearGreed.labels.extremeGreed'),
      },
    },
    coinList: {
      title: t('coinList.title'),
      columns: {
        name: t('coinList.columns.name'),
        price: t('coinList.columns.price'),
        change24h: t('coinList.columns.change24h'),
        marketCap: t('coinList.columns.marketCap'),
        volume: t('coinList.columns.volume'),
      },
    },
  };

  return (
    <CryptoPageContainer
      messages={messages}
      coinsData={cryptoData.coins}
      fearGreedData={cryptoData.fearGreed}
    />
  );
}
