import HeroContainer from '@/components/containers/landing/HeroContainer';
import StatsContainer from '@/components/containers/landing/StatsContainer';
import FeaturesContainer from '@/components/containers/landing/FeaturesContainer';
import PhilosophyContainer from '@/components/containers/landing/PhilosophyContainer';
import TestimonialsContainer from '@/components/containers/landing/TestimonialsContainer';
import FaqContainer from '@/components/containers/landing/FaqContainer';
import CtaContainer from '@/components/containers/landing/CtaContainer';

import landingMsg from '@/messages/ko/landing.json';
import landingData from '@/data/landingData.json';

export default function HomePage() {
  return (
    <>
      <HeroContainer data={landingMsg.hero} />
      <StatsContainer messages={landingMsg.stats} data={landingData.stats} />
      <FeaturesContainer messages={landingMsg.features} data={landingData.features} />
      <PhilosophyContainer messages={landingMsg.philosophy} data={landingData.philosophy} />
      <TestimonialsContainer messages={landingMsg.testimonials} data={landingData.testimonials} />
      <FaqContainer messages={landingMsg.faq} data={landingData.faq} />
      <CtaContainer data={landingMsg.cta} />
    </>
  );
}
