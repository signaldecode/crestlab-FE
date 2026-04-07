'use client';

import { useState } from 'react';
import styles from '@/assets/styles/components/containers/landing/NewsPreviewContainer.module.scss';
import type { NewsItem } from '@/types/finance';

interface NewsPreviewContainerProps {
  messages: {
    title: string;
    subtitle: string;
    tabs: {
      all: string;
      stocks: string;
      crypto: string;
    };
  };
  data: NewsItem[];
}

type TabKey = 'all' | 'stocks' | 'crypto';

export default function NewsPreviewContainer({ messages, data }: NewsPreviewContainerProps) {
  const [tab, setTab] = useState<TabKey>('all');

  const filtered = tab === 'all' ? data : data.filter((item) => item.category === tab);
  const visible = filtered.slice(0, 4);

  return (
    <section className={styles['news-preview']} aria-labelledby="news-preview-title">
      <header className={styles['news-preview__header']}>
        <div className={styles['news-preview__heading']}>
          <h2 id="news-preview-title" className={styles['news-preview__title']}>
            {messages.title}
          </h2>
          <p className={styles['news-preview__subtitle']}>{messages.subtitle}</p>
        </div>

        <div className={styles['news-preview__tabs']} role="tablist">
          {(Object.keys(messages.tabs) as TabKey[]).map((key) => (
            <button
              key={key}
              type="button"
              role="tab"
              aria-selected={tab === key}
              className={`${styles['news-preview__tab']} ${tab === key ? styles['news-preview__tab--active'] : ''}`}
              onClick={() => setTab(key)}
            >
              {messages.tabs[key]}
            </button>
          ))}
        </div>
      </header>

      <div className={styles['news-preview__grid']}>
        {visible.map((item) => (
          <article key={item.id} className={styles['news-preview__card']}>
            <a
              href={`/news/${item.slug}`}
              className={styles['news-preview__link']}
            >
              <div className={styles['news-preview__thumb']} aria-hidden="true" />
              <div className={styles['news-preview__body']}>
                <span className={styles['news-preview__category']}>{item.category}</span>
                <h3 className={styles['news-preview__card-title']}>{item.title}</h3>
                <div className={styles['news-preview__meta']}>
                  <span>{item.source}</span>
                  <time dateTime={item.publishedAt}>
                    {item.publishedAt.slice(0, 10)}
                  </time>
                </div>
              </div>
            </a>
          </article>
        ))}
      </div>
    </section>
  );
}
