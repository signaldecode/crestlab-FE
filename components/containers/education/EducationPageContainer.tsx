'use client';

import { useMemo, useState } from 'react';
import VideoCategoryContainer from './VideoCategoryContainer';
import useEducationStore from '@/stores/useEducationStore';
import type { VideoItem, VideoCategory } from '@/types/finance';

export interface EducationCategoryMessages extends Record<VideoCategory, string> {}

export interface EducationVideosMessages {
  title: string;
  filterAll: string;
  filterAriaLabel: string;
  empty: string;
  categories: EducationCategoryMessages;
}

export interface EducationAdminMessages {
  openButton: string;
  openButtonAriaLabel: string;
  closeAriaLabel: string;
  title: string;
  subtitle: string;
  urlLabel: string;
  urlPlaceholder: string;
  categoryLabel: string;
  submit: string;
  cancel: string;
  submitting: string;
  successMessage: string;
  fetching: string;
  fetched: string;
  fetchError: string;
  errors: {
    invalidUrl: string;
    titleRequired: string;
    categoryRequired: string;
  };
}

export interface EducationMessages {
  title: string;
  subtitle: string;
  videos: EducationVideosMessages;
  admin: EducationAdminMessages;
}

interface EducationPageContainerProps {
  messages: EducationMessages;
  videosData: VideoItem[];
}

export default function EducationPageContainer({
  messages,
  videosData,
}: EducationPageContainerProps) {
  const uploadedVideos = useEducationStore((s) => s.uploadedVideos);
  const [activeCategory, setActiveCategory] = useState<VideoCategory | 'all'>('all');

  const allVideos = useMemo(
    () => [...uploadedVideos, ...videosData],
    [uploadedVideos, videosData],
  );

  return (
    <VideoCategoryContainer
      messages={messages.videos}
      adminMessages={messages.admin}
      data={allVideos}
      activeCategory={activeCategory}
      onCategoryChange={setActiveCategory}
    />
  );
}
