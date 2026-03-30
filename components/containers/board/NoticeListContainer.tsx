import Link from 'next/link';
import SectionTitle from '@/components/ui/SectionTitle';
import Button from '@/components/ui/Button';
import AdminActions from '@/components/ui/AdminActions';
import styles from '@/assets/styles/components/containers/board/NoticeListContainer.module.scss';

interface NoticeItem {
  id: number;
  title: string;
  date: string;
  content: string;
}

interface NoticeMessages {
  title: string;
  subtitle: string;
  readMore: string;
  noItems: string;
}

interface NoticeListContainerProps {
  messages: NoticeMessages;
  data: { items: NoticeItem[] };
  adminMessages?: {
    writeNotice: string;
  };
}

export default function NoticeListContainer({ messages, data, adminMessages }: NoticeListContainerProps) {
  return (
    <section className={styles.section} aria-label={messages.title}>
      <div className={styles.inner}>
        <SectionTitle title={messages.title} subtitle={messages.subtitle} align="left" />

        <AdminActions>
          <div className={styles['admin-bar']}>
            <Link href="/notices/write">
              <Button variant="primary" size="sm">{adminMessages?.writeNotice}</Button>
            </Link>
          </div>
        </AdminActions>

        {data.items.length > 0 ? (
          <ul className={styles.list}>
            {data.items.map((item) => (
              <li key={item.id} className={styles.item}>
                <Link
                  href={`/notices/${item.id}`}
                  className={styles.link}
                  aria-label={`${item.title} - ${messages.readMore}`}
                >
                  <time className={styles['item-date']} dateTime={item.date}>
                    {item.date}
                  </time>
                  <span className={styles['item-title']}>{item.title}</span>
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          <p className={styles.empty}>{messages.noItems}</p>
        )}
      </div>
    </section>
  );
}
