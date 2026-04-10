'use client';

import { useState } from 'react';
import IndexCardsContainer from './IndexCardsContainer';
import StockTableContainer from './StockTableContainer';
import StockDetailModal from './StockDetailModal';
import MarketMoversContainer from './MarketMoversContainer';
import type { StockIndexApi, StockItemApi, StockMoverApi } from '@/types/market';

interface StocksPageContainerProps {
  messages: {
    indices: {
      title: string;
      fetchedAtLabel: string;
    };
    table: {
      title: string;
      description?: string;
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
    movers: {
      sectionTitle: string;
      gainersTitle: string;
      losersTitle: string;
      gainersBadge: string;
      losersBadge: string;
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
  indicesData: StockIndexApi[];
  stocksData: StockItemApi[];
  topGainers: StockMoverApi[];
  topLosers: StockMoverApi[];
  fetchedAt?: string;
  locale?: string;
}

export default function StocksPageContainer({
  messages,
  indicesData,
  stocksData,
  topGainers,
  topLosers,
  fetchedAt,
  locale,
}: StocksPageContainerProps) {
  const [selectedSymbol, setSelectedSymbol] = useState<string | null>(null);

  const selectedStock = selectedSymbol
    ? stocksData.find((s) => s.symbol === selectedSymbol) ?? null
    : null;

  return (
    <>
      <IndexCardsContainer
        messages={messages.indices}
        data={indicesData}
        fetchedAt={fetchedAt}
        locale={locale}
      />
      <StockTableContainer
        messages={messages.table}
        data={stocksData}
        onSelect={(symbol) => setSelectedSymbol(symbol)}
      />
      <MarketMoversContainer
        messages={messages.movers}
        gainers={topGainers}
        losers={topLosers}
        onSelect={(symbol) => setSelectedSymbol(symbol)}
      />

      {selectedStock && (
        <StockDetailModal
          messages={messages.detail}
          stock={selectedStock}
          onClose={() => setSelectedSymbol(null)}
        />
      )}
    </>
  );
}
