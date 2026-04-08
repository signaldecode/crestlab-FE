'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import styles from '@/assets/styles/components/containers/education/VideoCategoryContainer.module.scss';
import useAuthStore from '@/stores/useAuthStore';
import AdminVideoUploadModal from './AdminVideoUploadModal';
import type { VideoItem, VideoCategory } from '@/types/finance';
import type { EducationAdminMessages, EducationVideosMessages } from './EducationPageContainer';

interface VideoCategoryContainerProps {
  messages: EducationVideosMessages;
  adminMessages: EducationAdminMessages;
  data: VideoItem[];
  activeCategory: VideoCategory | 'all';
  onCategoryChange: (category: VideoCategory | 'all') => void;
}

const CATEGORIES: (VideoCategory | 'all')[] = [
  'all',
  'beginner',
  'intermediate',
  'technical-analysis',
  'crypto-basics',
  'market-strategy',
];

function formatViews(views: number): string {
  if (views >= 1_000_000) return `${(views / 1_000_000).toFixed(1)}M`;
  if (views >= 1_000) return `${(views / 1_000).toFixed(1)}k`;
  return String(views);
}

export default function VideoCategoryContainer({
  messages,
  adminMessages,
  data,
  activeCategory,
  onCategoryChange,
}: VideoCategoryContainerProps) {
  const isAdmin = useAuthStore((s) => s.isAdmin);
  const [uploadOpen, setUploadOpen] = useState(false);

  const filtered =
    activeCategory === 'all' ? data : data.filter((v) => v.category === activeCategory);

  return (
    <section className={styles['video-category']} aria-labelledby="video-category-title">
      <header className={styles['video-category__header']}>
        <h2 id="video-category-title" className={styles['video-category__title']}>
          {messages.title}
        </h2>
        {isAdmin && (
          <button
            type="button"
            className={styles['video-category__upload-button']}
            onClick={() => setUploadOpen(true)}
            aria-label={adminMessages.openButtonAriaLabel}
          >
            <span aria-hidden="true">+</span> {adminMessages.openButton}
          </button>
        )}
      </header>

      <div
        className={styles['video-category__filters']}
        role="tablist"
        aria-label={messages.filterAriaLabel}
      >
        {CATEGORIES.map((cat) => {
          const isActive = activeCategory === cat;
          const label = cat === 'all' ? messages.filterAll : messages.categories[cat];
          return (
            <button
              key={cat}
              type="button"
              role="tab"
              aria-selected={isActive}
              className={`${styles['video-category__filter']} ${
                isActive ? styles['video-category__filter--active'] : ''
              }`}
              onClick={() => onCategoryChange(cat)}
            >
              {label}
            </button>
          );
        })}
      </div>

      {filtered.length === 0 ? (
        <p className={styles['video-category__empty']}>{messages.empty}</p>
      ) : (
        <ul className={styles['video-category__grid']}>
          {filtered.map((video) => (
            <li key={video.slug} className={styles['video-category__grid-item']}>
              <Link
                href={`/education/${video.slug}`}
                className={styles['video-category__card']}
              >
                <div className={styles['video-category__thumbnail']}>
                  <Image
                    src={video.thumbnail}
                    alt={video.title}
                    fill
                    sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                    className={styles['video-category__thumbnail-image']}
                    unoptimized
                  />
                  <span
                    className={styles['video-category__play']}
                    aria-hidden="true"
                  >
                    <svg viewBox="0 0 24 24" width="28" height="28">
                      <path d="M8 5v14l11-7z" fill="currentColor" />
                    </svg>
                  </span>
                  <span className={styles['video-category__duration']}>{video.duration}</span>
                </div>
                <div className={styles['video-category__body']}>
                  <h3 className={styles['video-category__card-title']}>{video.title}</h3>
                  {video.description && (
                    <p className={styles['video-category__card-description']}>
                      {video.description}
                    </p>
                  )}
                  <div className={styles['video-category__meta']}>
                    <span className={styles['video-category__category']}>
                      {messages.categories[video.category]}
                    </span>
                    <span className={styles['video-category__views']}>
                      {formatViews(video.views)} views
                    </span>
                  </div>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      )}

      {isAdmin && (
        <AdminVideoUploadModal
          open={uploadOpen}
          onClose={() => setUploadOpen(false)}
          messages={adminMessages}
          categoryLabels={messages.categories}
        />
      )}
    </section>
  );
}
