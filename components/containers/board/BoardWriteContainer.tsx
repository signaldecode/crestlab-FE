'use client';

import { useState } from 'react';
import Link from 'next/link';
import FormField from '@/components/ui/FormField';
import Input from '@/components/ui/Input';
import TextArea from '@/components/ui/TextArea';
import Button from '@/components/ui/Button';
import styles from '@/assets/styles/components/containers/board/BoardWriteContainer.module.scss';

interface BoardWriteMessages {
  title: string;
  subtitle: string;
  postTitle: string;
  postTitlePlaceholder: string;
  content: string;
  contentPlaceholder: string;
  submit: string;
  submitAriaLabel: string;
  backToList: string;
  errors: {
    titleRequired: string;
    contentRequired: string;
  };
}

interface BoardWriteContainerProps {
  messages: BoardWriteMessages;
  idPrefix?: string;
}

export default function BoardWriteContainer({
  messages,
  idPrefix = 'board-write',
}: BoardWriteContainerProps) {
  const [postTitle, setPostTitle] = useState('');
  const [content, setContent] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!postTitle.trim()) newErrors.postTitle = messages.errors.titleRequired;
    if (!content.trim()) newErrors.content = messages.errors.contentRequired;
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    // TODO: API call (POST /api/board)
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
            label={messages.postTitle}
            htmlFor={`${idPrefix}-title`}
            required
            error={errors.postTitle}
          >
            <Input
              value={postTitle}
              onChange={(e) => setPostTitle(e.target.value)}
              placeholder={messages.postTitlePlaceholder}
            />
          </FormField>

          <FormField
            label={messages.content}
            htmlFor={`${idPrefix}-content`}
            required
            error={errors.content}
          >
            <TextArea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder={messages.contentPlaceholder}
              rows={12}
            />
          </FormField>

          <div className={styles.actions}>
            <Button type="submit" variant="primary" aria-label={messages.submitAriaLabel}>
              {messages.submit}
            </Button>
            <Link href="/board">
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
