import styles from '@/assets/styles/components/common/SkipToContent.module.scss';

interface SkipToContentProps {
  label: string;
}

export default function SkipToContent({ label }: SkipToContentProps) {
  return (
    <a href="#main-content" className={styles['skip-link']}>
      {label}
    </a>
  );
}
