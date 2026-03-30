import { notFound } from 'next/navigation';
import { getMessages } from 'next-intl/server';
import { NextIntlClientProvider } from 'next-intl';
import { routing } from '@/i18n/routing';
import SkipToContent from '@/components/common/SkipToContent';
import AppHeader from '@/components/common/AppHeader';
import AppFooter from '@/components/common/AppFooter';
import LoginModal from '@/components/common/LoginModal';
import commonData from '@/data/commonData.json';

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as 'ko' | 'en' | 'zh' | 'ja')) {
    notFound();
  }

  const messages = await getMessages();
  const common = messages.common as Record<string, unknown>;
  const auth = messages.auth as Record<string, unknown>;
  const header = common.header as Record<string, unknown>;
  const footer = common.footer as Record<string, unknown>;
  const login = auth.login as Record<string, unknown>;
  const loginModal = auth.loginModal as Record<string, string>;

  return (
    <NextIntlClientProvider messages={messages} locale={locale}>
      <SkipToContent label={common.skipToContent as string} />
      <AppHeader data={header as never} />
      <main id="main-content">{children}</main>
      <AppFooter company={commonData.company} messages={footer as never} />
      <LoginModal messages={login as never} closeAriaLabel={loginModal.closeAriaLabel} />
    </NextIntlClientProvider>
  );
}
