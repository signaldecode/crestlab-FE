import { getTranslations } from 'next-intl/server';
import HeroContainer from '@/components/containers/landing/HeroContainer';
import StatsContainer from '@/components/containers/landing/StatsContainer';
import FeaturesContainer from '@/components/containers/landing/FeaturesContainer';
import PhilosophyContainer from '@/components/containers/landing/PhilosophyContainer';
import TestimonialsContainer from '@/components/containers/landing/TestimonialsContainer';
import FaqContainer from '@/components/containers/landing/FaqContainer';
import CtaContainer from '@/components/containers/landing/CtaContainer';
import landingData from '@/data/landingData.json';

export default async function HomePage() {
  const t = await getTranslations('landing');

  const heroMsg = {
    badge: t('hero.badge'),
    title: t('hero.title'),
    subtitle: t('hero.subtitle'),
    primaryCta: t('hero.primaryCta'),
    secondaryCta: t('hero.secondaryCta'),
    primaryCtaAriaLabel: t('hero.primaryCtaAriaLabel'),
    secondaryCtaAriaLabel: t('hero.secondaryCtaAriaLabel'),
  };

  const statsMsg = { title: t('stats.title'), subtitle: t('stats.subtitle') };
  const featuresMsg = { title: t('features.title'), subtitle: t('features.subtitle') };
  const philosophyMsg = { title: t('philosophy.title'), subtitle: t('philosophy.subtitle') };
  const testimonialsMsg = { title: t('testimonials.title') };
  const faqMsg = { title: t('faq.title'), subtitle: t('faq.subtitle') };
  const ctaMsg = {
    title: t('cta.title'),
    subtitle: t('cta.subtitle'),
    button: t('cta.button'),
    buttonAriaLabel: t('cta.buttonAriaLabel'),
  };

  return (
    <>
      <HeroContainer data={heroMsg} />
      <StatsContainer messages={statsMsg} data={landingData.stats} />
      <FeaturesContainer messages={featuresMsg} data={landingData.features} />
      <PhilosophyContainer messages={philosophyMsg} data={landingData.philosophy} />
      <TestimonialsContainer messages={testimonialsMsg} data={landingData.testimonials} />
      <FaqContainer messages={faqMsg} data={landingData.faq} />
      <CtaContainer data={ctaMsg} />
    </>
  );
}
