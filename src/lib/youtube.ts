const API_KEY = process.env.NEXT_PUBLIC_YOUTUBE_API_KEY;
const CHANNEL_ID = process.env.NEXT_PUBLIC_YOUTUBE_CHANNEL_ID;
const BASE_URL = 'https://www.googleapis.com/youtube/v3';

export interface YouTubeVideo {
    id: string;
    title: string;
    thumbnail: string;
    publishedAt: string;
    viewCount?: string; // Not always available in all endpoints
}

export interface YouTubeStats {
    subscriberCount: string;
    viewCount: string;
    videoCount: string;
}

export async function getChannelStats(): Promise<YouTubeStats | null> {
    if (!API_KEY || !CHANNEL_ID) return null;

    try {
        const res = await fetch(
            `${BASE_URL}/channels?part=statistics&id=${CHANNEL_ID}&key=${API_KEY}`,
            { next: { revalidate: 3600 } } // Cache for 1 hour
        );
        const data = await res.json();

        if (!data.items?.[0]?.statistics) return null;

        return data.items[0].statistics;
    } catch (error) {
        console.error('Error fetching channel stats:', error);
        return null;
    }
}

export async function getLatestVideos(limit = 9): Promise<YouTubeVideo[]> {
    if (!API_KEY || !CHANNEL_ID) return [];

    // Step 1: Get Uploads Playlist ID
    try {
        const channelRes = await fetch(
            `${BASE_URL}/channels?part=contentDetails&id=${CHANNEL_ID}&key=${API_KEY}`,
            { next: { revalidate: 86400 } } // Cache for 24 hours (playlist ID rarely changes)
        );
        const channelData = await channelRes.json();
        const uploadsPlaylistId = channelData.items?.[0]?.contentDetails?.relatedPlaylists?.uploads;

        if (!uploadsPlaylistId) return [];

        // Step 2: Get Videos from Playlist
        const videosRes = await fetch(
            `${BASE_URL}/playlistItems?part=snippet&playlistId=${uploadsPlaylistId}&maxResults=${limit}&key=${API_KEY}`,
            { next: { revalidate: 3600 } }
        );
        const videosData = await videosRes.json();

        return videosData.items.map((item: any) => ({
            id: item.snippet.resourceId.videoId,
            title: item.snippet.title,
            thumbnail: item.snippet.thumbnails.high?.url || item.snippet.thumbnails.medium?.url,
            publishedAt: item.snippet.publishedAt,
        }));
    } catch (error) {
        console.error('Error fetching videos:', error);
        return [];
    }
}
