import { getTranslations } from 'next-intl/server';
import HeroContainer from '@/components/containers/landing/HeroContainer';
import TickerBarContainer from '@/components/containers/landing/TickerBarContainer';
import StocksPreviewContainer from '@/components/containers/landing/StocksPreviewContainer';
import CryptoPreviewContainer from '@/components/containers/landing/CryptoPreviewContainer';
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
  const stocksPreviewMsg = { title: t('stocksPreview.title'), viewAll: t('stocksPreview.viewAll') };
  const cryptoPreviewMsg = { title: t('cryptoPreview.title'), viewAll: t('cryptoPreview.viewAll') };
  const newsPreviewMsg = { title: t('newsPreview.title'), viewAll: t('newsPreview.viewAll') };
  const faqMsg = { title: t('faq.title') };

  return (
    <>
      {/* Hero */}
      <HeroContainer data={heroMsg} landingData={landingData.hero} />
      {/* 실시간 티커 바 */}
      <TickerBarContainer data={landingData.ticker} messages={tickerMsg} />
      {/* US Stocks 프리뷰 */}
      <StocksPreviewContainer messages={stocksPreviewMsg} data={stocksData.stocks} />
      {/* Crypto 프리뷰 */}
      <CryptoPreviewContainer messages={cryptoPreviewMsg} data={cryptoData.coins} />
      {/* 뉴스 프리뷰 */}
      <NewsPreviewContainer messages={newsPreviewMsg} data={newsData.items as never} />
      {/* FAQ */}
      <FaqContainer messages={faqMsg} data={landingData.faq} />
    </>
  );
}
