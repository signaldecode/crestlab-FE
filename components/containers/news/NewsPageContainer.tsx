'use client';

import NewsFeedContainer from './NewsFeedContainer';
import type { NewsItem } from '@/types/finance';

export interface NewsCategoryMessages {
  stocks: string;
  crypto: string;
  macro: string;
}

export interface NewsSearchMessages {
  label: string;
  placeholder: string;
  ariaLabel: string;
  clear: string;
  noResults: string;
}

export interface NewsMessages {
  title: string;
  subtitle: string;
  filterAll: string;
  filterAriaLabel: string;
  categories: NewsCategoryMessages;
  search: NewsSearchMessages;
  empty: string;
  loadMore: string;
  autoUpdate: string;
}

interface NewsPageContainerProps {
  messages: NewsMessages;
  newsData: NewsItem[];
}

export default function NewsPageContainer({ messages, newsData }: NewsPageContainerProps) {
  return <NewsFeedContainer messages={messages} data={newsData} />;
}
