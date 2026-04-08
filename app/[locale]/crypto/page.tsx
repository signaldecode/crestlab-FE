import { getTranslations } from 'next-intl/server';
import CryptoPageContainer from '@/components/containers/crypto/CryptoPageContainer';
import cryptoData from '@/data/mock/cryptoData.json';
import type { CoinItem, CryptoGlobalStats } from '@/types/finance';

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
    globalStats: {
      sectionTitle: t('globalStats.sectionTitle'),
      totalMarketCap: t('globalStats.totalMarketCap'),
      totalVolume24h: t('globalStats.totalVolume24h'),
      btcDominance: t('globalStats.btcDominance'),
      ethLabel: t('globalStats.ethLabel'),
      change24hShort: t('globalStats.change24hShort'),
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
      subtitle: t('fearGreed.subtitle'),
      asOf: t('fearGreed.asOf'),
      currentTitle: t('fearGreed.currentTitle'),
      currentDescription: t('fearGreed.currentDescription'),
      historyTitle: t('fearGreed.historyTitle'),
      historyLabels: {
        '1d': t('fearGreed.historyLabels.1d'),
        '1w': t('fearGreed.historyLabels.1w'),
        '1m': t('fearGreed.historyLabels.1m'),
        '3m': t('fearGreed.historyLabels.3m'),
      },
      labels: {
        extremeFear: t('fearGreed.labels.extremeFear'),
        fear: t('fearGreed.labels.fear'),
        neutral: t('fearGreed.labels.neutral'),
        greed: t('fearGreed.labels.greed'),
        extremeGreed: t('fearGreed.labels.extremeGreed'),
      },
      legendLabels: [
        t('fearGreed.legendLabels.0'),
        t('fearGreed.legendLabels.1'),
        t('fearGreed.legendLabels.2'),
        t('fearGreed.legendLabels.3'),
        t('fearGreed.legendLabels.4'),
      ],
    },
    coinList: {
      title: t('coinList.title'),
      filterAll: t('coinList.filterAll'),
      columns: {
        name: t('coinList.columns.name'),
        price: t('coinList.columns.price'),
        change24h: t('coinList.columns.change24h'),
        marketCap: t('coinList.columns.marketCap'),
        volume: t('coinList.columns.volume'),
      },
      categories: {
        layer1: t('coinList.categories.layer1'),
        defi: t('coinList.categories.defi'),
        meme: t('coinList.categories.meme'),
        ai: t('coinList.categories.ai'),
        exchange: t('coinList.categories.exchange'),
        stablecoin: t('coinList.categories.stablecoin'),
      },
    },
    detail: {
      currentPrice: t('detail.currentPrice'),
      periodOpen: t('detail.periodOpen'),
      volume24h: t('detail.volume24h'),
      closeAriaLabel: t('detail.closeAriaLabel'),
      periods: {
        '1w': t('detail.periods.1w'),
        '1m': t('detail.periods.1m'),
        '3m': t('detail.periods.3m'),
        '1y': t('detail.periods.1y'),
        '5y': t('detail.periods.5y'),
      },
      tooltipDate: t('detail.tooltipDate'),
      tooltipOpen: t('detail.tooltipOpen'),
      tooltipHigh: t('detail.tooltipHigh'),
      tooltipLow: t('detail.tooltipLow'),
      tooltipClose: t('detail.tooltipClose'),
      tooltipVolume: t('detail.tooltipVolume'),
      chartType: {
        line: t('detail.chartType.line'),
        candle: t('detail.chartType.candle'),
        ariaLabel: t('detail.chartType.ariaLabel'),
      },
    },
  };

  return (
    <CryptoPageContainer
      messages={messages}
      globalStats={cryptoData.globalStats as CryptoGlobalStats}
      coinsData={cryptoData.coins as CoinItem[]}
      fearGreedData={cryptoData.fearGreed}
    />
  );
}
