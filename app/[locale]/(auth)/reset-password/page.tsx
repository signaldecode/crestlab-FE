import { getMessages, getTranslations } from 'next-intl/server';
import ResetPasswordFormContainer from '@/components/containers/auth/ResetPasswordFormContainer';

export async function generateMetadata() {
  const t = await getTranslations('auth.findAccount.resetPassword');
  return { title: `${t('title')} | CrestLab` };
}

export default async function ResetPasswordPage() {
  const messages = await getMessages();
  const auth = messages.auth as Record<string, unknown>;
  const findAccount = auth.findAccount as Record<string, unknown>;
  return <ResetPasswordFormContainer messages={findAccount.resetPassword as never} />;
}
