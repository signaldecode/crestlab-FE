import Image from 'next/image';
import styles from '@/assets/styles/components/containers/landing/DeviceShowcaseContainer.module.scss';

interface DeviceShowcaseContainerProps {
  messages: { title: string; subtitle: string };
}

export default function DeviceShowcaseContainer({ messages }: DeviceShowcaseContainerProps) {
  return (
    <section className={styles.showcase}>
      <div className={styles.header}>
        <h2 className={styles.title}>
          {messages.title.split('\n').map((line, i) => (
            <span key={i}>
              {line}
              {i < messages.title.split('\n').length - 1 && <br />}
            </span>
          ))}
        </h2>
        <p className={styles.subtitle}>
          {messages.subtitle.split('\n').map((line, i) => (
            <span key={i}>
              {line}
              {i < messages.subtitle.split('\n').length - 1 && <br />}
            </span>
          ))}
        </p>
      </div>

      <div className={styles.inner}>
        <div className={styles.tablet}>
          <Image
            src="/images/landing/tablet_mockuo.svg"
            alt=""
            fill
            className={styles['tablet-image']}
            sizes="(max-width: 768px) 90vw, 54rem"
            priority
          />
        </div>
      </div>
    </section>
  );
}
