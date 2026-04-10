'use client';

import { useState } from 'react';
import GlobalStatsContainer from './GlobalStatsContainer';
import DominanceChartContainer from './DominanceChartContainer';
import FearGreedContainer from './FearGreedContainer';
import CoinListContainer from './CoinListContainer';
import CoinDetailModal from './CoinDetailModal';
import styles from '@/assets/styles/components/containers/crypto/CryptoWidgets.module.scss';
import type {
  CoinCategory,
  CoinItem,
  CryptoGlobalStats,
  FearGreedData,
} from '@/types/finance';

interface CryptoPageContainerProps {
  messages: {
    globalStats: {
      sectionTitle: string;
      totalMarketCap: string;
      totalVolume24h: string;
      btcDominance: string;
      ethLabel: string;
      change24hShort: string;
    };
    dominance: {
      title: string;
      subtitle: string;
      btcLabel: string;
      ethLabel: string;
      othersLabel: string;
      asOf: string;
      periods: Record<string, string>;
    };
    fearGreed: {
      title: string;
      subtitle: string;
      asOf: string;
      currentTitle: string;
      currentDescription: string;
      historyTitle: string;
      historyLabels: Record<string, string>;
      labels: Record<string, string>;
      legendLabels: string[];
    };
    coinList: {
      title: string;
      description: string;
      filterAll: string;
      columns: {
        name: string;
        price: string;
        change24h: string;
        marketCap: string;
        volume: string;
      };
      categories: Record<CoinCategory, string>;
    };
    detail: {
      closeAriaLabel: string;
      chartView: {
        overview: string;
        advanced: string;
        ariaLabel: string;
      };
    };
  };
  globalStats: CryptoGlobalStats;
  coinsData: CoinItem[];
  fearGreedData: FearGreedData;
}

export default function CryptoPageContainer({
  messages,
  globalStats,
  coinsData,
  fearGreedData,
}: CryptoPageContainerProps) {
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const selectedCoin = selectedId
    ? coinsData.find((c) => c.id === selectedId) ?? null
    : null;

  return (
    <>
      <GlobalStatsContainer messages={messages.globalStats} data={globalStats} />

      <div className={styles.widgets}>
        <DominanceChartContainer messages={messages.dominance} data={[]} />
        <FearGreedContainer messages={messages.fearGreed} data={fearGreedData} compact />
      </div>

      <CoinListContainer
        messages={messages.coinList}
        data={coinsData}
        onSelect={(coin) => setSelectedId(coin.id)}
      />

      {selectedCoin && (
        <CoinDetailModal
          messages={messages.detail}
          coin={selectedCoin}
          onClose={() => setSelectedId(null)}
        />
      )}
    </>
  );
}
