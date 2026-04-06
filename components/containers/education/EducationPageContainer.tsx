'use client';

import { useState } from 'react';
import PageTabs from '@/components/ui/PageTabs';
import VideoCategoryContainer from './VideoCategoryContainer';
import type { VideoItem } from '@/types/finance';

interface EducationPageContainerProps {
  messages: {
    tabs: Record<string, string>;
    videos: {
      title: string;
      filterAll: string;
      categories: Record<string, string>;
    };
    articles: {
      title: string;
      empty: string;
    };
    faq: {
      title: string;
    };
  };
  videosData: VideoItem[];
}

const TABS = [
  { key: 'videos', label: '' },
  { key: 'articles', label: '' },
  { key: 'faq', label: '' },
];

export default function EducationPageContainer({ messages, videosData }: EducationPageContainerProps) {
  const [activeTab, setActiveTab] = useState('videos');

  const tabs = TABS.map((t) => ({ ...t, label: messages.tabs[t.key] }));

  return (
    <>
      <PageTabs tabs={tabs} activeTab={activeTab} onTabChange={setActiveTab} />

      {activeTab === 'videos' && (
        <VideoCategoryContainer messages={messages.videos} data={videosData} />
      )}

      {activeTab === 'articles' && (
        <section style={{ maxWidth: '75rem', margin: '0 auto', padding: '3rem 1rem' }}>
          <h2>{messages.articles.title}</h2>
          <p style={{ color: '#767676', marginTop: '1rem' }}>{messages.articles.empty}</p>
          {/* TODO: Articles 리스트 */}
        </section>
      )}

      {activeTab === 'faq' && (
        <section style={{ maxWidth: '75rem', margin: '0 auto', padding: '3rem 1rem' }}>
          <h2>{messages.faq.title}</h2>
          {/* TODO: FAQ 아코디언 */}
        </section>
      )}
    </>
  );
}
