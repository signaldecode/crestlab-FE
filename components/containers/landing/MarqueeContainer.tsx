import Image from 'next/image';
import styles from '@/assets/styles/components/containers/landing/MarqueeContainer.module.scss';

const ILLUSTRATIONS = [
  { src: '/images/landing/illust-bitcoin-hand.png', width: 191, height: 260 },
  { src: '/images/landing/illust-growth-chart.png', width: 246, height: 200 },
  { src: '/images/landing/illust-bitcoin-wallet.png', width: 200, height: 185 },
  { src: '/images/landing/illust-money-bag.png', width: 263, height: 263 },
  { src: '/images/landing/illust-bar-chart.png', width: 307, height: 307 },
];

const CIRCLE_COLORS = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96E6A1', '#DDA0DD'];

export default function MarqueeContainer() {
  const marqueeText = Array(8).fill('BITCOIN');

  return (
    <section className={styles.marquee} aria-hidden="true">
      <div className={styles.track}>
        <div className={styles.slide}>
          {marqueeText.map((text, i) => (
            <span key={i} className={styles.text}>{text}</span>
          ))}
        </div>
        <div className={styles.slide}>
          {marqueeText.map((text, i) => (
            <span key={`dup-${i}`} className={styles.text}>{text}</span>
          ))}
        </div>
      </div>

      <div className={styles.circles}>
        {CIRCLE_COLORS.map((color, i) => (
          <span
            key={i}
            className={styles.circle}
            style={{ backgroundColor: color }}
          />
        ))}
      </div>

      <div className={styles.illustrations}>
        {ILLUSTRATIONS.map((img, i) => (
          <div key={i} className={styles['illust-wrap']}>
            <Image
              src={img.src}
              alt=""
              width={img.width}
              height={img.height}
              className={styles.illust}
              sizes="(max-width: 768px) 120px, 200px"
            />
          </div>
        ))}
      </div>
    </section>
  );
}
