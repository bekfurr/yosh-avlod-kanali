'use client';

import Section from '@/components/ui/Section';
import Card from '@/components/ui/Card';
import GradientText from '@/components/ui/GradientText';
import { Users, Eye, Video, TrendingUp } from 'lucide-react';
import { motion, useSpring, useTransform } from 'framer-motion';
import { useEffect } from 'react';
import { YouTubeStats } from '@/lib/youtube';

function AnimatedCounter({ value, label, icon: Icon }: { value: number; label: string; icon: any }) {
    const spring = useSpring(0, { bounce: 0, duration: 2000 });
    const display = useTransform(spring, (current) => Math.floor(current).toLocaleString());

    useEffect(() => {
        spring.set(value);
    }, [value, spring]);

    return (
        <Card className="p-8 flex items-center gap-6">
            <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center text-white">
                <Icon className="w-8 h-8" />
            </div>
            <div>
                <motion.div className="text-4xl font-bold font-mono">
                    {display}
                </motion.div>
                <div className="text-gray-400 mt-1">{label}</div>
            </div>
        </Card>
    );
}

export default function StatsClient({ stats }: { stats: YouTubeStats | null }) {
    // Parsing with fallbacks
    const subscriberCount = parseInt(stats?.subscriberCount || '0', 10);
    const viewCount = parseInt(stats?.viewCount || '0', 10);
    const videoCount = parseInt(stats?.videoCount || '0', 10);

    return (
        <div className="pt-8 px-6 max-w-7xl mx-auto min-h-screen">
            <Section>
                <div className="text-center mb-16 space-y-4">
                    <h1 className="text-4xl md:text-5xl font-bold">
                        Kanal <GradientText>O'sishi</GradientText>
                    </h1>
                    <p className="text-gray-400">Bizning sayohatimiz va natijalarimizni kuzatib boring.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                    <AnimatedCounter value={subscriberCount} label="Obunachilar" icon={Users} />
                    <AnimatedCounter value={viewCount} label="Jami Ko'rishlar" icon={Eye} />
                    <AnimatedCounter value={videoCount} label="Yuklangan Videolar" icon={Video} />
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <Card className="p-8 min-h-[300px] flex flex-col justify-center items-center text-center space-y-4">
                        <TrendingUp className="w-12 h-12 text-green-400 mb-4" />
                        <h3 className="text-2xl font-bold">Barqaror O'sish</h3>
                        <p className="text-gray-400 max-w-sm">
                            Kanalimiz siz kabi tomoshabinlar tufayli har kuni o'sib bormoqda.
                        </p>
                    </Card>
                    <Card className="p-8 min-h-[300px] flex items-center justify-center relative overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-tr from-blue-900/20 to-purple-900/20" />
                        <div className="relative z-10 text-center">
                            <p className="text-5xl font-bold mb-2">4.8/5</p>
                            <p className="text-gray-400">O'rtacha Tomoshabin Bahosi</p>
                        </div>
                    </Card>
                </div>
            </Section>
        </div>
    );
}
