import { getLatestVideos, getPlaylistVideos, CYBERSECURITY_PLAYLIST_ID } from '@/lib/youtube';
import HomeClient from './HomeClient';

export default async function Home() {
  const [latestVideos, cyberVideos] = await Promise.all([
    getLatestVideos(3),
    getPlaylistVideos(CYBERSECURITY_PLAYLIST_ID, 3)
  ]);

  return (
    <HomeClient
      latestVideos={latestVideos}
      cyberVideos={cyberVideos}
    />
  );
}
