import { getTranslations } from 'next-intl/server';
import DominanceChartContainer from '@/components/containers/crypto/DominanceChartContainer';
import FearGreedContainer from '@/components/containers/crypto/FearGreedContainer';
import CoinListContainer from '@/components/containers/crypto/CoinListContainer';
import cryptoData from '@/data/mock/cryptoData.json';
import styles from '@/assets/styles/components/containers/crypto/CryptoWidgets.module.scss';

export async function generateMetadata() {
  const t = await getTranslations('seo.crypto');
  return {
    title: t('title'),
    description: t('description'),
  };
}

export default async function CryptoPage() {
  const t = await getTranslations('crypto');

  const dominanceMsg = {
    title: t('dominance.title'),
    btcLabel: t('dominance.btcLabel'),
    ethLabel: t('dominance.ethLabel'),
    othersLabel: t('dominance.othersLabel'),
  };

  const fearGreedMsg = {
    title: t('fearGreed.title'),
    labels: {
      'extreme-fear': t('fearGreed.labels.extremeFear'),
      fear: t('fearGreed.labels.fear'),
      neutral: t('fearGreed.labels.neutral'),
      greed: t('fearGreed.labels.greed'),
      'extreme-greed': t('fearGreed.labels.extremeGreed'),
    },
  };

  const coinListMsg = {
    title: t('coinList.title'),
    columns: {
      name: t('coinList.columns.name'),
      price: t('coinList.columns.price'),
      change24h: t('coinList.columns.change24h'),
      marketCap: t('coinList.columns.marketCap'),
      volume: t('coinList.columns.volume'),
    },
  };

  return (
    <>
      <div className={styles.widgets}>
        <DominanceChartContainer messages={dominanceMsg} data={cryptoData.dominance} />
        <FearGreedContainer messages={fearGreedMsg} data={cryptoData.fearGreed} />
      </div>
      <CoinListContainer messages={coinListMsg} data={cryptoData.coins} />
    </>
  );
}
