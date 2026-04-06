'use client';

import { useState } from 'react';
import styles from '@/assets/styles/components/containers/education/VideoCategoryContainer.module.scss';
import SectionTitle from '@/components/ui/SectionTitle';
import type { VideoItem } from '@/types/finance';

interface VideoCategoryContainerProps {
  messages: {
    title: string;
    filterAll: string;
    categories: Record<string, string>;
  };
  data: VideoItem[];
}

type Category = VideoItem['category'] | 'all';

const CATEGORIES: Category[] = ['all', 'beginner', 'technical-analysis', 'crypto-basics'];

export default function VideoCategoryContainer({ messages, data }: VideoCategoryContainerProps) {
  const [active, setActive] = useState<Category>('all');

  const filtered = active === 'all' ? data : data.filter((v) => v.category === active);

  return (
    <section className={styles['video-category']} aria-labelledby="video-category-title">
      <SectionTitle title={messages.title} />

      <div className={styles['video-category__filters']} role="tablist">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            role="tab"
            aria-selected={active === cat}
            className={`${styles['video-category__filter']} ${
              active === cat ? styles['video-category__filter--active'] : ''
            }`}
            onClick={() => setActive(cat)}
          >
            {cat === 'all' ? messages.filterAll : messages.categories[cat] ?? cat}
          </button>
        ))}
      </div>

      <div className={styles['video-category__grid']}>
        {filtered.map((video) => (
          <a
            key={video.slug}
            href={`/education/${video.slug}`}
            className={styles['video-category__card']}
          >
            <div className={styles['video-category__thumbnail']}>
              <span className={styles['video-category__duration']}>{video.duration}</span>
            </div>
            <h3 className={styles['video-category__card-title']}>{video.title}</h3>
            <p className={styles['video-category__description']}>{video.description}</p>
          </a>
        ))}
      </div>
    </section>
  );
}
