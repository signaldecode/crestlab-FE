'use client';

import { useMemo, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import styles from '@/assets/styles/components/containers/news/NewsFeedContainer.module.scss';
import type { NewsItem } from '@/types/finance';
import type { NewsMessages } from './NewsPageContainer';

interface NewsFeedContainerProps {
  messages: NewsMessages;
  data: NewsItem[];
}

type NewsCategory = NewsItem['category'] | 'all';

const CATEGORIES: NewsCategory[] = ['all', 'stocks', 'crypto', 'macro'];
const PAGE_SIZE = 6;

function formatDate(iso: string): string {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  return `${d.getUTCFullYear()}.${String(d.getUTCMonth() + 1).padStart(2, '0')}.${String(d.getUTCDate()).padStart(2, '0')}`;
}

export default function NewsFeedContainer({ messages, data }: NewsFeedContainerProps) {
  const [activeCategory, setActiveCategory] = useState<NewsCategory>('all');
  const [query, setQuery] = useState('');
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  const sortedData = useMemo(
    () =>
      [...data].sort(
        (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
      ),
    [data],
  );

  const filtered = useMemo(() => {
    let result = sortedData;
    if (activeCategory !== 'all') {
      result = result.filter((n) => n.category === activeCategory);
    }
    const q = query.trim().toLowerCase();
    if (q) {
      result = result.filter(
        (n) =>
          n.title.toLowerCase().includes(q) ||
          n.summary.toLowerCase().includes(q) ||
          n.source.toLowerCase().includes(q),
      );
    }
    return result;
  }, [sortedData, activeCategory, query]);

  const visible = filtered.slice(0, visibleCount);
  const hasMore = visible.length < filtered.length;
  const isSearching = query.trim().length > 0;

  function handleCategoryChange(cat: NewsCategory) {
    setActiveCategory(cat);
    setVisibleCount(PAGE_SIZE);
  }

  function handleSearchChange(value: string) {
    setQuery(value);
    setVisibleCount(PAGE_SIZE);
  }

  return (
    <section className={styles['news-feed']} aria-labelledby="news-feed-title">
      <header className={styles['news-feed__header']}>
        <h1 id="news-feed-title" className={styles['news-feed__title']}>
          {messages.title}
        </h1>
        <p className={styles['news-feed__subtitle']}>{messages.subtitle}</p>
      </header>

      <div className={styles['news-feed__controls']}>
        <div
          className={styles['news-feed__filters']}
          role="tablist"
          aria-label={messages.filterAriaLabel}
        >
          {CATEGORIES.map((cat) => {
            const isActive = activeCategory === cat;
            const label =
              cat === 'all'
                ? messages.filterAll
                : messages.categories[cat as keyof typeof messages.categories];
            return (
              <button
                key={cat}
                type="button"
                role="tab"
                aria-selected={isActive}
                className={`${styles['news-feed__filter']} ${
                  isActive ? styles['news-feed__filter--active'] : ''
                }`}
                onClick={() => handleCategoryChange(cat)}
              >
                {label}
              </button>
            );
          })}
        </div>

        <div className={styles['news-feed__search']} role="search">
          <label htmlFor="news-search-input" className={styles['news-feed__search-label']}>
            {messages.search.label}
          </label>
          <span className={styles['news-feed__search-icon']} aria-hidden="true">
            <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="7" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
          </span>
          <input
            id="news-search-input"
            type="search"
            className={styles['news-feed__search-input']}
            placeholder={messages.search.placeholder}
            aria-label={messages.search.ariaLabel}
            value={query}
            onChange={(e) => handleSearchChange(e.target.value)}
          />
          {query && (
            <button
              type="button"
              className={styles['news-feed__search-clear']}
              onClick={() => handleSearchChange('')}
              aria-label={messages.search.clear}
            >
              ✕
            </button>
          )}
        </div>
      </div>

      {visible.length === 0 ? (
        <p className={styles['news-feed__empty']}>
          {isSearching ? messages.search.noResults : messages.empty}
        </p>
      ) : (
        <ul className={styles['news-feed__grid']}>
          {visible.map((item) => (
            <li key={item.id} className={styles['news-feed__grid-item']}>
              <Link
                href={`/news/${item.slug}`}
                className={styles['news-feed__card']}
              >
                <div className={styles['news-feed__card-body']}>
                  <div className={styles['news-feed__card-meta']}>
                    <span
                      className={`${styles['news-feed__category']} ${
                        styles[`news-feed__category--${item.category}`]
                      }`}
                    >
                      {messages.categories[item.category]}
                    </span>
                    <span
                      className={styles['news-feed__meta-dot']}
                      aria-hidden="true"
                    />
                    <span className={styles['news-feed__source']}>{item.source}</span>
                  </div>
                  <h2 className={styles['news-feed__card-title']}>{item.title}</h2>
                  <p className={styles['news-feed__card-summary']}>{item.summary}</p>
                  <time
                    className={styles['news-feed__card-date']}
                    dateTime={item.publishedAt}
                  >
                    {formatDate(item.publishedAt)}
                  </time>
                </div>
                {item.thumbnail && (
                  <div className={styles['news-feed__card-image']}>
                    <Image
                      src={item.thumbnail}
                      alt={item.title}
                      fill
                      sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                      className={styles['news-feed__card-image-img']}
                    />
                  </div>
                )}
              </Link>
            </li>
          ))}
        </ul>
      )}

      <footer className={styles['news-feed__footer']}>
        {hasMore && (
          <button
            type="button"
            className={styles['news-feed__load-more']}
            onClick={() => setVisibleCount((c) => c + PAGE_SIZE)}
          >
            <span aria-hidden="true">↓</span> {messages.loadMore}
          </button>
        )}
        <p
          className={styles['news-feed__auto-update']}
          role="status"
          aria-live="polite"
        >
          {messages.autoUpdate}
        </p>
      </footer>
    </section>
  );
}
