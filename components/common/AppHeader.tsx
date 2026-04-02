'use client';

import { useState, useEffect } from 'react';
import styles from '@/assets/styles/components/common/AppHeader.module.scss';
import useUIStore from '@/stores/useUIStore';
import useAuthStore from '@/stores/useAuthStore';
import { Link } from '@/i18n/navigation';
import { useLocale } from 'next-intl';
import { useRouter, usePathname } from '@/i18n/navigation';

interface NavItem {
  label: string;
  href: string;
}

interface HeaderData {
  logo: string;
  nav: Record<string, string>;
  lang: string;
  cta: string;
  login: string;
  mypage?: string;
  logout?: string;
}

interface AppHeaderProps {
  data: HeaderData;
}

const LOCALES = [
  { code: 'ko', label: '한국어' },
  { code: 'en', label: 'English' },
  { code: 'zh', label: '中文' },
  { code: 'ja', label: '日本語' },
] as const;

export default function AppHeader({ data }: AppHeaderProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const openLoginModal = useUIStore((s) => s.openLoginModal);
  const { isLoggedIn, logout } = useAuthStore();
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 0);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  useEffect(() => {
    if (!langOpen) return;

    const handleClickOutside = () => setLangOpen(false);
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [langOpen]);

  const navItems: NavItem[] = Object.entries(data.nav).map(([key, label]) => ({
    label,
    href: key === 'home' ? '/' : `/${key}`,
  }));

  const handleLoginClick = () => {
    setMobileOpen(false);
    openLoginModal();
  };

  const handleLogout = () => {
    setMobileOpen(false);
    logout();
  };

  const handleLocaleChange = (nextLocale: string) => {
    setLangOpen(false);
    setMobileOpen(false);
    router.replace(pathname, { locale: nextLocale });
  };

  const headerClass = `${styles.header} ${scrolled ? styles['header--scrolled'] : ''} ${mobileOpen ? styles['header--mobile-open'] : ''}`;

  return (
    <>
      <header className={headerClass}>
        <div className={styles.inner}>
          <div className={styles['left-group']}>
            <Link href="/" className={styles.logo} aria-label={`${data.logo} 홈으로 이동`}>
              {data.logo}
            </Link>

            {/* Desktop nav — inside header */}
            <nav className={styles['nav-desktop']} aria-label="메인 내비게이션">
              <ul className={styles['nav-list']}>
                {navItems.map((item) => (
                  <li key={item.href} className={styles['nav-item']}>
                    <Link href={item.href} className={styles['nav-link']}>
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          <div className={styles['right-group']}>
            <div className={styles['auth-group']}>
              {isLoggedIn ? (
                <>
                  <Link href="/mypage" className={styles['auth-link']}>
                    {data.mypage}
                  </Link>
                  <button type="button" className={styles['auth-link']} onClick={handleLogout}>
                    {data.logout}
                  </button>
                </>
              ) : (
                <>
                  <button type="button" className={styles['auth-link']} onClick={handleLoginClick}>
                    {data.login}
                  </button>
                  <Link href="/register" className={styles['auth-button']}>
                    {data.cta}
                  </Link>
                </>
              )}
            </div>

            <div className={styles['lang-dropdown']}>
              <button
                type="button"
                className={styles['lang-trigger']}
                onClick={(e) => {
                  e.stopPropagation();
                  setLangOpen(!langOpen);
                }}
                aria-expanded={langOpen}
                aria-haspopup="listbox"
              >
                <span>{data.lang}</span>
                <svg
                  className={`${styles['lang-arrow']} ${langOpen ? styles['lang-arrow--open'] : ''}`}
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

              {langOpen && (
                <ul className={styles['lang-menu']} role="listbox" aria-label="언어 선택">
                  {LOCALES.map(({ code, label }) => (
                    <li key={code} role="option" aria-selected={locale === code}>
                      <button
                        type="button"
                        className={`${styles['lang-option']} ${locale === code ? styles['lang-option--active'] : ''}`}
                        onClick={() => handleLocaleChange(code)}
                      >
                        {label}
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>

          <button
            type="button"
            className={`${styles.hamburger} ${mobileOpen ? styles['hamburger--active'] : ''}`}
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-expanded={mobileOpen}
            aria-label="메뉴 열기/닫기"
          >
            <span className={styles['hamburger-bar']} />
            <span className={styles['hamburger-bar']} />
            <span className={styles['hamburger-bar']} />
          </button>
        </div>
      </header>

      {/* Mobile nav — outside header to avoid backdrop-filter containing block */}
      {mobileOpen && (
        <>
          <div
            className={styles.backdrop}
            onClick={() => setMobileOpen(false)}
            aria-hidden="true"
          />
          <nav className={styles['mobile-nav']} aria-label="모바일 내비게이션">
            <ul className={styles['mobile-nav-list']}>
              {navItems.map((item, index) => (
                <li
                  key={item.href}
                  className={styles['nav-item']}
                  style={{ animationDelay: `${index * 0.05}s` }}
                >
                  <Link
                    href={item.href}
                    className={styles['mobile-nav-link']}
                    onClick={() => setMobileOpen(false)}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}

              <li className={styles['nav-divider']} aria-hidden="true" />

              <li>
                {isLoggedIn ? (
                  <>
                    <Link
                      href="/mypage"
                      className={styles['mobile-nav-link']}
                      onClick={() => setMobileOpen(false)}
                    >
                      {data.mypage}
                    </Link>
                    <button type="button" className={styles['mobile-nav-link']} onClick={handleLogout}>
                      {data.logout}
                    </button>
                  </>
                ) : (
                  <>
                    <button type="button" className={styles['mobile-nav-link']} onClick={handleLoginClick}>
                      {data.login}
                    </button>
                    <Link
                      href="/register"
                      className={styles['mobile-cta']}
                      onClick={() => setMobileOpen(false)}
                    >
                      {data.cta}
                    </Link>
                  </>
                )}
              </li>

              <li>
                <div className={styles['mobile-lang']}>
                  {LOCALES.map(({ code, label }) => (
                    <button
                      key={code}
                      type="button"
                      className={`${styles['mobile-lang-option']} ${locale === code ? styles['mobile-lang-option--active'] : ''}`}
                      onClick={() => handleLocaleChange(code)}
                    >
                      {label}
                    </button>
                  ))}
                </div>
              </li>
            </ul>
          </nav>
        </>
      )}
    </>
  );
}
