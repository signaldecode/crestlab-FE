import { getTranslations } from 'next-intl/server';
import HeroContainer from '@/components/containers/landing/HeroContainer';
import TickerBarContainer from '@/components/containers/landing/TickerBarContainer';
import FeaturedCarouselContainer from '@/components/containers/landing/FeaturedCarouselContainer';
import MarketTablesContainer from '@/components/containers/landing/MarketTablesContainer';
import FeatureCardsContainer, {
  type FeatureCardItem,
} from '@/components/containers/landing/FeatureCardsContainer';
import IntersectionContainer from '@/components/containers/landing/IntersectionContainer';
import DataPreviewContainer from '@/components/containers/landing/DataPreviewContainer';
import RotatingHeadlineContainer, {
  type RotatingHeadlineItem,
} from '@/components/containers/landing/RotatingHeadlineContainer';
import RollingCounterContainer from '@/components/containers/landing/RollingCounterContainer';
import NewsPreviewContainer from '@/components/containers/landing/NewsPreviewContainer';
import landingData from '@/data/landingData.json';
import stocksData from '@/data/mock/stocksData.json';
import cryptoData from '@/data/mock/cryptoData.json';
import newsData from '@/data/newsData.json';
import type { CoinItem } from '@/types/finance';

export default async function HomePage() {
  const t = await getTranslations('landing');

  const heroMsg = {
    title: t('hero.title'),
    subtitle: t('hero.subtitle'),
    cta: t('hero.cta'),
    ctaAriaLabel: t('hero.ctaAriaLabel'),
  };

  const tickerMsg = { ariaLabel: t('ticker.ariaLabel') };

  const featuredMsg = {
    title: t('featured.title'),
    subtitle: t('featured.subtitle'),
    prevAriaLabel: t('featured.prevAriaLabel'),
    nextAriaLabel: t('featured.nextAriaLabel'),
  };

  const marketTablesMsg = {
    stocksTitle: t('marketTables.stocksTitle'),
    cryptoTitle: t('marketTables.cryptoTitle'),
    headers: {
      name: t('marketTables.headers.name'),
      price: t('marketTables.headers.price'),
      change: t('marketTables.headers.change'),
      volume: t('marketTables.headers.volume'),
    },
  };

  const featureCardsMsg = {
    title: t('featureCards.title'),
    subtitle: t('featureCards.subtitle'),
  };

  const featureCardKeys = ['01', '02', '03', '04'] as const;
  const featureCardItems: FeatureCardItem[] = featureCardKeys.map((key) => ({
    index: key,
    frontTitle: t(`featureCards.items.${key}.frontTitle`),
    frontDescription: t(`featureCards.items.${key}.frontDescription`),
    backTitle: t(`featureCards.items.${key}.backTitle`),
    backDescription: t(`featureCards.items.${key}.backDescription`),
    ariaLabel: t(`featureCards.items.${key}.ariaLabel`),
  }));

  const newsPreviewMsg = {
    title: t('newsPreview.title'),
    subtitle: t('newsPreview.subtitle'),
    viewMore: t('newsPreview.viewMore'),
    prevAriaLabel: t('newsPreview.prevAriaLabel'),
    nextAriaLabel: t('newsPreview.nextAriaLabel'),
    sourceLabel: t('newsPreview.sourceLabel'),
  };

  const intersectionMsg = {
    leadingText: t('intersection.leadingText'),
    trailingText: t('intersection.trailingText'),
    imageAlt: t('intersection.imageAlt'),
  };

  const dataPreviewMsg = {
    rowCoins: {
      eyebrow: t('dataPreview.rowCoins.eyebrow'),
      title: t('dataPreview.rowCoins.title'),
      description: t('dataPreview.rowCoins.description'),
    },
    rowChart: {
      eyebrow: t('dataPreview.rowChart.eyebrow'),
      title: t('dataPreview.rowChart.title'),
      description: t('dataPreview.rowChart.description'),
    },
    barLabels: {
      btcDominance: t('dataPreview.barLabels.btcDominance'),
      sp500: t('dataPreview.barLabels.sp500'),
      btcAttractiveness: t('dataPreview.barLabels.btcAttractiveness'),
    },
    coinCardAriaLabel: t('dataPreview.coinCardAriaLabel'),
    barChartAriaLabel: t('dataPreview.barChartAriaLabel'),
  };

  const rotatingHeadlineMsg = { ariaLabel: t('rotatingHeadline.ariaLabel') };

  const rotatingHeadlineKeys = ['01', '02', '03'] as const;
  const rotatingHeadlineItems: RotatingHeadlineItem[] = rotatingHeadlineKeys.map((key) => ({
    before: t(`rotatingHeadline.items.${key}.before`),
    after: t(`rotatingHeadline.items.${key}.after`),
    icon: t(`rotatingHeadline.items.${key}.icon`) as RotatingHeadlineItem['icon'],
    iconAlt: t(`rotatingHeadline.items.${key}.iconAlt`),
  }));

  const rollingCounterTarget = 9999999;
  const rollingCounterMsg = {
    title: t('rollingCounter.title'),
    subtitle: t('rollingCounter.subtitle'),
    description: t('rollingCounter.description'),
    valueAriaLabel: t('rollingCounter.valueAriaLabel', {
      value: new Intl.NumberFormat('en-US').format(rollingCounterTarget),
    }),
  };

  const faqMsg = { title: t('faq.title') };

  const featuredItems = stocksData.stocks.map((s) => ({ symbol: s.symbol, name: s.name }));

  return (
    <>
      {/* Hero */}
      <HeroContainer data={heroMsg} landingData={landingData.hero} />
      {/* 실시간 티커 바 */}
      <TickerBarContainer data={landingData.ticker} messages={tickerMsg} />
      {/* 주목 종목 캐러셀 */}
      <FeaturedCarouselContainer messages={featuredMsg} items={featuredItems} />
      {/* US Stocks + Crypto 시세 테이블 */}
      <MarketTablesContainer
        messages={marketTablesMsg}
        stocks={stocksData.stocks}
        coins={cryptoData.coins as CoinItem[]}
      />
      {/* Intersection — sticky scroll morphs into flip cards in the same viewport */}
      <IntersectionContainer messages={intersectionMsg}>
        <FeatureCardsContainer messages={featureCardsMsg} items={featureCardItems} />
      </IntersectionContainer>
      {/* Data preview — coin card stagger reveal + bar chart count-up */}
      <DataPreviewContainer messages={dataPreviewMsg} />
      {/* Rotating headline — sticky 3D wheel of trust pillars */}
      <RotatingHeadlineContainer messages={rotatingHeadlineMsg} items={rotatingHeadlineItems} />
      {/* Rolling counter — count-up stat triggered on viewport entry */}
      <RollingCounterContainer messages={rollingCounterMsg} targetValue={rollingCounterTarget} />
      {/* 뉴스 */}
      <NewsPreviewContainer messages={newsPreviewMsg} data={newsData.items as never} />
    </>
  );
}
