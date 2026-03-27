import styles from './SectionTitle.module.scss';

interface SectionTitleProps {
  title: string;
  subtitle?: string;
  align?: 'center' | 'left';
  theme?: 'light' | 'dark';
}

export default function SectionTitle({
  title,
  subtitle,
  align = 'center',
  theme = 'light',
}: SectionTitleProps) {
  return (
    <div className={`${styles.wrap} ${styles[`wrap--${align}`]} ${styles[`wrap--${theme}`]}`}>
      <h2 className={styles.title}>{title}</h2>
      {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
    </div>
  );
}
