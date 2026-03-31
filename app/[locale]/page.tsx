import { getTranslations } from 'next-intl/server';
import HeroContainer from '@/components/containers/landing/HeroContainer';
import PartnersContainer from '@/components/containers/landing/PartnersContainer';
import MarketShareContainer from '@/components/containers/landing/MarketShareContainer';
import PointsContainer from '@/components/containers/landing/PointsContainer';
import ProgressContainer from '@/components/containers/landing/ProgressContainer';
import PerformanceContainer from '@/components/containers/landing/PerformanceContainer';
import InvestmentTypesContainer from '@/components/containers/landing/InvestmentTypesContainer';
import PlansContainer from '@/components/containers/landing/PlansContainer';
import TrustContainer from '@/components/containers/landing/TrustContainer';
import FaqContainer from '@/components/containers/landing/FaqContainer';
import landingData from '@/data/landingData.json';

export default async function HomePage() {
  const t = await getTranslations('landing');

  const heroMsg = {
    title: t('hero.title'),
    subtitle: t('hero.subtitle'),
    cta: t('hero.cta'),
    ctaAriaLabel: t('hero.ctaAriaLabel'),
  };

  const partnersMsg = { title: t('partners.title') };
  const marketShareMsg = { title: t('marketShare.title'), badgeLabel: t('marketShare.badgeLabel') };
  const pointsMsg = { title: t('points.title') };
  const progressMsg = { title: t('progress.title'), cta: t('reviews.cta') };
  const performanceMsg = {
    title: t('performance.title'),
    subtitle: t('performance.subtitle'),
    annualReturn: t('performance.annualReturn'),
  };
  const investmentTypesMsg = { title: t('investmentTypes.title'), subtitle: t('investmentTypes.subtitle') };
  const plansMsg = { title: t('plans.title') };
  const trustMsg = { title: t('trust.title') };
  const faqMsg = { title: t('faq.title') };

  return (
    <>
      {/* ① Hero */}
      <HeroContainer data={heroMsg} landingData={landingData.hero} />
      {/* ② Partners */}
      <PartnersContainer messages={partnersMsg} data={landingData.partners} />
      {/* ③ Market Share */}
      <MarketShareContainer messages={marketShareMsg} data={landingData.marketShare} />
      {/* ④ Points */}
      <PointsContainer messages={pointsMsg} data={landingData.points} />
      {/* ⑤ Progress (includes reviews/bubbles) */}
      <ProgressContainer messages={progressMsg} data={landingData.progress} />
      {/* ⑥ Performance */}
      <PerformanceContainer messages={performanceMsg} data={landingData.performance} />
      {/* ⑦ Investment Types */}
      <InvestmentTypesContainer messages={investmentTypesMsg} data={landingData.investmentTypes} />
      {/* ⑧ Plans */}
      <PlansContainer messages={plansMsg} data={landingData.plans} />
      {/* ⑨ Trust */}
      <TrustContainer messages={trustMsg} data={landingData.trust} />
      {/* FAQ */}
      <FaqContainer messages={faqMsg} data={landingData.faq} />
    </>
  );
}
