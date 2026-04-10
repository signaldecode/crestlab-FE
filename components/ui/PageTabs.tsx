'use client';

import styles from '@/assets/styles/components/ui/PageTabs.module.scss';

interface PageTabsProps {
  tabs: { key: string; label: string }[];
  activeTab: string;
  onTabChange: (key: string) => void;
}

export default function PageTabs({ tabs, activeTab, onTabChange }: PageTabsProps) {
  return (
    <div className={styles['page-tabs']} role="tablist">
      {tabs.map((tab) => (
        <button
          key={tab.key}
          role="tab"
          aria-selected={activeTab === tab.key}
          className={`${styles['page-tabs__tab']} ${
            activeTab === tab.key ? styles['page-tabs__tab--active'] : ''
          }`}
          onClick={() => onTabChange(tab.key)}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}
