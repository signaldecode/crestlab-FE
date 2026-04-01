import Link from 'next/link';
import Button from '@/components/ui/Button';
import AdminActions from '@/components/ui/AdminActions';
import SectionTitle from '@/components/ui/SectionTitle';
import styles from '@/assets/styles/components/containers/board/NewsListContainer.module.scss';

interface NewsItem {
  id: number;
  title: string;
  source: string;
  date: string;
  summary: string;
  thumbnail: string;
  url: string;
}

interface NewsMessages {
  title: string;
  subtitle: string;
  source: string;
  readOriginal: string;
  readOriginalAriaLabel: string;
  noItems: string;
}

interface NewsListContainerProps {
  messages: NewsMessages;
  data: { items: NewsItem[] };
  adminMessages?: {
    writeNews: string;
  };
}

export default function NewsListContainer({ messages, data, adminMessages }: NewsListContainerProps) {
  return (
    <section className={styles.section} aria-label={messages.title}>
      <div className={styles.inner}>
        <SectionTitle title={messages.title} subtitle={messages.subtitle} align="left" />

        <AdminActions>
          <div className={styles['admin-bar']}>
            <Link href="/news/write">
              <Button variant="primary" size="sm">{adminMessages?.writeNews}</Button>
            </Link>
          </div>
        </AdminActions>

        {data.items.length > 0 ? (
          <div className={styles.grid}>
            {data.items.map((item) => (
              <a
                key={item.id}
                href={item.url}
                className={styles.card}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${item.title} - ${messages.readOriginalAriaLabel}`}
              >
                <div className={styles.thumbnail} role="img" aria-hidden="true" />
                <div className={styles['card-body']}>
                  <div className={styles['card-meta']}>
                    <span className={styles['card-source']}>
                      {messages.source}: {item.source}
                    </span>
                    <time className={styles['card-date']} dateTime={item.date}>
                      {item.date}
                    </time>
                  </div>
                  <h3 className={styles['card-title']}>{item.title}</h3>
                  <p className={styles['card-summary']}>{item.summary}</p>
                </div>
              </a>
            ))}
          </div>
        ) : (
          <p className={styles.empty}>{messages.noItems}</p>
        )}
      </div>
    </section>
  );
}
