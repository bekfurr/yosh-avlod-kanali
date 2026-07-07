'use client';

import { useState } from 'react';
import Section from '@/components/ui/Section';
import Card from '@/components/ui/Card';
import { Play, PlayCircle, ShieldCheck, Film } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { uz } from 'date-fns/locale';
import { YouTubeVideo } from '@/lib/youtube';
import { motion, AnimatePresence } from 'framer-motion';

interface VideosClientProps {
    allVideos: YouTubeVideo[];
    cyberVideos: YouTubeVideo[];
    defaultTab: 'all' | 'cyber';
}

export default function VideosClient({ allVideos, cyberVideos, defaultTab }: VideosClientProps) {
    const [activeTab, setActiveTab] = useState<'all' | 'cyber'>(defaultTab);

    const activeVideos = activeTab === 'all' ? allVideos : cyberVideos;

    return (
        <div className="pt-8 px-6 max-w-7xl mx-auto min-h-screen">
            <Section>
                {/* Title */}
                <div className="mb-10">
                    <h1 className="text-4xl font-black tracking-tight mb-2">Videolar</h1>
                    <p className="text-gray-400 max-w-xl text-sm">
                        Kanalimizdagi barcha foydali darslar va maxsus kiberxavfsizlik darslari to&apos;plami.
                    </p>
                </div>

                {/* Tabs selection */}
                <div className="flex gap-4 mb-8 bg-white/5 p-1 rounded-xl max-w-xs border border-white/5">
                    <button
                        onClick={() => setActiveTab('all')}
                        className={`flex-1 py-2 rounded-lg text-sm font-semibold flex items-center justify-center gap-1.5 transition-all ${
                            activeTab === 'all' 
                            ? 'bg-white text-black shadow-lg' 
                            : 'text-gray-400 hover:text-white'
                        }`}
                    >
                        <Film className="w-4 h-4" /> Barchasi
                    </button>
                    <button
                        onClick={() => setActiveTab('cyber')}
                        className={`flex-1 py-2 rounded-lg text-sm font-semibold flex items-center justify-center gap-1.5 transition-all ${
                            activeTab === 'cyber' 
                            ? 'bg-white text-black shadow-lg' 
                            : 'text-gray-400 hover:text-white'
                        }`}
                    >
                        <ShieldCheck className="w-4 h-4" /> Kiberxavfsizlik
                    </button>
                </div>

                {/* Videos grid */}
                <AnimatePresence mode="wait">
                    {activeVideos.length === 0 ? (
                        <motion.div
                            key="no-videos"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="py-12 text-center text-gray-500"
                        >
                            Videolar topilmadi yoki yuklanmoqda...
                        </motion.div>
                    ) : (
                        <motion.div
                            key={activeTab}
                            initial={{ opacity: 0, y: 15 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -15 }}
                            transition={{ duration: 0.3 }}
                            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pb-20"
                        >
                            {activeVideos.map((video) => (
                                <Card 
                                    key={video.id} 
                                    className="group cursor-pointer hover:border-blue-500/30 transition-colors"
                                    hoverEffect={true}
                                >
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
                                                <div className="w-16 h-16 bg-white/20 backdrop-blur rounded-full flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform">
                                                    <Play className="w-6 h-6 fill-white text-white ml-2" />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="p-4 space-y-2">
                                            <h3 className="font-semibold text-base leading-snug group-hover:text-blue-400 transition-colors line-clamp-2">
                                                {video.title}
                                            </h3>
                                            <div className="flex items-center text-xs text-gray-500 gap-2 capitalize">
                                                <span>{formatDistanceToNow(new Date(video.publishedAt), { addSuffix: true, locale: uz })}</span>
                                            </div>
                                        </div>
                                    </a>
                                </Card>
                            ))}
                        </motion.div>
                    )}
                </AnimatePresence>
            </Section>
        </div>
    );
}
