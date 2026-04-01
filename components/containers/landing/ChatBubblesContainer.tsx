import Image from 'next/image';
import styles from '@/assets/styles/components/containers/landing/ChatBubblesContainer.module.scss';

interface ChatBubblesContainerProps {
  messages: { title: string; subtitle: string };
}

export default function ChatBubblesContainer({ messages }: ChatBubblesContainerProps) {
  return (
    <section className={styles['chat-bubbles']}>
      <div className={styles.inner}>
        <h2 className={styles.title}>{messages.title}</h2>
        <p className={styles.subtitle}>{messages.subtitle}</p>

        <div className={styles.visual}>
          <div className={styles.bubbles}>
            <div className={`${styles.bubble} ${styles['bubble--green']}`}>
              <span className={styles['bubble-text']}>실시간 매매 알림</span>
            </div>
            <div className={`${styles.bubble} ${styles['bubble--blue']}`}>
              <span className={styles['bubble-text']}>포트폴리오 리밸런싱 완료</span>
            </div>
            <div className={`${styles.bubble} ${styles['bubble--green']}`}>
              <span className={styles['bubble-text']}>오늘 수익률 +2.4%</span>
            </div>
            <div className={`${styles.bubble} ${styles['bubble--blue']}`}>
              <span className={styles['bubble-text']}>새로운 투자 기회 발견</span>
            </div>
          </div>

          <div className={styles.decorations}>
            <Image
              src="/images/landing/bell-3d.png"
              alt=""
              width={155}
              height={139}
              className={styles['decor-bell']}
            />
            <Image
              src="/images/landing/heart-3d.png"
              alt=""
              width={179}
              height={129}
              className={styles['decor-heart']}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
