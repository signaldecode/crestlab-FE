'use client';

import { useRef, useState } from 'react';
import Link from 'next/link';
import FormField from '@/components/ui/FormField';
import Input from '@/components/ui/Input';
import TiptapEditor from '@/components/ui/TiptapEditor';
import type { ToolbarMessages } from '@/components/ui/TiptapEditor';
import Button from '@/components/ui/Button';
import styles from '@/assets/styles/components/containers/board/NewsUploadContainer.module.scss';

type UploadMode = 'url' | 'manual';

interface NewsUploadMessages {
  title: string;
  subtitle: string;
  modeUrl: string;
  modeManual: string;
  url: string;
  urlPlaceholder: string;
  scrapeButton: string;
  scraping: string;
  scrapeSuccess: string;
  newsTitle: string;
  newsTitlePlaceholder: string;
  content: string;
  contentPlaceholder: string;
  source: string;
  sourcePlaceholder: string;
  sourceUrl: string;
  sourceUrlPlaceholder: string;
  thumbnail: string;
  thumbnailHint: string;
  selectFile: string;
  changeFile: string;
  noFileSelected: string;
  submit: string;
  submitAriaLabel: string;
  backToList: string;
  errors: {
    urlRequired: string;
    urlInvalid: string;
    scrapeFailed: string;
    titleRequired: string;
    contentRequired: string;
    sourceRequired: string;
  };
}

interface NewsUploadContainerProps {
  messages: NewsUploadMessages;
  editorMessages: ToolbarMessages;
  idPrefix?: string;
}

