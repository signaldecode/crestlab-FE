'use client';

import { useState, useRef, useEffect } from 'react';
import { useLocale } from 'next-intl';
import { useRouter, usePathname } from '@/i18n/navigation';
import styles from '@/assets/styles/components/ui/LanguageSwitcher.module.scss';

const LOCALES = [
  { code: 'en', label: 'EN', name: 'English' },
  { code: 'ko', label: 'KO', name: '한국어' },
  { code: 'zh', label: 'ZH', name: '中文' },
  { code: 'ja', label: 'JA', name: '日本語' },
] as const;

interface LanguageSwitcherProps {
  label: string;
}

export default function LanguageSwitcher({ label }: LanguageSwitcherProps) {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const handleChange = (nextLocale: string) => {
    router.replace(pathname, { locale: nextLocale });
    setOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className={styles.switcher} ref={wrapperRef}>
      <button
        type="button"
        className={styles.trigger}
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        aria-haspopup="listbox"
        aria-label={label}
      >
        <span className={styles['trigger-label']}>{label}</span>
        <svg
          className={`${styles.chevron} ${open ? styles['chevron--open'] : ''}`}
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          aria-hidden="true"
        >
          <path d="M4 6L8 10L12 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      {open && (
        <ul className={styles.dropdown} role="listbox" aria-label={label}>
          {LOCALES.map(({ code, label: localeLabel, name }) => (
            <li key={code} role="option" aria-selected={locale === code}>
              <button
                type="button"
                className={`${styles['dropdown-item']} ${locale === code ? styles['dropdown-item--active'] : ''}`}
                onClick={() => handleChange(code)}
              >
                <span className={styles['dropdown-code']}>{localeLabel}</span>
                <span className={styles['dropdown-name']}>{name}</span>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
