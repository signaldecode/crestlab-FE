import { getMessages, getTranslations } from 'next-intl/server';
import LoginFormContainer from '@/components/containers/auth/LoginFormContainer';

export async function generateMetadata() {
  const t = await getTranslations('auth.login');
  return { title: `${t('title')} | CrestLab` };
}

export default async function LoginPage() {
  const messages = await getMessages();
  const auth = messages.auth as Record<string, unknown>;
  return <LoginFormContainer messages={auth.login as never} />;
}
