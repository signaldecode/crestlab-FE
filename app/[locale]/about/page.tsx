import { getTranslations } from 'next-intl/server';
import AboutContainer from '@/components/containers/about/AboutContainer';

export async function generateMetadata() {
  const t = await getTranslations('seo.about');
  return {
    title: t('title'),
    description: t('description'),
  };
}

export default async function AboutPage() {
  const t = await getTranslations('about');

  const msg = {
    title: t('title'),
    description: t('description'),
    missionTitle: t('mission.title'),
    missionDescription: t('mission.description'),
    visionTitle: t('vision.title'),
    visionDescription: t('vision.description'),
  };

  return <AboutContainer messages={msg} />;
}
