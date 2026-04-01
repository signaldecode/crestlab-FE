import Image from 'next/image';
import styles from '@/assets/styles/components/containers/landing/PhoneFeatureContainer.module.scss';

interface PhoneFeatureContainerProps {
  messages: {
    row1Title: string;
    row1Subtitle: string;
    row1Items: string[];
    row2Title: string;
    row2Subtitle: string;
    row2Items: string[];
  };
}

export default function PhoneFeatureContainer({ messages }: PhoneFeatureContainerProps) {
  return (
    <section className={styles['phone-feature']}>
      {/* Row 1: 좌 텍스트 + 우 폰 */}
      <div className={`${styles.row} ${styles['row-normal']}`}>
        <div className={styles['text-block']}>
          <span className={styles.icon} aria-hidden="true">🔔</span>
          <h2 className={styles.title}>
            {messages.row1Title.split('\n').map((line, i) => (
              <span key={i}>
                {line}
                {i < messages.row1Title.split('\n').length - 1 && <br />}
              </span>
            ))}
          </h2>
          <p className={styles.subtitle}>{messages.row1Subtitle}</p>
          <ul className={styles['item-list']}>
            {messages.row1Items.map((item, i) => (
              <li key={i} className={styles.item}>
                <span className={styles['item-bar']} aria-hidden="true" />
                <span className={i === 0 ? styles['item-text-accent'] : styles['item-text']}>
                  {item}
                </span>
              </li>
            ))}
          </ul>
        </div>
        <div className={styles['phone-block']}>
          <div className={styles['phone-frame']}>
            <Image
              src="/images/landing/blank-smartphone-mockup-1.png"
              alt=""
              fill
              className={styles['phone-image']}
              sizes="(max-width: 768px) 80vw, 28rem"
              priority
            />
            <div className={styles['phone-screen']}>
              <Image
                src="/images/landing/phone-screen-1.png"
                alt=""
                fill
                className={styles['screen-image']}
                sizes="(max-width: 768px) 65vw, 22rem"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Row 2: 좌 폰 + 우 텍스트 */}
      <div className={`${styles.row} ${styles['row-reverse']}`}>
        <div className={styles['phone-block']}>
          <div className={styles['phone-frame']}>
            <Image
              src="/images/landing/blank-smartphone-mockup-1.png"
              alt=""
              fill
              className={styles['phone-image']}
              sizes="(max-width: 768px) 80vw, 28rem"
              priority
            />
            <div className={styles['phone-screen']}>
              <Image
                src="/images/landing/phone-screen-1.png"
                alt=""
                fill
                className={styles['screen-image']}
                sizes="(max-width: 768px) 65vw, 22rem"
              />
            </div>
          </div>
        </div>
        <div className={styles['text-block']}>
          <span className={styles.icon} aria-hidden="true">🔔</span>
          <h2 className={styles.title}>
            {messages.row2Title.split('\n').map((line, i) => (
              <span key={i}>
                {line}
                {i < messages.row2Title.split('\n').length - 1 && <br />}
              </span>
            ))}
          </h2>
          <p className={styles.subtitle}>{messages.row2Subtitle}</p>
          <ul className={styles['item-list']}>
            {messages.row2Items.map((item, i) => (
              <li key={i} className={styles.item}>
                <span className={styles['item-bar']} aria-hidden="true" />
                <span className={i === 0 ? styles['item-text-accent'] : styles['item-text']}>
                  {item}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
