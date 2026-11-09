'use client';

import GradientText from '@/components/ui/GradientText';
import Section from '@/components/ui/Section';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import ParticleLogo from '@/components/ParticleLogo';
import Link from 'next/link';
import { ArrowRight, Play, Send, ShieldCheck } from 'lucide-react';
import { YouTubeVideo } from '@/lib/youtube';
import { formatDistanceToNow } from 'date-fns';
import { uz, enUS, ru } from 'date-fns/locale';
import { useLanguage } from '@/context/LanguageContext';
import { motion } from 'framer-motion';

interface HomeClientProps {
  latestVideos: YouTubeVideo[];
  cyberVideos: YouTubeVideo[];
}

export default function HomeClient({ latestVideos, cyberVideos }: HomeClientProps) {
  const { t, locale } = useLanguage();

  const getDateLocale = () => {
    switch (locale) {
      case 'en':
        return enUS;
      case 'ru':
        return ru;
      case 'uz':
      default:
        return uz;
    }
  };

  return (
    <div className="flex flex-col items-center w-full">
      {/* Hero Section */}
      <section className="relative min-h-[88vh] w-full flex flex-col items-center justify-center text-center px-4 overflow-hidden pt-8 pb-16">
        <div className="relative z-10 flex flex-col items-center max-w-5xl mx-auto space-y-8">
          {/* Interactive Particle Logo (Standalone, pure logo without any back glow or top badge) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="relative flex items-center justify-center py-2"
          >
            <ParticleLogo
              imageSrc="/logo-particle.jpg"
              particleSize={3}
              resolution={6}
              scale={0.58}
              speed={1.15}
              pointerMode="Repel"
              pointerRadius={135}
              pointerStrength={1.25}
              drift={0.25}
            />
          </motion.div>

          {/* Titles & Hero Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="space-y-4 max-w-4xl"
          >
            <h1 className="text-5xl sm:text-6xl md:text-8xl font-black tracking-tighter leading-[1.08] drop-shadow-2xl">
              <GradientText animate>{t.home.heroTitle}</GradientText>
            </h1>
            <p className="text-xl sm:text-2xl md:text-3xl font-light text-white/90 drop-shadow-lg tracking-tight">
              {t.home.heroSubtitle}
            </p>
            <p className="text-gray-300 text-base sm:text-lg md:text-xl max-w-2xl mx-auto leading-relaxed font-normal pt-2">
              {t.home.heroDesc}
            </p>
          </motion.div>

          {/* Hero Action Buttons (Apple Liquid Glass) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.35 }}
            className="flex flex-wrap gap-4 justify-center pt-4"
          >
            <Link href="/videos">
              <Button
                size="lg"
                glow
                className="apple-glass-button text-base sm:text-lg px-7 py-5 text-white font-semibold flex items-center"
              >
                <Play className="w-5 h-5 mr-2.5 fill-current text-amber-300" /> {t.home.watchVideos}
              </Button>
            </Link>
            <Link href="/programs">
              <Button
                size="lg"
                variant="outline"
                className="apple-glass-pill text-base sm:text-lg px-7 py-5 font-semibold text-gray-200 hover:text-white"
              >
                {t.home.programsBtn}
              </Button>
            </Link>
            <a href="https://t.me/Yosh_avlod_kanali" target="_blank" rel="noopener noreferrer">
              <Button
                size="lg"
                className="text-base sm:text-lg px-7 py-5 rounded-2xl bg-[#229ED9]/80 hover:bg-[#229ED9] text-white backdrop-blur-xl border border-white/20 shadow-[0_0_25px_rgba(34,158,217,0.45)] transition-all font-semibold"
              >
                <Send className="w-5 h-5 mr-2.5 fill-current" /> {t.home.telegramBtn}
              </Button>
            </a>
          </motion.div>
        </div>
      </section>

      {/* Latest Videos Section */}
      <Section className="w-full pt-16 pb-12 px-4 sm:px-6 max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8 sm:mb-10">
          <div className="space-y-1">
            <h2 className="text-2xl sm:text-3xl font-black tracking-tight">{t.home.latestVideosHeading}</h2>
            <div className="h-1 w-12 bg-amber-500 rounded-full" />
          </div>
          <Link href="/videos">
            <Button variant="ghost" className="apple-glass-pill text-sm px-4 py-2 group">
              {t.home.viewAll} <ArrowRight className="w-4 h-4 ml-1.5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {latestVideos.length > 0 ? (
            latestVideos.map((video) => (
              <Card key={video.id} className="group cursor-pointer">
                <a
                  href={`https://www.youtube.com/watch?v=${video.id}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block"
                >
                  <div className="aspect-video bg-gray-950 relative overflow-hidden">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={video.thumbnail}
                      alt={video.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                    <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-[2px]">
                      <div className="w-14 h-14 bg-white/20 backdrop-blur-md border border-white/30 rounded-full flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform">
                        <Play className="w-6 h-6 fill-white text-white ml-0.5" />
                      </div>
                    </div>
                  </div>
                  <div className="p-5 space-y-2">
                    <h3 className="font-semibold text-base sm:text-lg line-clamp-2 group-hover:text-amber-400 transition-colors leading-snug">
                      {video.title}
                    </h3>
                    <p className="text-xs text-gray-400 capitalize" suppressHydrationWarning>
                      {formatDistanceToNow(new Date(video.publishedAt), { addSuffix: true, locale: getDateLocale() })}
                    </p>
                  </div>
                </a>
              </Card>
            ))
          ) : (
            <div className="col-span-3 text-center text-gray-400 py-12 apple-glass-card">
              {t.home.noVideos}
            </div>
          )}
        </div>
      </Section>

      {/* Cybersecurity Playlist Preview Section */}
      <Section className="w-full pt-8 pb-20 px-4 sm:px-6 max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8 sm:mb-10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-red-500/15 flex items-center justify-center text-red-500 border border-red-500/25 shadow-[0_0_15px_rgba(239,68,68,0.2)]">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-2xl sm:text-3xl font-black tracking-tight">{t.home.cyberHeading}</h2>
              <div className="h-0.5 w-10 bg-red-500 mt-1 rounded-full" />
            </div>
          </div>
          <Link href="/videos?tab=cyber">
            <Button variant="ghost" className="apple-glass-pill text-sm px-4 py-2 group">
              {t.home.viewAll} <ArrowRight className="w-4 h-4 ml-1.5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cyberVideos.length > 0 ? (
            cyberVideos.map((video) => (
              <Card key={video.id} className="group cursor-pointer hover:border-red-500/35 transition-colors">
                <a
                  href={`https://www.youtube.com/watch?v=${video.id}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block"
                >
                  <div className="aspect-video bg-gray-950 relative overflow-hidden">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={video.thumbnail}
                      alt={video.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                    <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-[2px]">
                      <div className="w-14 h-14 bg-red-500/20 backdrop-blur-md border border-red-500/40 rounded-full flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform">
                        <Play className="w-6 h-6 fill-white text-white ml-0.5" />
                      </div>
                    </div>
                  </div>
                  <div className="p-5 space-y-2">
                    <h3 className="font-semibold text-base sm:text-lg line-clamp-2 group-hover:text-red-400 transition-colors leading-snug">
                      {video.title}
                    </h3>
                    <p className="text-xs text-gray-400 capitalize" suppressHydrationWarning>
                      {formatDistanceToNow(new Date(video.publishedAt), { addSuffix: true, locale: getDateLocale() })}
                    </p>
                  </div>
                </a>
              </Card>
            ))
          ) : (
            <div className="col-span-3 text-center text-gray-400 py-12 apple-glass-card">
              {t.home.loadingCyber}
            </div>
          )}
        </div>
      </Section>
    </div>
  );
}
