'use client';

import { useState } from 'react';
import IndexCardsContainer from './IndexCardsContainer';
import StockTableContainer from './StockTableContainer';
import StockDetailModal from './StockDetailModal';
import MarketMoversContainer from './MarketMoversContainer';
import type { StockIndex, StockItem } from '@/types/finance';

interface StocksPageContainerProps {
  messages: {
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
  indicesData: StockIndex[];
  stocksData: StockItem[];
}

export default function StocksPageContainer({ messages, indicesData, stocksData }: StocksPageContainerProps) {
  const [selectedSymbol, setSelectedSymbol] = useState<string | null>(null);

  const selectedStock = selectedSymbol
    ? stocksData.find((s) => s.symbol === selectedSymbol) ?? null
    : null;

  return (
    <>
      <IndexCardsContainer messages={messages.indices} data={indicesData} />
      <StockTableContainer
        messages={messages.table}
        data={stocksData}
        onSelect={(stock) => setSelectedSymbol(stock.symbol)}
      />
      <MarketMoversContainer messages={messages.movers} data={stocksData} />

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
