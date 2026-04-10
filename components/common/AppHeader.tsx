'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import styles from '@/assets/styles/components/common/AppHeader.module.scss';
import LanguageSwitcher from '@/components/ui/LanguageSwitcher';
import { Link, usePathname } from '@/i18n/navigation';
import useAuthStore from '@/stores/useAuthStore';
import useUIStore from '@/stores/useUIStore';

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
  const pathname = usePathname();
  const isHome = pathname === '/';

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`${styles.header} ${isHome ? '' : styles['header--sticky']} ${scrolled ? styles['header--scrolled'] : ''}`}>
      <div className={styles.inner}>
        <Link href="/" className={styles.logo} aria-label={`${data.logo} 홈으로 이동`}>
          <Image
            src="/logo-mark.svg"
            alt=""
            width={28}
            height={28}
            className={styles['logo-mark']}
            priority
          />
          <span className={styles['logo-wordmark']}>
            Crest<span className={styles['logo-wordmark-accent']}>Lab</span>
          </span>
        </Link>

        {/* 데스크톱 네비 */}
        <nav className={styles['desktop-nav']} aria-label="메인 내비게이션">
          <ul className={styles['nav-list']}>
            {Object.entries(data.nav).map(([key, label]) => {
              if (key === 'home') return null;
              return (
                <li key={key} className={styles['nav-item']}>
                  <Link href={`/${key}`} className={styles['nav-link']}>
                    {label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className={styles['right-group']}>
          <div className={styles['auth-buttons']}>
            {isLoggedIn ? (
              <button type="button" className={styles['btn-logout']} onClick={logout}>
                {data.logout}
              </button>
            ) : (
              <>
                <button type="button" className={styles['btn-login']} onClick={openLoginModal}>
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

      {/* 모바일 메뉴 */}
      {mobileOpen && (
        <nav className={styles['mobile-menu']} aria-label="모바일 내비게이션">
          <ul className={styles['mobile-list']}>
            {Object.entries(data.nav).map(([key, label]) => {
              if (key === 'home') return null;
              return (
                <li key={key} className={styles['mobile-item']}>
                  <Link
                    href={`/${key}`}
                    className={styles['mobile-link']}
                    onClick={() => setMobileOpen(false)}
                  >
                    {label}
                  </Link>
                </li>
              );
            })}
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
                <button
                  type="button"
                  className={styles['mobile-link']}
                  onClick={() => { openLoginModal(); setMobileOpen(false); }}
                >
                  {data.login}
                </button>
              )}
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}
