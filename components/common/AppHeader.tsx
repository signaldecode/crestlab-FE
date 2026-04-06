'use client';

import { useState, useEffect, useRef } from 'react';
import styles from '@/assets/styles/components/common/AppHeader.module.scss';
import LanguageSwitcher from '@/components/ui/LanguageSwitcher';
import { Link } from '@/i18n/navigation';
import useAuthStore from '@/stores/useAuthStore';
import useUIStore from '@/stores/useUIStore';

interface HeaderData {
  logo: string;
  nav: Record<string, string>;
  marketsDropdown: Record<string, string>;
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
  const [marketsOpen, setMarketsOpen] = useState(false);
  const [mobileMarketsOpen, setMobileMarketsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { isLoggedIn, logout } = useAuthStore();
  const { openLoginModal } = useUIStore();
  const dropdownRef = useRef<HTMLLIElement>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setMarketsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const dropdownItems = Object.entries(data.marketsDropdown).map(([key, label]) => ({
    label,
    href: `/${key}`,
  }));

  return (
    <header className={`${styles.header} ${scrolled ? styles['header--scrolled'] : ''}`}>
      <div className={styles.inner}>
        <Link href="/" className={styles.logo} aria-label={`${data.logo} 홈으로 이동`}>
          {data.logo}
        </Link>

        {/* 데스크톱 네비 */}
        <nav className={styles['desktop-nav']} aria-label="메인 내비게이션">
          <ul className={styles['nav-list']}>
            {Object.entries(data.nav).map(([key, label]) => {
              if (key === 'home') return null;

              if (key === 'markets') {
                return (
                  <li
                    key={key}
                    className={styles['nav-item']}
                    ref={dropdownRef}
                  >
                    <button
                      type="button"
                      className={`${styles['nav-link']} ${styles['nav-link--dropdown']}`}
                      onClick={() => setMarketsOpen(!marketsOpen)}
                      aria-expanded={marketsOpen}
                      aria-haspopup="true"
                    >
                      {label}
                      <span className={styles['dropdown-arrow']} aria-hidden="true" />
                    </button>
                    {marketsOpen && (
                      <ul className={styles['dropdown-menu']}>
                        {dropdownItems.map((item) => (
                          <li key={item.href} className={styles['dropdown-item']}>
                            <Link
                              href={item.href}
                              className={styles['dropdown-link']}
                              onClick={() => setMarketsOpen(false)}
                            >
                              {item.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    )}
                  </li>
                );
              }

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

              if (key === 'markets') {
                return (
                  <li key={key} className={styles['mobile-item']}>
                    <button
                      type="button"
                      className={`${styles['mobile-link']} ${styles['mobile-link--dropdown']}`}
                      onClick={() => setMobileMarketsOpen(!mobileMarketsOpen)}
                      aria-expanded={mobileMarketsOpen}
                    >
                      {label}
                      <span className={`${styles['dropdown-arrow']} ${mobileMarketsOpen ? styles['dropdown-arrow--open'] : ''}`} aria-hidden="true" />
                    </button>
                    {mobileMarketsOpen && (
                      <ul className={styles['mobile-sub-list']}>
                        {dropdownItems.map((item) => (
                          <li key={item.href} className={styles['mobile-sub-item']}>
                            <Link
                              href={item.href}
                              className={styles['mobile-sub-link']}
                              onClick={() => { setMobileOpen(false); setMobileMarketsOpen(false); }}
                            >
                              {item.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    )}
                  </li>
                );
              }

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
