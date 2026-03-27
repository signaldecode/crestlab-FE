import styles from './CtaContainer.module.scss';

interface CtaData {
  title: string;
  subtitle: string;
  button: string;
  buttonAriaLabel: string;
}

interface CtaContainerProps {
  data: CtaData;
}

export default function CtaContainer({ data }: CtaContainerProps) {
  return (
    <section className={styles.cta}>
      <div className={styles.inner}>
        <h2 className={styles.title}>{data.title}</h2>
        <p className={styles.subtitle}>{data.subtitle}</p>
        <a href="/contact" className={styles.button} aria-label={data.buttonAriaLabel}>
          {data.button}
        </a>
      </div>
    </section>
  );
}
