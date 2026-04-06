'use client';

import { useState } from 'react';
import PageTabs from '@/components/ui/PageTabs';
import NewsFeedContainer from './NewsFeedContainer';
import type { NewsItem } from '@/types/finance';

interface NewsPageContainerProps {
  messages: {
    tabs: Record<string, string>;
    autoFeed: {
      title: string;
      filterAll: string;
      categories: Record<string, string>;
    };
    marketMovers: {
      title: string;
      gainers: string;
      losers: string;
    };
    indices: {
      title: string;
    };
  };
  newsData: NewsItem[];
}

const TABS = [
  { key: 'autoFeed', label: '' },
  { key: 'marketMovers', label: '' },
  { key: 'indices', label: '' },
];

export default function NewsPageContainer({ messages, newsData }: NewsPageContainerProps) {
  const [activeTab, setActiveTab] = useState('autoFeed');

  const tabs = TABS.map((t) => ({ ...t, label: messages.tabs[t.key] }));

  return (
    <>
      <PageTabs tabs={tabs} activeTab={activeTab} onTabChange={setActiveTab} />

      {activeTab === 'autoFeed' && (
        <NewsFeedContainer messages={messages.autoFeed} data={newsData} />
      )}

      {activeTab === 'marketMovers' && (
        <section style={{ maxWidth: '75rem', margin: '0 auto', padding: '3rem 1rem' }}>
          <h2>{messages.marketMovers.title}</h2>
          <p style={{ color: '#767676', marginTop: '1rem' }}>{messages.marketMovers.gainers} / {messages.marketMovers.losers}</p>
          {/* TODO: Market Movers 상승/하락 TOP */}
        </section>
      )}

      {activeTab === 'indices' && (
        <section style={{ maxWidth: '75rem', margin: '0 auto', padding: '3rem 1rem' }}>
          <h2>{messages.indices.title}</h2>
          {/* TODO: 주요 지수 차트/카드 */}
        </section>
      )}
    </>
  );
}
