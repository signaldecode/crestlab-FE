'use client';

import { useState, useEffect } from 'react';
import styles from '@/assets/styles/components/common/AppHeader.module.scss';
import LanguageSwitcher from '@/components/ui/LanguageSwitcher';
import useUIStore from '@/stores/useUIStore';
import useAuthStore from '@/stores/useAuthStore';
import { Link } from '@/i18n/navigation';

interface NavItem {
  label: string;
  href: string;
}

interface HeaderData {
  logo: string;
  nav: Record<string, string>;
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
  const openLoginModal = useUIStore((s) => s.openLoginModal);
  const { isLoggedIn, logout } = useAuthStore();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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

  return (
    <header className={`${styles.header} ${scrolled ? styles['header--scrolled'] : ''}`}>
      <div className={styles.inner}>
        <Link href="/" className={styles.logo} aria-label={`${data.logo} 홈으로 이동`}>
          {data.logo}
        </Link>

        <nav className={styles.nav} aria-label="메인 내비게이션">
          <ul className={`${styles['nav-list']} ${mobileOpen ? styles['nav-list--open'] : ''}`}>
            <li className={styles['nav-item--mobile-only']}>
              <LanguageSwitcher />
            </li>
            {navItems.map((item) => (
              <li key={item.href} className={styles['nav-item']}>
                <Link href={item.href} className={styles['nav-link']}>
                  {item.label}
                </Link>
              </li>
            ))}

            {isLoggedIn ? (
              <>
                <li className={styles['nav-item--mobile-only']}>
                  <Link href="/mypage" className={styles['nav-link']}>{data.mypage}</Link>
                </li>
                <li className={styles['nav-item--mobile-only']}>
                  <button type="button" className={styles['nav-link']} onClick={handleLogout}>
                    {data.logout}
                  </button>
                </li>
              </>
            ) : (
              <>
                <li className={styles['nav-item--mobile-only']}>
                  <button type="button" className={styles['nav-link']} onClick={handleLoginClick}>
                    {data.login}
                  </button>
                </li>
                <li className={styles['nav-item--mobile-only']}>
                  <Link href="/register" className={styles['btn-cta']}>{data.cta}</Link>
                </li>
              </>
            )}
          </ul>
        </nav>

        <div className={styles.right}>
          <div className={styles['desktop-lang']}>
            <LanguageSwitcher />
          </div>

          <div className={styles.actions}>
            {isLoggedIn ? (
              <>
                <Link href="/mypage" className={styles['btn-login']}>{data.mypage}</Link>
                <button type="button" className={styles['btn-cta']} onClick={handleLogout}>
                  {data.logout}
                </button>
              </>
            ) : (
              <>
                <button type="button" className={styles['btn-login']} onClick={openLoginModal}>
                  {data.login}
                </button>
                <Link href="/register" className={styles['btn-cta']}>{data.cta}</Link>
              </>
            )}
          </div>
        </div>

        <button
          type="button"
          className={styles['hamburger']}
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
  );
}
