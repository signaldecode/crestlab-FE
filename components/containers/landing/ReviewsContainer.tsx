import Image from 'next/image';
import styles from '@/assets/styles/components/containers/landing/ReviewsContainer.module.scss';

interface ReviewsData {
  bellIcon: string;
}

interface ReviewsContainerProps {
  messages: { cta: string };
  data: ReviewsData;
}

export default function ReviewsContainer({ messages, data }: ReviewsContainerProps) {
  return (
    <section className={styles.reviews}>
      <div className={styles.inner}>
        <div className={styles['bubble-grid']}>
          <div className={styles.bubble}>
            <div className={styles['bubble-body']}>
              <p className={styles['bubble-text']}>{messages.cta}</p>
            </div>
            <div className={styles['bubble-tail']} aria-hidden="true" />
          </div>

          <div className={styles['decor-area']} aria-hidden="true">
            <Image
              src={data.bellIcon}
              alt=""
              width={120}
              height={120}
              className={styles['decor-icon']}
            />
          </div>

          <div className={styles.bubble}>
            <div className={styles['bubble-body']}>
              <p className={styles['bubble-text']}>{messages.cta}</p>
            </div>
            <div className={styles['bubble-tail']} aria-hidden="true" />
          </div>
        </div>
      </div>
    </section>
  );
}
