import { getTranslations } from 'next-intl/server';
import HeroContainer from '@/components/containers/landing/HeroContainer';
// import PortfolioContainer from '@/components/containers/landing/PortfolioContainer';
// import MarqueeContainer from '@/components/containers/landing/MarqueeContainer';
import FeatureCardsContainer from '@/components/containers/landing/FeatureCardsContainer';
import PointsContainer from '@/components/containers/landing/PointsContainer';
import TrustContainer from '@/components/containers/landing/TrustContainer';
import TestimonialsContainer from '@/components/containers/landing/TestimonialsContainer';
import StakingContainer from '@/components/containers/landing/StakingContainer';
import StatsChartContainer from '@/components/containers/landing/StatsChartContainer';
import FaqContainer from '@/components/containers/landing/FaqContainer';
import CtaContainer from '@/components/containers/landing/CtaContainer';
import landingData from '@/data/landingData.json';

export default async function HomePage() {
  const t = await getTranslations('landing');

  const heroMsg = {
    headline: t('hero.headline'),
    ariaLabel: t('hero.ariaLabel'),
  };

  const featureCardsMsg = {
    title: t('featureCards.title'),
    subtitle: t('featureCards.subtitle'),
    items: [
      { title: t('featureCards.item1Title'), description: t('featureCards.item1Desc') },
      { title: t('featureCards.item2Title'), description: t('featureCards.item2Desc') },
      { title: t('featureCards.item3Title'), description: t('featureCards.item3Desc') },
    ],
  };
  const pointsMsg = { title: t('points.title'), subtitle: t('points.subtitle') };
  const trustMsg = { title: t('trust.title'), subtitle: t('trust.subtitle') };
  const testimonialsMsg = { title: t('testimonials.title') };
  const stakingMsg = {
    title: t('staking.title'),
    subtitle: t('staking.subtitle'),
    rewardLabel: t('staking.rewardLabel'),
  };
  const statsChartMsg = { title: t('statsChart.title'), subtitle: t('statsChart.subtitle') };
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
      {/* <PortfolioContainer messages={portfolioMsg} data={landingData.portfolio} /> */}
      {/* <MarqueeContainer /> */}
      <FeatureCardsContainer messages={featureCardsMsg} />
      <PointsContainer messages={pointsMsg} data={landingData.points} />
      <TrustContainer messages={trustMsg} data={landingData.trust} />
      <TestimonialsContainer messages={testimonialsMsg} data={landingData.testimonials} />
      <StakingContainer messages={stakingMsg} data={landingData.staking} />
      <StatsChartContainer messages={statsChartMsg} data={landingData.statsChart} />
      <FaqContainer messages={faqMsg} data={landingData.faq} />
      <CtaContainer data={ctaMsg} />
    </>
  );
}
