'use client';

import { useState } from 'react';
import PageTabs from '@/components/ui/PageTabs';
import DominanceChartContainer from './DominanceChartContainer';
import FearGreedContainer from './FearGreedContainer';
import CoinListContainer from './CoinListContainer';
import styles from '@/assets/styles/components/containers/crypto/CryptoWidgets.module.scss';
import type { CoinItem, FearGreedData } from '@/types/finance';

interface CryptoPageContainerProps {
  messages: {
    tabs: Record<string, string>;
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
      labels: Record<string, string>;
    };
    coinList: {
      title: string;
      columns: {
        name: string;
        price: string;
        change24h: string;
        marketCap: string;
        volume: string;
      };
    };
  };
  coinsData: CoinItem[];
  fearGreedData: FearGreedData;
}

const TABS = [
  { key: 'livePrice', label: '' },
  { key: 'top100', label: '' },
  { key: 'fearIndex', label: '' },
];

export default function CryptoPageContainer({ messages, coinsData, fearGreedData }: CryptoPageContainerProps) {
  const [activeTab, setActiveTab] = useState('livePrice');

  const tabs = TABS.map((t) => ({ ...t, label: messages.tabs[t.key] }));

  return (
    <>
      <PageTabs tabs={tabs} activeTab={activeTab} onTabChange={setActiveTab} />

      {activeTab === 'livePrice' && (
        <>
          <div className={styles.widgets}>
            <DominanceChartContainer messages={messages.dominance} data={[]} />
            <FearGreedContainer messages={messages.fearGreed} data={fearGreedData} />
          </div>
          <CoinListContainer messages={messages.coinList} data={coinsData} />
        </>
      )}

      {activeTab === 'top100' && (
        <CoinListContainer messages={{ ...messages.coinList, title: 'Top 100 Cryptocurrencies' }} data={coinsData} />
      )}

      {activeTab === 'fearIndex' && (
        <div className={styles.widgets}>
          <FearGreedContainer messages={messages.fearGreed} data={fearGreedData} />
          <DominanceChartContainer messages={messages.dominance} data={[]} />
        </div>
      )}
    </>
  );
}
