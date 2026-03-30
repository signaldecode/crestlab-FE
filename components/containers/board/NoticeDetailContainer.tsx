import Link from 'next/link';
import Button from '@/components/ui/Button';
import styles from '@/assets/styles/components/containers/board/NoticeDetailContainer.module.scss';

interface NoticeItem {
  id: number;
  title: string;
  date: string;
  content: string;
}

interface NoticeDetailMessages {
  backToList: string;
}

interface NoticeDetailContainerProps {
  messages: NoticeDetailMessages;
  data: NoticeItem;
}

export default function NoticeDetailContainer({ messages, data }: NoticeDetailContainerProps) {
  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <article>
          <header className={styles.header}>
            <h1 className={styles.title}>{data.title}</h1>
            <time className={styles.date} dateTime={data.date}>
              {data.date}
            </time>
          </header>
          <div className={styles.content}>{data.content}</div>
        </article>

        <div className={styles.back}>
          <Link href="/notices">
            <Button variant="secondary">{messages.backToList}</Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
