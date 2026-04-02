'use client';

import { useState } from 'react';
import Link from 'next/link';
import FormField from '@/components/ui/FormField';
import Input from '@/components/ui/Input';
import TiptapEditor from '@/components/ui/TiptapEditor';
import type { ToolbarMessages } from '@/components/ui/TiptapEditor';
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
  editorMessages: ToolbarMessages;
  idPrefix?: string;
}

export default function BoardWriteContainer({
  messages,
  editorMessages,
  idPrefix = 'board-write',
}: BoardWriteContainerProps) {
  const [postTitle, setPostTitle] = useState('');
  const [content, setContent] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!postTitle.trim()) newErrors.postTitle = messages.errors.titleRequired;
    const textOnly = content.replace(/<[^>]*>/g, '').trim();
    if (!textOnly) newErrors.content = messages.errors.contentRequired;
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
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
            <TiptapEditor
              content={content}
              onChange={setContent}
              placeholder={messages.contentPlaceholder}
              toolbarMessages={editorMessages}
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
