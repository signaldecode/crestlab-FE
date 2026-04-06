'use client';

import { useState } from 'react';
import styles from '@/assets/styles/components/containers/news/NewsFeedContainer.module.scss';
import SectionTitle from '@/components/ui/SectionTitle';
import type { NewsItem } from '@/types/finance';

interface NewsFeedContainerProps {
  messages: {
    title: string;
    filterAll: string;
    categories: Record<string, string>;
  };
  data: NewsItem[];
}

type NewsCategory = NewsItem['category'] | 'all';

const CATEGORIES: NewsCategory[] = ['all', 'stocks', 'crypto', 'macro'];

export default function NewsFeedContainer({ messages, data }: NewsFeedContainerProps) {
  const [active, setActive] = useState<NewsCategory>('all');

  const filtered = active === 'all' ? data : data.filter((n) => n.category === active);

  return (
    <section className={styles['news-feed']} aria-labelledby="news-feed-title">
      <SectionTitle title={messages.title} />

      <div className={styles['news-feed__filters']} role="tablist">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            role="tab"
            aria-selected={active === cat}
            className={`${styles['news-feed__filter']} ${
              active === cat ? styles['news-feed__filter--active'] : ''
            }`}
            onClick={() => setActive(cat)}
          >
            {cat === 'all' ? messages.filterAll : messages.categories[cat] ?? cat}
          </button>
        ))}
      </div>

      <div className={styles['news-feed__list']}>
        {filtered.map((item) => (
          <article key={item.id} className={styles['news-feed__item']}>
            <a
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              className={styles['news-feed__link']}
            >
              <span className={styles['news-feed__category']}>{messages.categories[item.category] ?? item.category}</span>
              <h3 className={styles['news-feed__item-title']}>{item.title}</h3>
              <p className={styles['news-feed__summary']}>{item.summary}</p>
              <div className={styles['news-feed__meta']}>
                <span>{item.source}</span>
                <time dateTime={item.publishedAt}>
                  {new Date(item.publishedAt).toLocaleDateString()}
                </time>
              </div>
            </a>
          </article>
        ))}
      </div>
    </section>
  );
}
