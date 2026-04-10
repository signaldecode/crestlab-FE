import { getLocale, getTranslations } from 'next-intl/server';
import HeroContainer from '@/components/containers/landing/HeroContainer';
import TickerBarContainer from '@/components/containers/landing/TickerBarContainer';
import FeaturedCarouselContainer from '@/components/containers/landing/FeaturedCarouselContainer';
import MarketTablesContainer from '@/components/containers/landing/MarketTablesContainer';
import FeatureCardsContainer, {
  type FeatureCardItem,
} from '@/components/containers/landing/FeatureCardsContainer';
import DigitalShowcaseContainer from '@/components/containers/landing/DigitalShowcaseContainer';
import IntersectionContainer from '@/components/containers/landing/IntersectionContainer';
import DataPreviewContainer from '@/components/containers/landing/DataPreviewContainer';
import RotatingHeadlineContainer, {
  type RotatingHeadlineItem,
} from '@/components/containers/landing/RotatingHeadlineContainer';
import RollingCounterContainer from '@/components/containers/landing/RollingCounterContainer';
import NewsPreviewContainer from '@/components/containers/landing/NewsPreviewContainer';
import landingData from '@/data/landingData.json';
import newsData from '@/data/newsData.json';
import { apiFetch } from '@/lib/api';
import type { MarketMainResponse } from '@/types/market';

export default async function HomePage() {
  const t = await getTranslations('landing');
  const locale = await getLocale();

  /* ── Fetch market data from backend ── */
  let marketData: MarketMainResponse | null = null;
  try {
    marketData = await apiFetch<MarketMainResponse>('/market/main');
  } catch {
    /* API failure — components will render with empty data */
  }

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
    changeLabel: t('featured.changeLabel'),
    prevAriaLabel: t('featured.prevAriaLabel'),
    nextAriaLabel: t('featured.nextAriaLabel'),
  };

  const marketTablesMsg = {
    stocksTitle: t('marketTables.stocksTitle'),
    cryptoTitle: t('marketTables.cryptoTitle'),
    fetchedAtLabel: t('marketTables.fetchedAtLabel', { time: '{time}' }),
    headers: {
      name: t('marketTables.headers.name'),
      price: t('marketTables.headers.price'),
      change: t('marketTables.headers.change'),
    },
  };

  const digitalShowcaseMsg = {
    title: t('digitalShowcase.title'),
    subtitle: t('digitalShowcase.subtitle'),
    imageAlt: t('digitalShowcase.imageAlt'),
  };

  const featureCardsMsg = {
    title: t('featureCards.title'),
    subtitle: t('featureCards.subtitle'),
  };

  const featureCardKeys = ['01', '02', '03', '04'] as const;
  const featureCardItems: FeatureCardItem[] = featureCardKeys.map((key, i) => ({
    index: key,
    frontTitle: t(`featureCards.items.${key}.frontTitle`),
    frontDescription: t(`featureCards.items.${key}.frontDescription`),
    frontImage: `/mainpage/intersection/card/cardfront${i + 1}.svg`,
    backImage: `/mainpage/intersection/card/cardback${i + 1}.svg`,
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
    eyebrow: t('intersection.eyebrow'),
    title: t('intersection.title'),
    description: t('intersection.description'),
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

  return (
    <>
      {/* Hero */}
      <HeroContainer data={heroMsg} landingData={landingData.hero} />
      {/* 실시간 티커 바 */}
      <TickerBarContainer
        data={marketData ? [...marketData.stocks, ...marketData.coins] : []}
        messages={tickerMsg}
      />
      {/* 주목 종목 캐러셀 */}
      <FeaturedCarouselContainer
        messages={featuredMsg}
        items={marketData ? marketData.coins : []}
      />
      {/* US Stocks + Crypto 시세 테이블 */}
      <MarketTablesContainer
        messages={marketTablesMsg}
        stocks={marketData?.stocks ?? []}
        coins={marketData?.coins ?? []}
        fetchedAt={marketData?.fetchedAt}
        locale={locale}
      />
      {/* Digital Showcase — app mockup gallery */}
      <DigitalShowcaseContainer messages={digitalShowcaseMsg} />
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
