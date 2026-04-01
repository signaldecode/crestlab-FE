'use client';

import Link from 'next/link';
import Button from '@/components/ui/Button';
import useAuthStore from '@/stores/useAuthStore';
import styles from '@/assets/styles/components/containers/board/BoardDetailContainer.module.scss';

interface BoardPost {
  id: number;
  title: string;
  author: string;
  date: string;
  views: number;
  content: string;
}

interface BoardDetailMessages {
  backToList: string;
  author: string;
  date: string;
  views: string;
  edit: string;
  delete: string;
  deleteConfirm: string;
}

interface BoardDetailContainerProps {
  messages: BoardDetailMessages;
  data: BoardPost;
  currentUserId?: string;
}

export default function BoardDetailContainer({ messages, data, currentUserId }: BoardDetailContainerProps) {
  const isAdmin = useAuthStore((s) => s.isAdmin);
  const isOwner = currentUserId === data.author;
  const canModify = isAdmin || isOwner;

  const handleDelete = () => {
    if (window.confirm(messages.deleteConfirm)) {
      // TODO: API call (DELETE /api/board/{id})
    }
  };

  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <article>
          <header className={styles.header}>
            <h1 className={styles.title}>{data.title}</h1>
            <div className={styles.meta}>
              <span>{messages.author}: {data.author}</span>
              <time dateTime={data.date}>{messages.date}: {data.date}</time>
              <span>{messages.views}: {data.views}</span>
            </div>
          </header>
          <div className={styles.content}>{data.content}</div>
        </article>

        {canModify && (
          <div className={styles['action-bar']}>
            <Button variant="primary" size="sm">{messages.edit}</Button>
            <Button variant="danger" size="sm" onClick={handleDelete}>{messages.delete}</Button>
          </div>
        )}

        <div className={styles.back}>
          <Link href="/board">
            <Button variant="secondary">{messages.backToList}</Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
