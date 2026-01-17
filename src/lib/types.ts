export interface Video {
    id: string;
    title: string;
    thumbnailUrl: string;
    views: string;
    publishedAt: string;
}

export interface Program {
    id: number;
    title: string;
    description: string;
    download_url: string;
    version: string;
    created_at: string;
}

export interface ChannelStats {
    subscriberCount: string;
    viewCount: string;
    videoCount: string;
}
