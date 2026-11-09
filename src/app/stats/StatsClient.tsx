'use client';

import Section from '@/components/ui/Section';
import Card from '@/components/ui/Card';
import GradientText from '@/components/ui/GradientText';
import { Users, Eye, Video, Radio, Youtube } from 'lucide-react';
import { motion, useSpring, useTransform } from 'framer-motion';
import { useEffect } from 'react';
import { YouTubeStats } from '@/lib/youtube';
import { useLanguage } from '@/context/LanguageContext';

function AnimatedCounter({
    value,
    label,
    icon: Icon,
    color = 'from-blue-500/20 to-indigo-500/10',
    iconColor = 'text-blue-400',
}: {
    value: number;
    label: string;
    icon: React.ComponentType<{ className?: string }>;
    color?: string;
    iconColor?: string;
}) {
    const spring = useSpring(0, { bounce: 0, duration: 2200 });
    const display = useTransform(spring, (current) => Math.floor(current).toLocaleString());

    useEffect(() => {
        spring.set(value);
    }, [value, spring]);

    return (
        <Card className="p-8 relative overflow-hidden group">
            {/* Ambient liquid glow behind the stat */}
            <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl ${color} rounded-full blur-2xl pointer-events-none group-hover:scale-125 transition-transform duration-500`} />
            
            <div className="relative z-10 flex items-center gap-6">
                <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.15)] group-hover:border-white/25 transition-colors">
                    <Icon className={`w-8 h-8 ${iconColor}`} />
                </div>
                <div>
                    <motion.div className="text-4xl md:text-5xl font-black font-mono tracking-tight text-white drop-shadow-sm">
                        {display}
                    </motion.div>
                    <div className="text-sm md:text-base text-gray-400 mt-1.5 font-medium">{label}</div>
                </div>
            </div>
        </Card>
    );
}

export default function StatsClient({ stats }: { stats: YouTubeStats | null }) {
    const { t } = useLanguage();

    const subscriberCount = parseInt(stats?.subscriberCount || '0', 10);
    const viewCount = parseInt(stats?.viewCount || '0', 10);
    const videoCount = parseInt(stats?.videoCount || '0', 10);

    return (
        <div className="pt-10 pb-20 px-4 sm:px-6 max-w-7xl mx-auto min-h-[85vh] flex flex-col justify-center">
            <Section>
                {/* Header */}
                <div className="text-center mb-16 space-y-4">
                    <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full apple-glass-pill text-xs font-semibold text-red-400 tracking-wider uppercase mb-2">
                        <Radio className="w-3.5 h-3.5 animate-pulse text-red-500" />
                        <span>Jonli YouTube Statistikasi</span>
                    </div>
                    <h1 className="text-4xl md:text-6xl font-black tracking-tight">
                        {t.stats.title} <GradientText>{t.stats.titleHighlight}</GradientText>
                    </h1>
                    <p className="text-gray-400 text-base md:text-lg max-w-xl mx-auto">{t.stats.subtitle}</p>
                </div>

                {/* Real YouTube Metrics Only (Stock data removed) */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
                    <AnimatedCounter
                        value={subscriberCount}
                        label={t.stats.subscribers}
                        icon={Users}
                        color="from-red-500/20 to-orange-500/10"
                        iconColor="text-red-400"
                    />
                    <AnimatedCounter
                        value={viewCount}
                        label={t.stats.totalViews}
                        icon={Eye}
                        color="from-amber-500/20 to-yellow-500/10"
                        iconColor="text-amber-400"
                    />
                    <AnimatedCounter
                        value={videoCount}
                        label={t.stats.uploadedVideos}
                        icon={Video}
                        color="from-blue-500/20 to-cyan-500/10"
                        iconColor="text-blue-400"
                    />
                </div>

                {/* Channel Link Card (Apple Glass) */}
                <div className="mt-12 max-w-2xl mx-auto text-center">
                    <div className="apple-glass-card p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
                        <div className="flex items-center gap-3 text-left">
                            <div className="w-10 h-10 rounded-xl bg-red-600/20 border border-red-500/30 flex items-center justify-center text-red-500 flex-shrink-0">
                                <Youtube className="w-5 h-5 fill-current" />
                            </div>
                            <div>
                                <h4 className="text-sm font-bold text-white">YouTube Rasmiy Kanali</h4>
                                <p className="text-xs text-gray-400">@YoshAvlodKanali rasmiy video platformasi</p>
                            </div>
                        </div>
                        <a
                            href="https://www.youtube.com/@YoshAvlodKanali"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="apple-glass-button text-xs font-semibold px-5 py-2.5 rounded-xl text-white whitespace-nowrap hover:bg-red-600/30 transition-colors"
                        >
                            Kanalga O&apos;tish
                        </a>
                    </div>
                </div>
            </Section>
        </div>
    );
}
