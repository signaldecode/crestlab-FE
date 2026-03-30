import Link from 'next/link';
import Button from '@/components/ui/Button';
import AdminActions from '@/components/ui/AdminActions';
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
  adminMessages?: {
    editNotice: string;
    deleteNotice: string;
  };
}

export default function NoticeDetailContainer({ messages, data, adminMessages }: NoticeDetailContainerProps) {
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

        <AdminActions>
          <div className={styles['admin-bar']}>
            <Button variant="primary" size="sm">{adminMessages?.editNotice}</Button>
            <Button variant="danger" size="sm">{adminMessages?.deleteNotice}</Button>
          </div>
        </AdminActions>

        <div className={styles.back}>
          <Link href="/notices">
            <Button variant="secondary">{messages.backToList}</Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
