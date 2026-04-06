import { getTranslations } from 'next-intl/server';
import DisclaimerContainer from '@/components/containers/about/DisclaimerContainer';

export async function generateMetadata() {
  const t = await getTranslations('seo.disclaimer');
  return {
    title: t('title'),
    description: t('description'),
  };
}

export default async function DisclaimerPage() {
  const t = await getTranslations('disclaimer');

  const msg = {
    title: t('title'),
    content: t('content'),
    registrationTitle: t('registrationTitle'),
    registrationNumber: t('registrationNumber'),
  };

  return <DisclaimerContainer messages={msg} />;
}
