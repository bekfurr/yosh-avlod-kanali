import Section from '@/components/ui/Section';
import Card from '@/components/ui/Card';
import { Play } from 'lucide-react';
import { getLatestVideos } from '@/lib/youtube';
import { formatDistanceToNow } from 'date-fns';
import { uz } from 'date-fns/locale';

export default async function VideosPage() {
    const videos = await getLatestVideos(50);

    return (
        <div className="pt-8 px-6 max-w-7xl mx-auto min-h-screen">
            <Section>
                <h1 className="text-4xl font-bold mb-8">Barcha Videolar</h1>

                {videos.length === 0 ? (
                    <p className="text-gray-400">Videolar yuklanmoqda...</p>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pb-20">
                        {videos.map((video) => (
                            <Card key={video.id} className="group cursor-pointer">
                                <a
                                    href={`https://www.youtube.com/watch?v=${video.id}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="block"
                                >
                                    <div className="aspect-video bg-gray-900 relative overflow-hidden">
                                        {/* eslint-disable-next-line @next/next/no-img-element */}
                                        <img
                                            src={video.thumbnail}
                                            alt={video.title}
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                                        <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <div className="w-16 h-16 bg-white/20 backdrop-blur rounded-full flex items-center justify-center shadow-2xl skew-y-0 group-hover:scale-110 transition-transform">
                                                <Play className="w-6 h-6 fill-white text-white ml-2" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="p-4 space-y-2">
                                        <h3 className="font-medium text-lg leading-tight group-hover:text-blue-400 transition-colors line-clamp-2">
                                            {video.title}
                                        </h3>
                                        <div className="flex items-center text-sm text-gray-500 gap-2 capitalize">
                                            <span>{formatDistanceToNow(new Date(video.publishedAt), { addSuffix: true, locale: uz })}</span>
                                        </div>
                                    </div>
                                </a>
                            </Card>
                        ))}
                    </div>
                )}
            </Section>
        </div>
    );
}
