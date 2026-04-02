import styles from '@/assets/styles/components/containers/landing/LogoMarqueeContainer.module.scss';

interface LogoItem {
  name: string;
  icon?: string;
}

interface LogoMarqueeContainerProps {
  messages: {
    ariaLabel: string;
  };
  data: {
    logos: LogoItem[];
  };
}

export default function LogoMarqueeContainer({ messages, data }: LogoMarqueeContainerProps) {
  const logos = data.logos;
  return (
    <section className={styles.marquee} aria-label={messages.ariaLabel}>
      <div className={styles.track}>
        <div className={styles.slide}>
          {logos.map((logo, i) => (
            <span key={i} className={styles.logo}>
              {logo.icon && <span className={styles['logo-icon']}>{logo.icon}</span>}
              {logo.name}
            </span>
          ))}
        </div>
        <div className={styles.slide} aria-hidden="true">
          {logos.map((logo, i) => (
            <span key={`dup-${i}`} className={styles.logo}>
              {logo.icon && <span className={styles['logo-icon']}>{logo.icon}</span>}
              {logo.name}
            </span>
          ))}
        </div>
        <div className={styles.slide} aria-hidden="true">
          {logos.map((logo, i) => (
            <span key={`dup-${i}`} className={styles.logo}>
              {logo.icon && <span className={styles['logo-icon']}>{logo.icon}</span>}
              {logo.name}
            </span>
          ))}
        </div>  
      </div>
    </section>
  );
}
