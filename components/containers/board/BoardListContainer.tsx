'use client';

import Link from 'next/link';
import SectionTitle from '@/components/ui/SectionTitle';
import Button from '@/components/ui/Button';
import useAuthStore from '@/stores/useAuthStore';
import styles from '@/assets/styles/components/containers/board/BoardListContainer.module.scss';

interface BoardItem {
  id: number;
  title: string;
  author: string;
  date: string;
  views: number;
}

interface BoardMessages {
  title: string;
  subtitle: string;
  write: string;
  noItems: string;
  author: string;
  date: string;
  views: string;
  loginRequired: string;
  loginCta: string;
}

interface BoardListContainerProps {
  messages: BoardMessages;
  data: { items: BoardItem[] };
}

export default function BoardListContainer({ messages, data }: BoardListContainerProps) {
  const isLoggedIn = useAuthStore((s) => s.isLoggedIn);

  return (
    <section className={styles.section} aria-label={messages.title}>
      <div className={styles.inner}>
        <SectionTitle title={messages.title} subtitle={messages.subtitle} align="left" />

        <div className={styles['action-bar']}>
          {isLoggedIn ? (
            <Link href="/board/write">
              <Button variant="primary" size="sm">{messages.write}</Button>
            </Link>
          ) : (
            <Link href="/login">
              <Button variant="secondary" size="sm">{messages.loginCta}</Button>
            </Link>
          )}
        </div>

        {data.items.length > 0 ? (
          <>
            <div className={styles['table-header']} aria-hidden="true">
              <span className={styles['col-title']}>{messages.title}</span>
              <span className={styles['col-author']}>{messages.author}</span>
              <span className={styles['col-date']}>{messages.date}</span>
              <span className={styles['col-views']}>{messages.views}</span>
            </div>
            <ul className={styles.list}>
              {data.items.map((item) => (
                <li key={item.id} className={styles.item}>
                  <Link href={`/board/${item.id}`} className={styles.link}>
                    <span className={styles['col-title']}>{item.title}</span>
                    <span className={styles['col-author']}>{item.author}</span>
                    <time className={styles['col-date']} dateTime={item.date}>{item.date}</time>
                    <span className={styles['col-views']}>{item.views}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </>
        ) : (
          <p className={styles.empty}>{messages.noItems}</p>
        )}
      </div>
    </section>
  );
}
