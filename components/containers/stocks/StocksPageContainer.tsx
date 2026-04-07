'use client';

import { useState } from 'react';
import PageTabs from '@/components/ui/PageTabs';
import IndexCardsContainer from './IndexCardsContainer';
import StockTableContainer from './StockTableContainer';
import StockDetailModal from './StockDetailModal';
import type { StockIndex, StockItem, StockPeriod } from '@/types/finance';

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
    detail: {
      currentPrice: string;
      periodOpen: string;
      volume: string;
      shares: string;
      closeAriaLabel: string;
      periods: Record<StockPeriod, string>;
      tooltipDate: string;
      tooltipOpen: string;
      tooltipHigh: string;
      tooltipLow: string;
      tooltipClose: string;
      tooltipVolume: string;
      chartType: {
        line: string;
        candle: string;
        ariaLabel: string;
      };
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
  const [selectedSymbol, setSelectedSymbol] = useState<string | null>(null);

  const tabs = TABS.map((t) => ({ ...t, label: messages.tabs[t.key] }));

  const selectedStock = selectedSymbol
    ? stocksData.find((s) => s.symbol === selectedSymbol) ?? null
    : null;

  return (
    <>
      <PageTabs tabs={tabs} activeTab={activeTab} onTabChange={setActiveTab} />

      {activeTab === 'livePrices' && (
        <>
          <IndexCardsContainer messages={messages.indices} data={indicesData} />
          <StockTableContainer
            messages={messages.table}
            data={stocksData}
            onSelect={(stock) => setSelectedSymbol(stock.symbol)}
          />
        </>
      )}

      {selectedStock && (
        <StockDetailModal
          messages={messages.detail}
          stock={selectedStock}
          onClose={() => setSelectedSymbol(null)}
        />
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
