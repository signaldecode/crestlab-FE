import type { Metadata } from 'next';
import VideoListContainer from '@/components/containers/board/VideoListContainer';
import boardMsg from '@/messages/ko/board.json';
import videosData from '@/data/videosData.json';

export const metadata: Metadata = {
  title: '투자 교육 영상 | CrestLab',
  description: 'CrestLab의 투자 교육 콘텐츠를 시청하세요.',
};

export default function VideosPage() {
  return (
    <main id="main-content">
      <VideoListContainer messages={boardMsg.videos} data={videosData} isLoggedIn={false} />
    </main>
  );
}
