'use client';

import { useState } from 'react';
import PageTabs from '@/components/ui/PageTabs';
import IndexCardsContainer from './IndexCardsContainer';
import StockTableContainer from './StockTableContainer';
import type { StockIndex, StockItem } from '@/types/finance';

interface StocksPageContainerProps {
  messages: {
    tabs: Record<string, string>;
    indices: { title: string };
    table: {
      title: string;
      filterAll: string;
      columns: {
        symbol: string;
        name: string;
        price: string;
        change: string;
        volume: string;
        marketCap: string;
      };
      sectors: Record<string, string>;
    };
    watchlist: {
      title: string;
      empty: string;
      addPlaceholder: string;
    };
    chartView: {
      title: string;
      selectStock: string;
    };
  };
  indicesData: StockIndex[];
  stocksData: StockItem[];
}

const TABS = [
  { key: 'livePrices', label: '' },
  { key: 'chartView', label: '' },
  { key: 'watchlist', label: '' },
];

export default function StocksPageContainer({ messages, indicesData, stocksData }: StocksPageContainerProps) {
  const [activeTab, setActiveTab] = useState('livePrices');

  const tabs = TABS.map((t) => ({ ...t, label: messages.tabs[t.key] }));

  return (
    <>
      <PageTabs tabs={tabs} activeTab={activeTab} onTabChange={setActiveTab} />

      {activeTab === 'livePrices' && (
        <>
          <IndexCardsContainer messages={messages.indices} data={indicesData} />
          <StockTableContainer messages={messages.table} data={stocksData} />
        </>
      )}

      {activeTab === 'chartView' && (
        <section style={{ maxWidth: '75rem', margin: '0 auto', padding: '3rem 1rem' }}>
          <h2>{messages.chartView.title}</h2>
          <p style={{ color: '#767676', marginTop: '1rem' }}>{messages.chartView.selectStock}</p>
          {/* TODO: recharts 기반 차트 뷰 */}
        </section>
      )}

      {activeTab === 'watchlist' && (
        <section style={{ maxWidth: '75rem', margin: '0 auto', padding: '3rem 1rem' }}>
          <h2>{messages.watchlist.title}</h2>
          <p style={{ color: '#767676', marginTop: '1rem' }}>{messages.watchlist.empty}</p>
          {/* TODO: Watchlist CRUD */}
        </section>
      )}
    </>
  );
}
