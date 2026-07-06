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

export interface OperatingSystem {
    id: string;
    name: string;
    description: string;
    downloadUrl: string;
    targetAudience: string;
    category: 'Cybersecurity' | 'Windows' | 'General';
    tags: string[];
    accentColor: string; // Hex or tailwind-friendly color for glow
}

