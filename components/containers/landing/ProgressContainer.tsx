import Image from 'next/image';
import styles from '@/assets/styles/components/containers/landing/ProgressContainer.module.scss';

interface ProgressData {
  heartIcon: string;
  bellIcon: string;
  phoneMockup: string;
}

interface ProgressContainerProps {
  messages: { title: string; cta: string };
  data: ProgressData;
}

function renderTitleWithHighlight(text: string, accentClass: string) {
  const lines = text.split('\n');
  return lines.map((line, i) => {
    const highlights = ['크래스트랩', 'CrestLab'];
    let parts: (string | { text: string; highlight: true })[] = [line];

    for (const keyword of highlights) {
      const newParts: typeof parts = [];
      for (const part of parts) {
        if (typeof part === 'string' && part.includes(keyword)) {
          const segments = part.split(keyword);
          segments.forEach((seg, j) => {
            if (seg) newParts.push(seg);
            if (j < segments.length - 1) newParts.push({ text: keyword, highlight: true });
          });
        } else {
          newParts.push(part);
        }
      }
      parts = newParts;
    }

    return (
      <span key={i}>
        {parts.map((part, j) =>
          typeof part === 'string' ? (
            part
          ) : (
            <span key={j} className={accentClass}>
              {part.text}
            </span>
          )
        )}
        {i < lines.length - 1 && <br />}
      </span>
    );
  });
}

export default function ProgressContainer({ messages, data }: ProgressContainerProps) {
  return (
    <section className={styles.progress}>
      <div className={styles.inner}>
        {/* Header: title + decorative icons */}
        <div className={styles.header}>
          <div className={styles['deco-heart']} aria-hidden="true">
            <Image src={data.heartIcon} alt="" fill className={styles['deco-img']} />
          </div>

          <h2 className={styles.title}>
            {renderTitleWithHighlight(messages.title, styles['title-accent'])}
          </h2>

          <div className={styles['deco-bell']} aria-hidden="true">
            <Image src={data.bellIcon} alt="" fill className={styles['deco-img']} />
          </div>
        </div>

        {/* Phone mockup with chat bubbles */}
        <div className={styles.showcase}>
          {/* White bubble — left */}
          <div className={`${styles.bubble} ${styles['bubble--white']}`}>
            <span className={styles['bubble-text']}>{messages.cta}</span>
          </div>

          {/* Blue bubble — right top */}
          <div className={`${styles.bubble} ${styles['bubble--blue']} ${styles['bubble--right-top']}`}>
            <span className={styles['bubble-text']}>{messages.cta}</span>
          </div>

          {/* Phone */}
          <div className={styles['phone-wrap']}>
            <Image
              src={data.phoneMockup}
              alt=""
              width={320}
              height={640}
              className={styles['phone-img']}
              aria-hidden="true"
            />
          </div>

          {/* Blue bubble — right bottom */}
          <div className={`${styles.bubble} ${styles['bubble--blue']} ${styles['bubble--right-bottom']}`}>
            <span className={styles['bubble-text']}>{messages.cta}</span>
          </div>

          {/* Logo text */}
          <p className={styles['logo-text']} aria-hidden="true">LOGO NAME</p>
        </div>
      </div>
    </section>
  );
}
