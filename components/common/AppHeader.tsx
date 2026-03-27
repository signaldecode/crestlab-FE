'use client';

import { useState } from 'react';
import styles from './AppHeader.module.scss';

interface NavItem {
  label: string;
  href: string;
}

interface HeaderData {
  logo: string;
  nav: Record<string, string>;
  cta: string;
  login: string;
}

interface AppHeaderProps {
  data: HeaderData;
}

export default function AppHeader({ data }: AppHeaderProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  const navItems: NavItem[] = Object.entries(data.nav).map(([key, label]) => ({
    label,
    href: key === 'home' ? '/' : `/${key}`,
  }));

  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <a href="/" className={styles.logo} aria-label={`${data.logo} 홈으로 이동`}>
          {data.logo}
        </a>

        <nav className={styles.nav} aria-label="메인 내비게이션">
          <ul className={`${styles['nav-list']} ${mobileOpen ? styles['nav-list--open'] : ''}`}>
            {navItems.map((item) => (
              <li key={item.href} className={styles['nav-item']}>
                <a href={item.href} className={styles['nav-link']}>
                  {item.label}
                </a>
              </li>
            ))}
            <li className={styles['nav-item--mobile-only']}>
              <a href="/login" className={styles['nav-link']}>{data.login}</a>
            </li>
            <li className={styles['nav-item--mobile-only']}>
              <a href="/register" className={styles['btn-cta']}>{data.cta}</a>
            </li>
          </ul>
        </nav>

        <div className={styles.actions}>
          <a href="/login" className={styles['btn-login']}>{data.login}</a>
          <a href="/register" className={styles['btn-cta']}>{data.cta}</a>
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
