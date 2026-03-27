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

// messages: UI 라벨, 버튼 텍스트, 번역 대상
import commonMsg from '@/messages/ko/common.json';
import landingMsg from '@/messages/ko/landing.json';

// data: 콘텐츠 데이터 (통계, 피쳐, 후기, FAQ 등)
import commonData from '@/data/commonData.json';
import landingData from '@/data/landingData.json';

export default function HomePage() {
  return (
    <>
      <SkipToContent label={commonMsg.skipToContent} />
      <AppHeader data={commonMsg.header} />

      <main id="main-content">
        <HeroContainer data={landingMsg.hero} />
        <StatsContainer messages={landingMsg.stats} data={landingData.stats} />
        <FeaturesContainer messages={landingMsg.features} data={landingData.features} />
        <PhilosophyContainer messages={landingMsg.philosophy} data={landingData.philosophy} />
        <TestimonialsContainer messages={landingMsg.testimonials} data={landingData.testimonials} />
        <FaqContainer messages={landingMsg.faq} data={landingData.faq} />
        <CtaContainer data={landingMsg.cta} />
      </main>

      <AppFooter company={commonData.company} messages={commonMsg.footer} />
    </>
  );
}
