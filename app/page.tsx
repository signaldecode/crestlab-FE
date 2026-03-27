import SkipToContent from '@/components/common/SkipToContent';
import AppHeader from '@/components/common/AppHeader';
import AppFooter from '@/components/common/AppFooter';
import HeroContainer from '@/components/containers/landing/HeroContainer';
import StatsContainer from '@/components/containers/landing/StatsContainer';
import FeaturesContainer from '@/components/containers/landing/FeaturesContainer';
import PhilosophyContainer from '@/components/containers/landing/PhilosophyContainer';
import TestimonialsContainer from '@/components/containers/landing/TestimonialsContainer';
import FaqContainer from '@/components/containers/landing/FaqContainer';
import CtaContainer from '@/components/containers/landing/CtaContainer';

import commonData from '@/messages/ko/common.json';
import landingData from '@/messages/ko/landing.json';

export default function HomePage() {
  return (
    <>
      <SkipToContent label={commonData.skipToContent} />
      <AppHeader data={commonData.header} />

      <main id="main-content">
        <HeroContainer data={landingData.hero} />
        <StatsContainer data={landingData.stats} />
        <FeaturesContainer data={landingData.features} />
        <PhilosophyContainer data={landingData.philosophy} />
        <TestimonialsContainer data={landingData.testimonials} />
        <FaqContainer data={landingData.faq} />
        <CtaContainer data={landingData.cta} />
      </main>

      <AppFooter data={commonData.footer} />
    </>
  );
}
