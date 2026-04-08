import { create } from 'zustand';
import type { VideoItem } from '@/types/finance';

interface EducationState {
  uploadedVideos: VideoItem[];
  addVideo: (video: VideoItem) => void;
}

const useEducationStore = create<EducationState>((set) => ({
  uploadedVideos: [],
  addVideo: (video) =>
    set((state) => ({ uploadedVideos: [video, ...state.uploadedVideos] })),
}));

export default useEducationStore;
