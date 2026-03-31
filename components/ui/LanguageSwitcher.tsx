'use client';

import { useState, useRef, useEffect } from 'react';
import { useLocale } from 'next-intl';
import { useRouter, usePathname } from '@/i18n/navigation';
import styles from '@/assets/styles/components/ui/LanguageSwitcher.module.scss';

const LOCALES = [
  { code: 'ko', label: '한국어', short: 'KO' },
  { code: 'en', label: 'English', short: 'EN' },
  { code: 'zh', label: '中文', short: 'ZH' },
  { code: 'ja', label: '日本語', short: 'JA' },
] as const;

export default function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const current = LOCALES.find((l) => l.code === locale) ?? LOCALES[0];

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (nextLocale: string) => {
    setOpen(false);
    router.replace(pathname, { locale: nextLocale });
  };

  return (
    <div className={styles.switcher} ref={ref}>
      <button
        type="button"
        className={styles.trigger}
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        aria-haspopup="listbox"
        aria-label={`언어 선택: ${current.label}`}
      >
        <span className={styles['trigger-label']}>{current.short}</span>
        <svg
          className={`${styles['trigger-arrow']} ${open ? styles['trigger-arrow--open'] : ''}`}
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          aria-hidden="true"
        >
          <path
            d="M4 6L8 10L12 6"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      {open && (
        <ul className={styles.dropdown} role="listbox" aria-label="언어 선택">
          {LOCALES.map(({ code, label, short }) => (
            <li key={code} role="option" aria-selected={locale === code}>
              <button
                type="button"
                className={`${styles['dropdown-item']} ${locale === code ? styles['dropdown-item--active'] : ''}`}
                onClick={() => handleSelect(code)}
              >
                <span className={styles['dropdown-short']}>{short}</span>
                <span className={styles['dropdown-label']}>{label}</span>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
