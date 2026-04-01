import { getTranslations } from 'next-intl/server';
import HeroMarqueeContainer from '@/components/containers/landing/HeroMarqueeContainer';
import ServiceCardsContainer from '@/components/containers/landing/ServiceCardsContainer';
import AppScreensContainer from '@/components/containers/landing/AppScreensContainer';
import FeatureShowcaseContainer from '@/components/containers/landing/FeatureShowcaseContainer';
import CounterContainer from '@/components/containers/landing/CounterContainer';
import TokenListContainer from '@/components/containers/landing/TokenListContainer';
import PortfolioMockupContainer from '@/components/containers/landing/PortfolioMockupContainer';
import ChatBubblesContainer from '@/components/containers/landing/ChatBubblesContainer';
import WalletCardsContainer from '@/components/containers/landing/WalletCardsContainer';
import FaqAccordionContainer from '@/components/containers/landing/FaqAccordionContainer';
import CtaContainer from '@/components/containers/landing/CtaContainer';
import landingData from '@/data/landingData.json';

export default async function HomePage() {
  const t = await getTranslations('landing');

  const heroMsg = {
    marqueeText: t('hero.marqueeText'),
    ariaLabel: t('hero.ariaLabel'),
  };

  const serviceCardsMsg = {
    title: t('serviceCards.title'),
    items: [
      { title: t('serviceCards.item1Title'), description: t('serviceCards.item1Desc') },
      { title: t('serviceCards.item2Title'), description: t('serviceCards.item2Desc') },
      { title: t('serviceCards.item3Title'), description: t('serviceCards.item3Desc') },
    ],
  };

  const appScreensMsg = { ariaLabel: t('appScreens.ariaLabel') };

  const featureShowcaseMsg = {
    title: t('featureShowcase.title'),
    items: [
      { title: t('featureShowcase.item1Title'), description: t('featureShowcase.item1Desc') },
      { title: t('featureShowcase.item2Title'), description: t('featureShowcase.item2Desc') },
      { title: t('featureShowcase.item3Title'), description: t('featureShowcase.item3Desc') },
      { title: t('featureShowcase.item4Title'), description: t('featureShowcase.item4Desc') },
    ],
  };

  const counterMsg = { title: t('counter.title'), subtitle: t('counter.subtitle') };
  const tokenListMsg = { title: t('tokenList.title'), rewardLabel: t('tokenList.rewardLabel') };

  const portfolioMsg = {
    title: t('portfolio.title'),
    subtitle: t('portfolio.subtitle'),
    categories: [
      { label: t('portfolio.cat1') },
      { label: t('portfolio.cat2') },
      { label: t('portfolio.cat3') },
      { label: t('portfolio.cat4') },
    ],
  };

  const chatMsg = { title: t('chat.title'), subtitle: t('chat.subtitle') };
  const walletMsg = { title: t('wallet.title'), subtitle: t('wallet.subtitle') };
  const faqMsg = { title: t('faq.title') };
  const ctaMsg = {
    title: t('cta.title'),
    subtitle: t('cta.subtitle'),
    button: t('cta.button'),
    buttonAriaLabel: t('cta.buttonAriaLabel'),
  };

  return (
    <>
      <HeroMarqueeContainer messages={heroMsg} />
      <ServiceCardsContainer messages={serviceCardsMsg} />
      <AppScreensContainer messages={appScreensMsg} />
      <FeatureShowcaseContainer messages={featureShowcaseMsg} />
      <CounterContainer messages={counterMsg} data={landingData.counter} />
      <TokenListContainer messages={tokenListMsg} data={landingData.tokenList} />
      <PortfolioMockupContainer messages={portfolioMsg} />
      <ChatBubblesContainer messages={chatMsg} />
      <WalletCardsContainer messages={walletMsg} />
      <FaqAccordionContainer messages={faqMsg} data={landingData.faq} />
      <CtaContainer data={ctaMsg} />
    </>
  );
}
