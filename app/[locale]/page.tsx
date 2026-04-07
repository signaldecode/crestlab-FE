import { getTranslations } from 'next-intl/server';
import HeroContainer from '@/components/containers/landing/HeroContainer';
import TickerBarContainer from '@/components/containers/landing/TickerBarContainer';
import FeaturedCarouselContainer from '@/components/containers/landing/FeaturedCarouselContainer';
import MarketTablesContainer from '@/components/containers/landing/MarketTablesContainer';
import NewsPreviewContainer from '@/components/containers/landing/NewsPreviewContainer';
import FaqContainer from '@/components/containers/landing/FaqContainer';
import landingData from '@/data/landingData.json';
import stocksData from '@/data/mock/stocksData.json';
import cryptoData from '@/data/mock/cryptoData.json';
import newsData from '@/data/newsData.json';

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

  const newsPreviewMsg = {
    title: t('newsPreview.title'),
    subtitle: t('newsPreview.subtitle'),
    tabs: {
      all: t('newsPreview.tabs.all'),
      stocks: t('newsPreview.tabs.stocks'),
      crypto: t('newsPreview.tabs.crypto'),
    },
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
        coins={cryptoData.coins}
      />
      {/* 뉴스 */}
      <NewsPreviewContainer messages={newsPreviewMsg} data={newsData.items as never} />
      {/* FAQ */}
      <FaqContainer messages={faqMsg} data={landingData.faq} />
    </>
  );
}