export default function NewsUploadContainer({
  messages,
  editorMessages,
  idPrefix = 'news-upload',
}: NewsUploadContainerProps) {
  const [mode, setMode] = useState<UploadMode>('url');
  const [url, setUrl] = useState('');
  const [isScraping, setIsScraping] = useState(false);
  const [scraped, setScraped] = useState(false);
  const [newsTitle, setNewsTitle] = useState('');
  const [content, setContent] = useState('');
  const [source, setSource] = useState('');
  const [sourceUrl, setSourceUrl] = useState('');
  const [thumbnailFile, setThumbnailFile] = useState<File | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const thumbnailInputRef = useRef<HTMLInputElement>(null);

  const isValidUrl = (value: string) => {
    try {
      new URL(value);
      return true;
    } catch {
      return false;
    }
  };

  const handleScrape = async () => {
    const newErrors: Record<string, string> = {};
    if (!url.trim()) {
      newErrors.url = messages.errors.urlRequired;
    } else if (!isValidUrl(url)) {
      newErrors.url = messages.errors.urlInvalid;
    }
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    setIsScraping(true);

    // TODO: Replace with actual API call (POST /api/news/scrape)
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      setNewsTitle('스크랩된 기사 제목');
      setContent('스크랩된 기사 본문 내용이 여기에 표시됩니다.');
      setSource('출처명');
      setSourceUrl(url);
      setScraped(true);
    } catch {
      setErrors({ url: messages.errors.scrapeFailed });
    } finally {
      setIsScraping(false);
    }
  };

  const handleModeChange = (newMode: UploadMode) => {
    setMode(newMode);
    setErrors({});
    setScraped(false);
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!newsTitle.trim()) newErrors.newsTitle = messages.errors.titleRequired;
    const textOnly = content.replace(/<[^>]*>/g, '').trim();
    if (!textOnly) newErrors.content = messages.errors.contentRequired;
    if (!source.trim()) newErrors.source = messages.errors.sourceRequired;
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (mode === 'url' && !scraped) {
      handleScrape();
      return;
    }
    if (!validate()) return;
    // TODO: API call (POST /api/news)
  };

  return (
    <section className={styles.section} aria-label={messages.title}>
      <div className={styles.inner}>
        <header className={styles.header}>
          <h1 className={styles.title}>{messages.title}</h1>
          <p className={styles.subtitle}>{messages.subtitle}</p>
        </header>

        <div className={styles.tabs} role="tablist" aria-label={messages.title}>
          <button
            role="tab"
            type="button"
            className={`${styles.tab} ${mode === 'url' ? styles['tab--active'] : ''}`}
            aria-selected={mode === 'url'}
            onClick={() => handleModeChange('url')}
          >
            {messages.modeUrl}
          </button>
          <button
            role="tab"
            type="button"
            className={`${styles.tab} ${mode === 'manual' ? styles['tab--active'] : ''}`}
            aria-selected={mode === 'manual'}
            onClick={() => handleModeChange('manual')}
          >
            {messages.modeManual}
          </button>
        </div>

        <form className={styles.form} onSubmit={handleSubmit} noValidate>
          {mode === 'url' && (
            <div className={styles['scrape-section']}>
              <FormField
                label={messages.url}
                htmlFor={`${idPrefix}-url`}
                required
                error={errors.url}
              >
                <Input
                  type="url"
                  value={url}
                  onChange={(e) => {
                    setUrl(e.target.value);
                    setScraped(false);
                  }}
                  placeholder={messages.urlPlaceholder}
                />
              </FormField>
              <Button
                type="button"
                variant="secondary"
                onClick={handleScrape}
                disabled={isScraping}
              >
                {isScraping ? messages.scraping : messages.scrapeButton}
              </Button>
              {scraped && (
                <p className={styles['scrape-success']} role="status">
                  {messages.scrapeSuccess}
                </p>
              )}
            </div>
          )}

          {(mode === 'manual' || scraped) && (
            <>
              <FormField
                label={messages.newsTitle}
                htmlFor={`${idPrefix}-title`}
                required
                error={errors.newsTitle}
              >
                <Input
                  value={newsTitle}
                  onChange={(e) => setNewsTitle(e.target.value)}
                  placeholder={messages.newsTitlePlaceholder}
                />
              </FormField>

              <FormField
                label={messages.content}
                htmlFor={`${idPrefix}-content`}
                required
                error={errors.content}
              >
                <TiptapEditor
                  content={content}
                  onChange={setContent}
                  placeholder={messages.contentPlaceholder}
                  toolbarMessages={editorMessages}
                />
              </FormField>

              <FormField
                label={messages.source}
                htmlFor={`${idPrefix}-source`}
                required
                error={errors.source}
              >
                <Input
                  value={source}
                  onChange={(e) => setSource(e.target.value)}
                  placeholder={messages.sourcePlaceholder}
                />
              </FormField>

              <FormField
                label={messages.sourceUrl}
                htmlFor={`${idPrefix}-source-url`}
              >
                <Input
                  type="url"
                  value={sourceUrl}
                  onChange={(e) => setSourceUrl(e.target.value)}
                  placeholder={messages.sourceUrlPlaceholder}
                />
              </FormField>

              <FormField
                label={messages.thumbnail}
                htmlFor={`${idPrefix}-thumbnail`}
                hint={messages.thumbnailHint}
              >
                <div className={styles['file-upload']}>
                  <div className={styles['file-row']}>
                    <Button
                      type="button"
                      variant="secondary"
                      size="sm"
                      onClick={() => thumbnailInputRef.current?.click()}
                    >
                      {thumbnailFile ? messages.changeFile : messages.selectFile}
                    </Button>
                    <span className={styles['file-name']}>
                      {thumbnailFile ? thumbnailFile.name : messages.noFileSelected}
                    </span>
                  </div>
                  <input
                    ref={thumbnailInputRef}
                    className={styles['file-input']}
                    type="file"
                    accept="image/jpeg,image/png"
                    onChange={(e) => setThumbnailFile(e.target.files?.[0] ?? null)}
                  />
                </div>
              </FormField>

              <div className={styles.actions}>
                <Button type="submit" variant="primary" aria-label={messages.submitAriaLabel}>
                  {messages.submit}
                </Button>
                <Link href="/news">
                  <Button type="button" variant="ghost">
                    {messages.backToList}
                  </Button>
                </Link>
              </div>
            </>
          )}

          {mode === 'url' && !scraped && (
            <div className={styles.actions}>
              <Link href="/news">
                <Button type="button" variant="ghost">
                  {messages.backToList}
                </Button>
              </Link>
            </div>
          )}
        </form>
      </div>
    </section>
  );
}
