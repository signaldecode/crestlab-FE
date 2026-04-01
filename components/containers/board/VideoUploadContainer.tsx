'use client';

import { useRef, useState } from 'react';
import Link from 'next/link';
import FormField from '@/components/ui/FormField';
import Input from '@/components/ui/Input';
import TextArea from '@/components/ui/TextArea';
import Button from '@/components/ui/Button';
import styles from '@/assets/styles/components/containers/board/VideoUploadContainer.module.scss';

interface UploadFormMessages {
  title: string;
  subtitle: string;
  videoTitle: string;
  videoTitlePlaceholder: string;
  description: string;
  descriptionPlaceholder: string;
  category: string;
  categoryPlaceholder: string;
  categories: Record<string, string>;
  videoFile: string;
  videoFileHint: string;
  thumbnail: string;
  thumbnailHint: string;
  selectFile: string;
  changeFile: string;
  noFileSelected: string;
  submit: string;
  submitAriaLabel: string;
  backToList: string;
  errors: {
    titleRequired: string;
    descriptionRequired: string;
    categoryRequired: string;
    videoFileRequired: string;
  };
}

interface VideoUploadContainerProps {
  messages: UploadFormMessages;
  idPrefix?: string;
}

export default function VideoUploadContainer({
  messages,
  idPrefix = 'video-upload',
}: VideoUploadContainerProps) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [thumbnailFile, setThumbnailFile] = useState<File | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const videoInputRef = useRef<HTMLInputElement>(null);
  const thumbnailInputRef = useRef<HTMLInputElement>(null);

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!title.trim()) newErrors.title = messages.errors.titleRequired;
    if (!description.trim()) newErrors.description = messages.errors.descriptionRequired;
    if (!category) newErrors.category = messages.errors.categoryRequired;
    if (!videoFile) newErrors.videoFile = messages.errors.videoFileRequired;
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    // TODO: API call
  };

  return (
    <section className={styles.section} aria-label={messages.title}>
      <div className={styles.inner}>
        <header className={styles.header}>
          <h1 className={styles.title}>{messages.title}</h1>
          <p className={styles.subtitle}>{messages.subtitle}</p>
        </header>

        <form className={styles.form} onSubmit={handleSubmit} noValidate>
          <FormField
            label={messages.videoTitle}
            htmlFor={`${idPrefix}-title`}
            required
            error={errors.title}
          >
            <Input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder={messages.videoTitlePlaceholder}
            />
          </FormField>

          <FormField
            label={messages.description}
            htmlFor={`${idPrefix}-description`}
            required
            error={errors.description}
          >
            <TextArea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder={messages.descriptionPlaceholder}
              rows={5}
            />
          </FormField>

          <FormField
            label={messages.category}
            htmlFor={`${idPrefix}-category`}
            required
            error={errors.category}
          >
            <select
              className={styles.select}
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="">{messages.categoryPlaceholder}</option>
              {Object.entries(messages.categories).map(([key, label]) => (
                <option key={key} value={key}>
                  {label}
                </option>
              ))}
            </select>
          </FormField>

          <FormField
            label={messages.videoFile}
            htmlFor={`${idPrefix}-video-file`}
            required
            error={errors.videoFile}
            hint={messages.videoFileHint}
          >
            <div className={styles['file-upload']}>
              <div className={styles['file-row']}>
                <Button
                  type="button"
                  variant="secondary"
                  size="sm"
                  onClick={() => videoInputRef.current?.click()}
                >
                  {videoFile ? messages.changeFile : messages.selectFile}
                </Button>
                <span className={styles['file-name']}>
                  {videoFile ? videoFile.name : messages.noFileSelected}
                </span>
              </div>
              <input
                ref={videoInputRef}
                className={styles['file-input']}
                type="file"
                accept="video/mp4,video/webm"
                onChange={(e) => setVideoFile(e.target.files?.[0] ?? null)}
              />
            </div>
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
            <Link href="/videos">
              <Button type="button" variant="ghost">
                {messages.backToList}
              </Button>
            </Link>
          </div>
        </form>
      </div>
    </section>
  );
}
