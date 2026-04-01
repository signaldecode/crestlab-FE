'use client';

import Link from 'next/link';
import Button from '@/components/ui/Button';
import AdminActions from '@/components/ui/AdminActions';
import SectionTitle from '@/components/ui/SectionTitle';
import styles from '@/assets/styles/components/containers/board/VideoListContainer.module.scss';

interface VideoItem {
  slug: string;
  title: string;
  description: string;
  duration: string;
  thumbnail: string;
  category: string;
}

interface VideoMessages {
  title: string;
  subtitle: string;
  loginRequired: string;
  loginCta: string;
  noItems: string;
}

interface VideoListContainerProps {
  messages: VideoMessages;
  data: { items: VideoItem[] };
  adminMessages?: {
    uploadVideo: string;
  };
}

export default function VideoListContainer({ messages, data, adminMessages }: VideoListContainerProps) {
  return (
    <section className={styles.section} aria-label={messages.title}>
      <div className={styles.inner}>
        <SectionTitle title={messages.title} subtitle={messages.subtitle} align="left" />

        <AdminActions>
          <div className={styles['admin-bar']}>
            <Link href="/videos/upload">
              <Button variant="primary" size="sm">{adminMessages?.uploadVideo}</Button>
            </Link>
          </div>
        </AdminActions>

        {data.items.length > 0 ? (
          <div className={styles.grid}>
            {data.items.map((item) => (
              <Link
                key={item.slug}
                href={`/videos/${item.slug}`}
                className={styles.card}
                aria-label={item.title}
              >
                <div className={styles['thumbnail-wrap']}>
                  <div className={styles.thumbnail} role="img" aria-hidden="true" />
                  <span className={styles.duration} aria-label={`${item.duration}`}>
                    {item.duration}
                  </span>
                </div>
                <div className={styles['card-body']}>
                  <span className={styles.category}>{item.category}</span>
                  <h3 className={styles['card-title']}>{item.title}</h3>
                  <p className={styles['card-description']}>{item.description}</p>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <p className={styles.empty}>{messages.noItems}</p>
        )}
      </div>
    </section>
  );
}
