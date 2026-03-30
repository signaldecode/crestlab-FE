import { getMessages, getTranslations } from 'next-intl/server';
import FindIdFormContainer from '@/components/containers/auth/FindIdFormContainer';

export async function generateMetadata() {
  const t = await getTranslations('auth.findAccount.findId');
  return { title: `${t('title')} | CrestLab` };
}

export default async function FindIdPage() {
  const messages = await getMessages();
  const auth = messages.auth as Record<string, unknown>;
  const findAccount = auth.findAccount as Record<string, unknown>;
  return <FindIdFormContainer messages={findAccount.findId as never} />;
}
