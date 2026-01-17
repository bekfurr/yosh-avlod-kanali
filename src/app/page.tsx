import GradientText from '@/components/ui/GradientText';
import Section from '@/components/ui/Section';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import Link from 'next/link';
import { ArrowRight, Play } from 'lucide-react';
import { getLatestVideos } from '@/lib/youtube';
import { formatDistanceToNow } from 'date-fns';
import { uz } from 'date-fns/locale';

export default async function Home() {
  const latestVideos = await getLatestVideos(3);

  return (
    <div className="flex flex-col items-center">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] w-full flex flex-col items-center justify-center text-center px-4 overflow-hidden">

        {/* Spline 3D Background */}
        <div className="absolute inset-0 z-0">
          <iframe
            src='https://my.spline.design/particlesforwebsite-afe1L6HxdBemti7mcb6YiXvp/'
            frameBorder='0'
            width='100%'
            height='100%'
            className="w-full h-full pointer-events-none opacity-60"
          ></iframe>
          <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black pointer-events-none" />
        </div>

        <div className="relative z-10 space-y-10 max-w-5xl mx-auto mt-20">
          <h1 className="text-6xl md:text-8xl font-black tracking-tighter leading-[1.1] drop-shadow-2xl">
            <GradientText animate>Yosh Avlod Kanali</GradientText>
          </h1>
          <p className="text-2xl md:text-4xl font-light text-white/90 drop-shadow-lg">
            Kelajak Avlodini Ilhomlantirib
          </p>
          <p className="text-gray-300 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed drop-shadow-md font-medium">
            Yosh Avlod Kanali yoshlarni ta&apos;lim, ilhom va zamonaviy texnologiyalar orqali kuchaytirishga bag&apos;ishlangan eng so&apos;nggi loyihadir. Bizning safimizga qo&apos;shiling va kelajakni birga quring.
          </p>

          <div className="flex flex-wrap gap-4 justify-center pt-8">
            <Link href="/videos">
              <Button size="lg" glow className="text-lg px-8 py-6 bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20 text-white">
                <Play className="w-5 h-5 mr-3 fill-current" /> Videolarni Ko&apos;rish
              </Button>
            </Link>
            <Link href="/programs">
              <Button size="lg" variant="outline" className="text-lg px-8 py-6 bg-black/50 backdrop-blur-md border-white/20 hover:bg-white/10">
                Dasturlar
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Latest Videos Preview */}
      <Section className="w-full py-20 px-6 max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-10">
          <h2 className="text-3xl font-bold">So&apos;nggi Videolar</h2>
          <Link href="/videos">
            <Button variant="ghost" className="group">
              Barchasini Ko&apos;rish <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
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
                  <div className="aspect-video bg-gray-900 relative overflow-hidden">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={video.thumbnail}
                      alt={video.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="w-12 h-12 bg-white/20 backdrop-blur rounded-full flex items-center justify-center">
                        <Play className="w-5 h-5 fill-white text-white ml-1" />
                      </div>
                    </div>
                  </div>
                  <div className="p-4 space-y-2">
                    <h3 className="font-semibold text-lg line-clamp-2 group-hover:text-blue-400 transition-colors">
                      {video.title}
                    </h3>
                    <p className="text-sm text-gray-500 capitalize">
                      {formatDistanceToNow(new Date(video.publishedAt), { addSuffix: true, locale: uz })}
                    </p>
                  </div>
                </a>
              </Card>
            ))
          ) : (
            <div className="col-span-3 text-center text-gray-400 py-10">
              Hozircha videolar topilmadi yoki internet bilan aloqa yo&apos;q.
            </div>
          )}
        </div>
      </Section>
    </div>
  );
}
