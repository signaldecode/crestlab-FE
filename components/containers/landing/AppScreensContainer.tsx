import Image from 'next/image';
import styles from '@/assets/styles/components/containers/landing/AppScreensContainer.module.scss';

const SCREENS = [
  { src: '/images/landing/phone-screen-1.png', width: 240, height: 467 },
  { src: '/images/landing/phone-screen-2.png', width: 240, height: 467 },
  { src: '/images/landing/phone-screen-4.png', width: 300, height: 584 },
  { src: '/images/landing/phone-screen-3.png', width: 240, height: 467 },
  { src: '/images/landing/phone-screen-1.png', width: 240, height: 467 },
];

interface AppScreensContainerProps {
  messages: { ariaLabel: string };
}

export default function AppScreensContainer({ messages }: AppScreensContainerProps) {
  return (
    <section className={styles['app-screens']} aria-label={messages.ariaLabel}>
      <div className={styles.fan}>
        {SCREENS.map((screen, i) => (
          <div
            key={i}
            className={`${styles.phone} ${i === 2 ? styles['phone--center'] : ''}`}
          >
            <Image
              src={screen.src}
              alt=""
              width={screen.width}
              height={screen.height}
              className={styles['phone-image']}
              sizes="(max-width: 768px) 40vw, 300px"
            />
          </div>
        ))}
      </div>
    </section>
  );
}
