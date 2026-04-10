import { getTranslations } from 'next-intl/server';
import AboutPageContainer from '@/components/containers/about/AboutPageContainer';

export async function generateMetadata() {
  const t = await getTranslations('seo.about');
  return {
    title: t('title'),
    description: t('description'),
  };
}

export default async function AboutPage() {
  const tAbout = await getTranslations('about');
  const tDisclaimer = await getTranslations('disclaimer');

  const messages = {
    tabs: {
      about: tAbout('tabLabel'),
      disclaimer: tDisclaimer('tabLabel'),
    },
    about: {
      title: tAbout('title'),
      description: tAbout('description'),
      missionTitle: tAbout('mission.title'),
      missionDescription: tAbout('mission.description'),
      visionTitle: tAbout('vision.title'),
      visionDescription: tAbout('vision.description'),
    },
    disclaimer: {
      title: tDisclaimer('title'),
      content: tDisclaimer('content'),
      registrationTitle: tDisclaimer('registrationTitle'),
      registrationNumber: tDisclaimer('registrationNumber'),
    },
  };

  return <AboutPageContainer messages={messages} />;
}
