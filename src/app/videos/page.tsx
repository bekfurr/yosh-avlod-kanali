import { getLatestVideos, getPlaylistVideos, CYBERSECURITY_PLAYLIST_ID } from '@/lib/youtube';
import VideosClient from './VideosClient';

interface PageProps {
    searchParams: Promise<{ tab?: string }>;
}

export default async function VideosPage({ searchParams }: PageProps) {
    const params = await searchParams;
    const defaultTab = params.tab === 'cyber' ? 'cyber' : 'all';

    // Fetch both data sets in parallel
    const [allVideos, cyberVideos] = await Promise.all([
        getLatestVideos(50),
        getPlaylistVideos(CYBERSECURITY_PLAYLIST_ID, 50)
    ]);

    return (
        <VideosClient 
            allVideos={allVideos} 
            cyberVideos={cyberVideos} 
            defaultTab={defaultTab} 
        />
    );
}
