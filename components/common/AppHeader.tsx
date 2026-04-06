'use client';

import { useState, useEffect } from 'react';
import styles from '@/assets/styles/components/common/AppHeader.module.scss';
import LanguageSwitcher from '@/components/ui/LanguageSwitcher';
import { Link } from '@/i18n/navigation';
import useAuthStore from '@/stores/useAuthStore';
import useUIStore from '@/stores/useUIStore';

interface NavItem {
  label: string;
  href: string;
}

interface HeaderData {
  logo: string;
  nav: Record<string, string>;
  language: string;
  cta: string;
  login: string;
  mypage: string;
  logout: string;
}

interface AppHeaderProps {
  data: HeaderData;
}

export default function AppHeader({ data }: AppHeaderProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { isLoggedIn, logout } = useAuthStore();
  const { openLoginModal } = useUIStore();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems: NavItem[] = Object.entries(data.nav).map(([key, label]) => ({
    label,
    href: key === 'home' ? '/' : `/${key}`,
  }));

  return (
    <header className={`${styles.header} ${scrolled ? styles['header--scrolled'] : ''}`}>
      <div className={styles.inner}>
        <Link href="/" className={styles.logo} aria-label={`${data.logo} 홈으로 이동`}>
          {data.logo}
        </Link>

        {/* 데스크톱/태블릿 네비 */}
        <nav className={styles['desktop-nav']} aria-label="메인 내비게이션">
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

        <div className={styles['right-group']}>
          <div className={styles['auth-buttons']}>
            {isLoggedIn ? (
              <button
                type="button"
                className={styles['btn-logout']}
                onClick={logout}
              >
                {data.logout}
              </button>
            ) : (
              <>
                <button
                  type="button"
                  className={styles['btn-login']}
                  onClick={openLoginModal}
                >
                  {data.login}
                </button>
                <Link href="/register" className={styles['btn-cta']}>
                  {data.cta}
                </Link>
              </>
            )}
          </div>

          <LanguageSwitcher label={data.language} />

          <button
            type="button"
            className={`${styles.hamburger} ${mobileOpen ? styles['hamburger--open'] : ''}`}
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-expanded={mobileOpen}
            aria-label="메뉴 열기/닫기"
          >
            <span className={styles['hamburger-bar']} />
            <span className={styles['hamburger-bar']} />
            <span className={styles['hamburger-bar']} />
          </button>
        </div>
      </div>

      {/* 모바일 메뉴 — header 직접 자식 (backdrop-filter 영향 없음) */}
      {mobileOpen && (
        <nav className={styles['mobile-menu']} aria-label="모바일 내비게이션">
          <ul className={styles['mobile-list']}>
            {navItems.map((item) => (
              <li key={item.href} className={styles['mobile-item']}>
                <Link
                  href={item.href}
                  className={styles['mobile-link']}
                  onClick={() => setMobileOpen(false)}
                >
                  {item.label}
                </Link>
              </li>
            ))}
            <li className={styles['mobile-item']}>
              {isLoggedIn ? (
                <button
                  type="button"
                  className={styles['mobile-link']}
                  onClick={() => { logout(); setMobileOpen(false); }}
                >
                  {data.logout}
                </button>
              ) : (
                <>
                  <button
                    type="button"
                    className={styles['mobile-link']}
                    onClick={() => { openLoginModal(); setMobileOpen(false); }}
                  >
                    {data.login}
                  </button>
                </>
              )}
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}
