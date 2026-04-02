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
  messages: {
    ariaLabel: string;
    badge: string;
    title: string;
    description: string;
  };
}

export default function AppScreensContainer({ messages }: AppScreensContainerProps) {
  return (
    <section className={styles['app-screens']} aria-label={messages.ariaLabel}>
      <div className={styles.container}>
        <header className={styles.header}>
          <span className={styles.badge}>{messages.badge}</span>
          <h2 className={styles.title}>{messages.title}</h2>
        </header>

        <div className={styles.display}>
          <div className={styles.fan}>
            {SCREENS.map((screen, i) => (
              <div
                key={i}
                className={`${styles.phone} ${i === 2 ? styles['phone--center'] : ''} ${
                  i < 2 ? styles['phone--left'] : i > 2 ? styles['phone--right'] : ''
                }`}
              >
                <div className={styles['phone-frame']}>
                  <Image
                    src={screen.src}
                    alt=""
                    width={screen.width}
                    height={screen.height}
                    className={styles['phone-image']}
                    sizes="(max-width: 768px) 40vw, 300px"
                  />
                </div>
              </div>
            ))}
          </div>

          <div className={styles.content}>
            <p className={styles.description}>{messages.description}</p>
            
            <div className={styles.navigation}>
              <button className={styles.navButton} aria-label="Previous">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
              <button className={`${styles.navButton} ${styles['navButton--active']}`} aria-label="Next">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
