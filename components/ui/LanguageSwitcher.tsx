'use client';

import { useLocale } from 'next-intl';
import { useRouter, usePathname } from '@/i18n/navigation';
import styles from '@/assets/styles/components/ui/LanguageSwitcher.module.scss';

const LOCALES = [
  { code: 'ko', label: 'KO' },
  { code: 'en', label: 'EN' },
  { code: 'zh', label: 'ZH' },
  { code: 'ja', label: 'JA' },
] as const;

export default function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const handleChange = (nextLocale: string) => {
    router.replace(pathname, { locale: nextLocale });
  };

  return (
    <nav className={styles.switcher} aria-label="Language">
      {LOCALES.map(({ code, label }) => (
        <button
          key={code}
          type="button"
          className={`${styles.button} ${locale === code ? styles['button--active'] : ''}`}
          onClick={() => handleChange(code)}
          aria-current={locale === code ? 'true' : undefined}
        >
          {label}
        </button>
      ))}
    </nav>
  );
}
