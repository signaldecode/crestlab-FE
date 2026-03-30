import Link from 'next/link';
import Button from '@/components/ui/Button';
import styles from '@/assets/styles/components/containers/board/VideoDetailContainer.module.scss';

interface VideoItem {
  slug: string;
  title: string;
  description: string;
  duration: string;
  thumbnail: string;
  category: string;
}

interface VideoDetailMessages {
  backToList: string;
}

interface VideoDetailContainerProps {
  messages: VideoDetailMessages;
  data: VideoItem;
}

export default function VideoDetailContainer({ messages, data }: VideoDetailContainerProps) {
  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <div className={styles.player} aria-label={data.title}>
          {/* Video player placeholder */}
        </div>

        <div className={styles.info}>
          <div className={styles.meta}>
            <span className={styles.category}>{data.category}</span>
            <span className={styles.duration}>{data.duration}</span>
          </div>
          <h1 className={styles.title}>{data.title}</h1>
          <p className={styles.description}>{data.description}</p>
        </div>

        <div className={styles.back}>
          <Link href="/videos">
            <Button variant="secondary">{messages.backToList}</Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
