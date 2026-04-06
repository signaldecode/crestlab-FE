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
      btcLabel: t('dominance.btcLabel'),
      ethLabel: t('dominance.ethLabel'),
      othersLabel: t('dominance.othersLabel'),
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
      dominanceData={cryptoData.dominance}
      fearGreedData={cryptoData.fearGreed}
    />
  );
}
