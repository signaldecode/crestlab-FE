import { getMessages, getTranslations } from 'next-intl/server';
import RegisterFormContainer from '@/components/containers/auth/RegisterFormContainer';

export async function generateMetadata() {
  const t = await getTranslations('auth.register');
  return { title: `${t('title')} | CrestLab` };
}

export default async function RegisterPage() {
  const messages = await getMessages();
  const auth = messages.auth as Record<string, unknown>;
  return <RegisterFormContainer messages={auth.register as never} />;
}
