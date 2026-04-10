import styles from '@/assets/styles/components/common/AppFooter.module.scss';

interface CompanyData {
  name: string;
  description: string;
  address: string;
  tel: string;
  email: string;
}

interface FooterMessages {
  copyright: string;
  links: {
    terms: string;
    privacy: string;
    disclaimer: string;
  };
  disclaimer: string;
}

interface AppFooterProps {
  company: CompanyData;
  messages: FooterMessages;
}

export default function AppFooter({ company, messages }: AppFooterProps) {
  const marqueeText = 'CREST LAB';
  const repeatCount = 6;

  return (
    <footer className={styles.footer}>
      {/* Section 1: Info */}
      <div className={styles.inner}>
        <div className={styles.top}>
          <div className={styles.brand}>
            <p className={styles['company-name']}>{company.name}</p>
            <p className={styles.description}>{company.description}</p>
          </div>

          <div className={styles.contact}>
            <address className={styles.address}>
              <p>{company.address}</p>
              <p>TEL: {company.tel}</p>
              <p>EMAIL: {company.email}</p>
            </address>
          </div>

          <nav className={styles.links} aria-label="법적 고지 링크">
            <a href="/terms">{messages.links.terms}</a>
            <a href="/privacy">{messages.links.privacy}</a>
            <a href="/disclaimer">{messages.links.disclaimer}</a>
          </nav>
        </div>

        <div className={styles.bottom}>
          <p className={styles['disclaimer-text']}>{messages.disclaimer}</p>
          <p className={styles['copyright-text']}>{messages.copyright}</p>
        </div>
      </div>

      {/* Section 2: Marquee */}
      <div className={styles.marquee} aria-hidden="true">
        <div className={styles['marquee-track']}>
          {Array.from({ length: repeatCount }, (_, i) => (
            <span key={i} className={styles['marquee-text']}>
              {marqueeText}
            </span>
          ))}
          {Array.from({ length: repeatCount }, (_, i) => (
            <span key={`dup-${i}`} className={styles['marquee-text']}>
              {marqueeText}
            </span>
          ))}
        </div>
      </div>
    </footer>
  );
}
