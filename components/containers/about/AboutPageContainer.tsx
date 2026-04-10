'use client';

import { useState } from 'react';
import AboutContainer from './AboutContainer';
import DisclaimerContainer from './DisclaimerContainer';
import styles from '@/assets/styles/components/containers/about/AboutPageContainer.module.scss';

type TabKey = 'about' | 'disclaimer';

interface AboutPageContainerProps {
  messages: {
    tabs: {
      about: string;
      disclaimer: string;
    };
    about: {
      title: string;
      description: string;
      missionTitle: string;
      missionDescription: string;
      visionTitle: string;
      visionDescription: string;
    };
    disclaimer: {
      title: string;
      content: string;
      registrationTitle: string;
      registrationNumber: string;
    };
  };
}

const TABS: TabKey[] = ['about', 'disclaimer'];

export default function AboutPageContainer({ messages }: AboutPageContainerProps) {
  const [activeTab, setActiveTab] = useState<TabKey>('about');

  return (
    <div className={styles['about-page']}>
      <div className={styles['about-page__tabs']} role="tablist">
        {TABS.map((tab) => (
          <button
            key={tab}
            type="button"
            role="tab"
            aria-selected={activeTab === tab}
            className={`${styles['about-page__tab']} ${
              activeTab === tab ? styles['about-page__tab--active'] : ''
            }`}
            onClick={() => setActiveTab(tab)}
          >
            {messages.tabs[tab]}
          </button>
        ))}
      </div>

      {activeTab === 'about' && <AboutContainer messages={messages.about} />}
      {activeTab === 'disclaimer' && <DisclaimerContainer messages={messages.disclaimer} />}
    </div>
  );
}
