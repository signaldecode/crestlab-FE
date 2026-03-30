'use client';

import styles from '@/assets/styles/components/ui/LanguageSwitcher.module.scss';

const LOCALES = [
  { code: 'ko', label: 'KO' },
  { code: 'en', label: 'EN' },
  { code: 'zh', label: 'ZH' },
  { code: 'ja', label: 'JA' },
] as const;

interface LanguageSwitcherProps {
  currentLocale?: string;
  ariaLabel?: string;
}

export default function LanguageSwitcher({
  currentLocale = 'ko',
  ariaLabel = '언어 선택',
}: LanguageSwitcherProps) {
  const handleChange = (locale: string) => {
    // TODO: next-intl routing integration
    console.log('switch locale:', locale);
  };

  return (
    <nav className={styles.switcher} aria-label={ariaLabel}>
      {LOCALES.map(({ code, label }) => (
        <button
          key={code}
          type="button"
          className={`${styles.button} ${currentLocale === code ? styles['button--active'] : ''}`}
          onClick={() => handleChange(code)}
          aria-current={currentLocale === code ? 'true' : undefined}
        >
          {label}
        </button>
      ))}
    </nav>
  );
}
