'use client';

import { useEffect, useRef, useState } from 'react';
import styles from '@/assets/styles/components/containers/education/AdminVideoUploadModal.module.scss';
import useEducationStore from '@/stores/useEducationStore';
import { parseYouTubeId, slugifyTitle, youtubeThumbnailUrl } from '@/lib/youtube';
import type { VideoCategory, VideoItem } from '@/types/finance';
import type { EducationAdminMessages, EducationCategoryMessages } from './EducationPageContainer';

interface AdminVideoUploadModalProps {
  open: boolean;
  onClose: () => void;
  messages: EducationAdminMessages;
  categoryLabels: EducationCategoryMessages;
}

interface FetchedMeta {
  title: string;
  description: string;
  duration: string;
  views: number;
  thumbnail: string;
  publishedAt: string;
}

const CATEGORY_OPTIONS: VideoCategory[] = [
  'beginner',
  'intermediate',
  'technical-analysis',
  'crypto-basics',
  'market-strategy',
];

type FetchStatus = 'idle' | 'loading' | 'success' | 'error';

export default function AdminVideoUploadModal({
  open,
  onClose,
  messages,
  categoryLabels,
}: AdminVideoUploadModalProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const addVideo = useEducationStore((s) => s.addVideo);

  const [url, setUrl] = useState('');
  const [category, setCategory] = useState<VideoCategory | ''>('');
  const [meta, setMeta] = useState<FetchedMeta | null>(null);
  const [fetchStatus, setFetchStatus] = useState<FetchStatus>('idle');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (open) {
      if (!dialog.open) dialog.showModal();
      document.body.classList.add('modal-open');
    } else {
      if (dialog.open) dialog.close();
      document.body.classList.remove('modal-open');
    }
  }, [open]);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    const handleClose = () => {
      document.body.classList.remove('modal-open');
      onClose();
    };
    dialog.addEventListener('close', handleClose);
    return () => dialog.removeEventListener('close', handleClose);
  }, [onClose]);

  function resetForm() {
    setUrl('');
    setCategory('');
    setMeta(null);
    setFetchStatus('idle');
    setError(null);
  }

  function handleBackdropClick(e: React.MouseEvent<HTMLDialogElement>) {
    if (e.target === dialogRef.current) {
      onClose();
    }
  }

  async function fetchMeta(input: string) {
    const videoId = parseYouTubeId(input);
    if (!videoId) {
      setFetchStatus('error');
      setError(messages.errors.invalidUrl);
      setMeta(null);
      return;
    }

    setError(null);
    setFetchStatus('loading');

    try {
      const res = await fetch(
        `/api/education/youtube-meta?id=${encodeURIComponent(videoId)}`,
      );
      if (!res.ok) throw new Error('fetch failed');
      const data = await res.json();

      setMeta({
        title: data.title ?? '',
        description: data.description ?? '',
        duration: data.duration ?? '',
        views: Number(data.views ?? 0),
        thumbnail: data.thumbnail ?? youtubeThumbnailUrl(videoId),
        publishedAt: data.publishedAt ?? new Date().toISOString().slice(0, 10),
      });
      setFetchStatus('success');
    } catch {
      setFetchStatus('error');
      setError(messages.fetchError);
      setMeta(null);
    }
  }

  function handleSubmit(e: { preventDefault: () => void }) {
    e.preventDefault();
    setError(null);

    const videoId = parseYouTubeId(url);
    if (!videoId) {
      setError(messages.errors.invalidUrl);
      return;
    }
    if (!meta || !meta.title) {
      setError(messages.errors.titleRequired);
      return;
    }
    if (!category) {
      setError(messages.errors.categoryRequired);
      return;
    }

    const video: VideoItem = {
      slug: `${slugifyTitle(meta.title)}-${videoId.slice(0, 6)}`,
      title: meta.title,
      description: meta.description,
      youtubeId: videoId,
      category,
      thumbnail: meta.thumbnail,
      duration: meta.duration || '00:00',
      views: meta.views,
      publishedAt: meta.publishedAt,
    };

    addVideo(video);
    resetForm();
    onClose();
  }

  return (
    <dialog
      ref={dialogRef}
      className={styles.dialog}
      aria-labelledby="admin-upload-title"
      onClick={handleBackdropClick}
    >
      <div className={styles.content}>
        <header className={styles.header}>
          <div className={styles['header-text']}>
            <h2 id="admin-upload-title" className={styles.title}>
              {messages.title}
            </h2>
            <p className={styles.subtitle}>{messages.subtitle}</p>
          </div>
          <button
            type="button"
            className={styles['close-button']}
            onClick={onClose}
            aria-label={messages.closeAriaLabel}
          >
            ✕
          </button>
        </header>

        <form className={styles.form} onSubmit={handleSubmit} noValidate>
          <div className={styles.field}>
            <label htmlFor="admin-upload-url" className={styles.label}>
              {messages.urlLabel}
            </label>
            <input
              id="admin-upload-url"
              type="url"
              className={styles.input}
              placeholder={messages.urlPlaceholder}
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              onBlur={() => url.trim() && fetchMeta(url)}
              aria-describedby="admin-upload-fetch-status"
              required
            />
            <p
              id="admin-upload-fetch-status"
              className={styles.hint}
              aria-live="polite"
            >
              {fetchStatus === 'loading' && messages.fetching}
              {fetchStatus === 'success' &&
                `${messages.fetched}${meta?.duration ? ` (${meta.duration})` : ''}`}
              {fetchStatus === 'error' && (error ?? messages.fetchError)}
            </p>
          </div>

          {meta && fetchStatus === 'success' && (
            <div className={styles.preview}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={meta.thumbnail}
                alt={meta.title}
                className={styles['preview-thumb']}
              />
              <div className={styles['preview-body']}>
                <h3 className={styles['preview-title']}>{meta.title}</h3>
                {meta.duration && (
                  <span className={styles['preview-duration']}>{meta.duration}</span>
                )}
              </div>
            </div>
          )}

          <div className={styles.field}>
            <label htmlFor="admin-upload-category" className={styles.label}>
              {messages.categoryLabel}
            </label>
            <select
              id="admin-upload-category"
              className={styles.select}
              value={category}
              onChange={(e) => setCategory(e.target.value as VideoCategory)}
              required
            >
              <option value="">—</option>
              {CATEGORY_OPTIONS.map((opt) => (
                <option key={opt} value={opt}>
                  {categoryLabels[opt]}
                </option>
              ))}
            </select>
          </div>

          {error && fetchStatus !== 'error' && (
            <p className={styles.error} role="alert">
              {error}
            </p>
          )}

          <div className={styles.actions}>
            <button
              type="button"
              className={styles['button-secondary']}
              onClick={onClose}
            >
              {messages.cancel}
            </button>
            <button
              type="submit"
              className={styles['button-primary']}
              disabled={fetchStatus === 'loading' || !meta}
            >
              {messages.submit}
            </button>
          </div>
        </form>
      </div>
    </dialog>
  );
}
