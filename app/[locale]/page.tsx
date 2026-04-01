import { getTranslations } from 'next-intl/server';
import HeroContainer from '@/components/containers/landing/HeroContainer';
// import PortfolioContainer from '@/components/containers/landing/PortfolioContainer';
// import MarqueeContainer from '@/components/containers/landing/MarqueeContainer';
import FeatureCardsContainer from '@/components/containers/landing/FeatureCardsContainer';
import PointsContainer from '@/components/containers/landing/PointsContainer';
import SignalContainer from '@/components/containers/landing/SignalContainer';
import PillMarqueeContainer from '@/components/containers/landing/PillMarqueeContainer';
import DeviceShowcaseContainer from '@/components/containers/landing/DeviceShowcaseContainer';
import TestimonialsContainer from '@/components/containers/landing/TestimonialsContainer';
import PhoneFeatureContainer from '@/components/containers/landing/PhoneFeatureContainer';
import ChartCardsContainer from '@/components/containers/landing/ChartCardsContainer';
// import StakingContainer from '@/components/containers/landing/StakingContainer';
// import StatsChartContainer from '@/components/containers/landing/StatsChartContainer';
import FaqContainer from '@/components/containers/landing/FaqContainer';
// import CtaContainer from '@/components/containers/landing/CtaContainer';
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
  const signalMsg = {
    title: t('signal.title'),
    marquee: t('signal.marquee'),
    rewardLabel: t('signal.rewardLabel'),
    prevAriaLabel: t('signal.prevAriaLabel'),
    nextAriaLabel: t('signal.nextAriaLabel'),
  };
  const showcaseMsg = { title: t('showcase.title'), subtitle: t('showcase.subtitle') };
  const testimonialsMsg = { title: t('testimonials.title') };
  const chartCardsMsg = {
    title: t('chartCards.title'),
    subtitle: t('chartCards.subtitle'),
    cards: [
      { title: t('chartCards.card1Title'), description: t('chartCards.card1Desc') },
      { title: t('chartCards.card2Title'), description: t('chartCards.card2Desc') },
      { title: t('chartCards.card3Title'), description: t('chartCards.card3Desc') },
    ],
  };
  const phoneFeatureMsg = {
    row1Title: t('phoneFeature.row1Title'),
    row1Subtitle: t('phoneFeature.row1Subtitle'),
    row1Items: [t('phoneFeature.row1Item1'), t('phoneFeature.row1Item2'), t('phoneFeature.row1Item3')],
    row2Title: t('phoneFeature.row2Title'),
    row2Subtitle: t('phoneFeature.row2Subtitle'),
    row2Items: [t('phoneFeature.row2Item1'), t('phoneFeature.row2Item2'), t('phoneFeature.row2Item3')],
  };
  // const stakingMsg = {
  //   title: t('staking.title'),
  //   subtitle: t('staking.subtitle'),
  //   rewardLabel: t('staking.rewardLabel'),
  // };
  // const statsChartMsg = { title: t('statsChart.title'), subtitle: t('statsChart.subtitle') };
  const faqMsg = { caption: t('faq.caption'), title: t('faq.title'), subtitle: t('faq.subtitle') };
  // const ctaMsg = {
  //   title: t('cta.title'),
  //   subtitle: t('cta.subtitle'),
  //   button: t('cta.button'),
  //   buttonAriaLabel: t('cta.buttonAriaLabel'),
  // };

  return (
    <>
      <HeroContainer data={heroMsg} />
      {/* <PortfolioContainer messages={portfolioMsg} data={landingData.portfolio} /> */}
      {/* <MarqueeContainer /> */}
      <FeatureCardsContainer messages={featureCardsMsg} />
      <PointsContainer messages={pointsMsg} data={landingData.points} />
      <SignalContainer messages={signalMsg} data={landingData.signal} />
      <PillMarqueeContainer data={landingData.pillMarquee} />
      <DeviceShowcaseContainer messages={showcaseMsg} />
      <TestimonialsContainer messages={testimonialsMsg} data={landingData.testimonials} />
      <PhoneFeatureContainer messages={phoneFeatureMsg} />
      <ChartCardsContainer messages={chartCardsMsg} data={landingData.chartCards as { items: { type: 'pie' | 'bar' | 'line'; data: { name: string; value: number }[] }[] }} />
      {/* <StakingContainer messages={stakingMsg} data={landingData.staking} /> */}
      {/* <StatsChartContainer messages={statsChartMsg} data={landingData.statsChart} /> */}
      <FaqContainer messages={faqMsg} data={landingData.faq} />
      {/* <CtaContainer data={ctaMsg} /> */}
    </>
  );
}
