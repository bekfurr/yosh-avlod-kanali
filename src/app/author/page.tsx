'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import {
  Github,
  Linkedin,
  Instagram,
  Facebook,
  Youtube,
  Send,
  Award,
  BookOpen,
  Briefcase,
  Code,
  Globe,
  Sparkles,
  Layers,
  ChevronRight,
  Users
} from 'lucide-react';
import Section from '@/components/ui/Section';
import Card from '@/components/ui/Card';
import GradientText from '@/components/ui/GradientText';

export default function AuthorPage() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring' as const,
        stiffness: 100,
        damping: 15,
      },
    },
  };

  const socialLinks = [
    {
      name: 'Telegram',
      url: 'https://t.me/BEKFURR',
      icon: <Send className="w-5 h-5" />,
      color: 'bg-[#229ED9]/10 text-[#229ED9] border-[#229ED9]/20 hover:bg-[#229ED9] hover:text-white',
      shadow: 'hover:shadow-[0_0_15px_rgba(34,158,217,0.4)]',
    },
    {
      name: 'YouTube',
      url: 'https://www.youtube.com/@YoshAvlodKanali',
      icon: <Youtube className="w-5 h-5" />,
      color: 'bg-[#FF0000]/10 text-[#FF0000] border-[#FF0000]/20 hover:bg-[#FF0000] hover:text-white',
      shadow: 'hover:shadow-[0_0_15px_rgba(255,0,0,0.4)]',
    },
    {
      name: 'Instagram',
      url: 'https://www.instagram.com/bekfurr/',
      icon: <Instagram className="w-5 h-5" />,
      color: 'bg-[#E1306C]/10 text-[#E1306C] border-[#E1306C]/20 hover:bg-[#E1306C] hover:text-white',
      shadow: 'hover:shadow-[0_0_15px_rgba(225,48,108,0.4)]',
    },
    {
      name: 'LinkedIn',
      url: 'https://www.linkedin.com/in/bekfurr/',
      icon: <Linkedin className="w-5 h-5" />,
      color: 'bg-[#0077B5]/10 text-[#0077B5] border-[#0077B5]/20 hover:bg-[#0077B5] hover:text-white',
      shadow: 'hover:shadow-[0_0_15px_rgba(0,119,181,0.4)]',
    },
    {
      name: 'GitHub',
      url: 'https://github.com/bekfurr',
      icon: <Github className="w-5 h-5" />,
      color: 'bg-white/10 text-white border-white/20 hover:bg-white hover:text-black',
      shadow: 'hover:shadow-[0_0_15px_rgba(255,255,255,0.4)]',
    },
    {
      name: 'Facebook',
      url: 'https://www.facebook.com/bekfurr',
      icon: <Facebook className="w-5 h-5" />,
      color: 'bg-[#1877F2]/10 text-[#1877F2] border-[#1877F2]/20 hover:bg-[#1877F2] hover:text-white',
      shadow: 'hover:shadow-[0_0_15px_rgba(24,119,242,0.4)]',
    },
  ];

  const specialties = [
    { title: 'AI/ML Muhandisi', desc: 'Sun\'iy intellekt va Machine Learning modellarini ishlab chiqish' },
    { title: 'Kiberxavfsizlik Mutaxassisi', desc: 'Tizim xavfsizligi, testlash va himoya strategiyalari' },
    { title: 'Linux Administratori', desc: 'Server tizimlarini boshqarish va xavfsiz sozlash' },
  ];

  const skills = [
    'Ma\'lumot tozalash',
    'Secure SDLC',
    'Monitoring',
    'Data Science',
    'Testing & QA',
    'Incident response',
  ];

  const interests = [
    'Machine Learning',
    'AI / LLM',
    'IT Design',
    'Kiberxavfsizlik',
    'CTF',
    'CVE Research',
  ];

  const partners = [
    {
      name: 'Memento mori',
      role: 'Bosh Administrator',
      telegram: 'https://t.me/Mementomori_2255',
      avatar: null
    },
    {
      name: 'ELBEK DESIGN VA WEB DASTURCHI',
      role: 'Bosh Administrator / Dizayner',
      telegram: 'https://t.me/elbekdesign_va_webdasturchi',
      avatar: '/elbek.png'
    }
  ];

  return (
    <div className="min-h-screen bg-black text-[#ededed] py-12 px-4 md:px-8 relative overflow-hidden">
      {/* Background radial glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[120px] pointer-events-none z-0" />
      <div className="absolute bottom-1/3 left-1/4 w-[300px] h-[300px] bg-purple-500/10 rounded-full blur-[100px] pointer-events-none z-0" />

      <div className="max-w-7xl mx-auto relative z-10 space-y-16">
        {/* Header Section */}
        <div className="text-center space-y-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-semibold tracking-wider text-blue-400 uppercase"
          >
            <Sparkles className="w-3.5 h-3.5" />
            Loyiha Muallifi
          </motion.div>
          <h1 className="text-4xl md:text-6xl font-black tracking-tight leading-none">
            <GradientText animate>Shamsiddin Kamoliddinov</GradientText>
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto font-medium">
            Yosh Avlod Kanali youtube, telegram, veb-sayt va barcha turdagi IT loyihalarining asoschisi va muallifi.
          </p>
        </div>

        {/* Split Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Author Main Content */}
          <div className="lg:col-span-8 space-y-16">
            
            {/* 3D Overlapping/Layered Intro Section */}
            <Section className="grid grid-cols-1 md:grid-cols-12 gap-8 items-stretch pt-6">

          {/* Left: Blurred, Semi-Transparent Image Box (Back/Middle Layer) */}
          <div className="md:col-span-5 relative flex items-center justify-center min-h-[350px] md:min-h-[500px] group">
            {/* Glowing background behind image */}
            <div className="absolute inset-4 bg-gradient-to-tr from-blue-600/20 to-purple-600/20 rounded-2xl blur-xl opacity-60 group-hover:opacity-85 transition-opacity duration-700" />

            {/* Image Wrapper with blur & transparency */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="relative w-72 h-72 md:w-80 md:h-80 lg:w-96 lg:h-96 rounded-2xl overflow-hidden glass-panel p-2 border border-white/10 shadow-2xl"
            >
              <div className="relative w-full h-full rounded-xl overflow-hidden">
                <Image
                  src="/profile_icon.jpg"
                  alt="Shamsiddin Kamoliddinov"
                  fill
                  priority
                  className="object-cover filter blur-[1.2px] opacity-75 contrast-110 saturate-75 group-hover:blur-0 group-hover:opacity-100 group-hover:scale-105 group-hover:saturate-100 transition-all duration-700 ease-out"
                />

                {/* Overlay filter */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent pointer-events-none" />

                {/* Age Badge */}
                <div className="absolute bottom-4 left-4 bg-black/60 backdrop-blur-md border border-white/10 px-3 py-1.5 rounded-lg text-xs font-mono text-gray-300">
                  Tug&apos;ilgan yili: 2005
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right: Overlapping/Foreground info (Z-Indexed Front Layer) */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="md:col-span-7 flex flex-col justify-center relative md:-ml-8 z-20"
          >
            {/* Front Overlapping Glass Card */}
            <div className="glass-panel p-8 md:p-10 rounded-2xl border border-white/10 bg-black/75 backdrop-blur-xl shadow-[0_20px_50px_rgba(0,0,0,0.8)] space-y-6 transform hover:-translate-y-1 hover:border-white/20 transition-all duration-500">

              <div className="space-y-2">
                <span className="text-blue-400 font-mono text-sm tracking-widest uppercase font-semibold">Mutaxassisligi</span>
                <h2 className="text-2xl md:text-3xl font-extrabold text-white">AI / ML muhandisi</h2>
              </div>

              <p className="text-gray-300 leading-relaxed text-base font-normal">
                Men Shamsiddin Kamoliddinov Aqliddin o&apos;g&apos;li 2005-yil 15-fevral Farg&apos;ona viloyati Toshloq tumanida tavallud topganman.
                Hozirda Farg&apos;ona Davlat Texnika Universiteti Axborot texnologiyalari va telekommunikatsiyalar fakulteti
                Sun&apos;iy intellekt yo&apos;nalishi 4-bosqich talabasiman.
              </p>

              <p className="text-gray-300 leading-relaxed text-base font-normal">
                Dasturlash bo&apos;yicha 7 yillik tajribaga egaman. Kiberxavfsizlik, AI menejmenti va Computer Science sohalarida ish olib boraman.
                Sun&apos;iy intellekt bo&apos;yicha ko&apos;plab loyihalar va tadqiqotlar muallifiman. Kiberxavfsizlik va IT bo&apos;yicha YouTube va Telegram tarmoqlarida shaxsiy blog yuritib, yosh avlodni zamonaviy texnologiyalar bilan tanishtirib kelaman.
              </p>

              {/* Social Media Grid */}
              <div className="space-y-3 pt-4">
                <h3 className="text-sm font-semibold tracking-wider text-gray-400 uppercase flex items-center gap-2">
                  <Layers className="w-4 h-4 text-blue-400" /> Ijtimoiy tarmoqlar va aloqa
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {socialLinks.map((social) => (
                    <a
                      key={social.name}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block"
                    >
                      <motion.div
                        whileHover={{ y: -2 }}
                        className={`flex items-center gap-2 px-3 py-2.5 rounded-lg border text-sm font-medium transition-all duration-300 ${social.color} ${social.shadow}`}
                      >
                        {social.icon}
                        <span>{social.name}</span>
                      </motion.div>
                    </a>
                  ))}
                </div>
              </div>

            </div>
          </motion.div>
        </Section>

        {/* Detailed Grid Info */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {/* Card 1: Mutaxassisliklar */}
          <motion.div variants={itemVariants}>
            <Card className="h-full p-6 space-y-4 border-white/5 bg-gradient-to-b from-[#0a0a0a] to-[#040404] hover:border-blue-500/20 transition-colors">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400">
                  <Code className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-white">Mutaxassisliklar</h3>
              </div>
              <div className="space-y-4">
                {specialties.map((spec, idx) => (
                  <div key={idx} className="space-y-1">
                    <h4 className="text-sm font-semibold text-gray-200 flex items-center gap-1.5">
                      <ChevronRight className="w-3.5 h-3.5 text-blue-500" />
                      {spec.title}
                    </h4>
                    <p className="text-xs text-gray-400 pl-5">{spec.desc}</p>
                  </div>
                ))}
              </div>
            </Card>
          </motion.div>

          {/* Card 2: Tajriba va Ta'lim */}
          <motion.div variants={itemVariants}>
            <Card className="h-full p-6 space-y-4 border-white/5 bg-gradient-to-b from-[#0a0a0a] to-[#040404] hover:border-purple-500/20 transition-colors">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400">
                  <Briefcase className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-white">Tajriba va Ta&apos;lim</h3>
              </div>
              <div className="space-y-4 text-sm">
                <div className="border-l-2 border-purple-500/30 pl-4 space-y-1">
                  <span className="text-xs font-mono text-purple-400">2024 - 2026</span>
                  <h4 className="font-semibold text-gray-200">Director / Asoschisi</h4>
                  <p className="text-xs text-gray-400">BEKFURR INC</p>
                </div>
                <div className="border-l-2 border-purple-500/30 pl-4 space-y-1">
                  <span className="text-xs font-mono text-purple-400">Hozirda</span>
                  <h4 className="font-semibold text-gray-200">Bakalavr - Sun&apos;iy intellekt</h4>
                  <p className="text-xs text-gray-400">Farg&apos;ona Davlat Texnika Universiteti (3-kurs, GPA 4.6)</p>
                </div>
              </div>
            </Card>
          </motion.div>

          {/* Card 3: Ko'nikmalar */}
          <motion.div variants={itemVariants}>
            <Card className="h-full p-6 space-y-4 border-white/5 bg-gradient-to-b from-[#0a0a0a] to-[#040404] hover:border-emerald-500/20 transition-colors">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
                  <Layers className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-white">Ko&apos;nikmalar</h3>
              </div>
              <div className="flex flex-wrap gap-2 pt-2">
                {skills.map((skill, idx) => (
                  <span
                    key={idx}
                    className="px-2.5 py-1 text-xs rounded-md bg-emerald-500/5 border border-emerald-500/10 text-emerald-300 font-medium hover:border-emerald-500/30 transition-colors"
                  >
                    {skill}
                  </span>
                ))}
              </div>
              <div className="pt-2 border-t border-white/5">
                <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Tillar</h4>
                <div className="flex gap-4 text-xs font-medium text-gray-300">
                  <span className="flex items-center gap-1"><Globe className="w-3.5 h-3.5 text-emerald-400" /> Ingliz tili: B2</span>
                  <span className="flex items-center gap-1"><Globe className="w-3.5 h-3.5 text-emerald-400" /> Rus tili: B2</span>
                </div>
              </div>
            </Card>
          </motion.div>

          {/* Card 4: Ilmiy maqolalar */}
          <motion.div variants={itemVariants} className="md:col-span-2">
            <Card className="p-6 space-y-4 border-white/5 bg-gradient-to-b from-[#0a0a0a] to-[#040404] hover:border-blue-500/20 transition-colors">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400">
                    <BookOpen className="w-5 h-5" />
                  </div>
                  <h3 className="text-lg font-bold text-white">Ilmiy tadqiqotlar va loyihalar</h3>
                </div>
                <Award className="w-5 h-5 text-amber-400" />
              </div>
              <div className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-3">
                <h4 className="font-bold text-white text-base md:text-lg leading-snug">
                  PNEUMONIA KASALLIGINI KO&apos;KRAK QAFASI RENTGEN SURATLARI ASOSIDA BASHORAT QILUVCHI MODEL
                </h4>
                <p className="text-sm text-gray-400">
                  Muallif: Shamsiddin Kamoliddinov Aqliddin o&apos;g&apos;li
                </p>
                <p className="text-xs text-gray-500 leading-relaxed">
                  Ushbu model ko&apos;krak qafasi rentgen rasmlari asosida pnevmoniya kasalligini avtomatik tahlil qiluvchi va yuqori aniqlik bilan aniqlovchi Sun&apos;iy Intellekt yechimidir. Bir qancha ilmiy jurnallarda chop etilgan.
                </p>
                <div className="pt-2 border-t border-white/5 flex flex-wrap justify-between items-center gap-2">
                  <span className="text-xs font-mono text-blue-400">Zenodo DOI: doi.org/10.5281/zenodo.17579515</span>
                  <a
                    href="https://doi.org/10.5281/zenodo.17579515"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-xs text-white hover:text-blue-400 font-bold transition-colors"
                  >
                    Maqolani o&apos;qish <ChevronRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>

              {/* Certificates Section */}
              <div className="pt-2">
                <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                  <Award className="w-4 h-4 text-amber-400" /> Sertifikatlar
                </h4>
                <div className="text-sm text-gray-300 font-medium pl-1.5 border-l-2 border-amber-500/30">
                  Certificate of Completion of Fullstack Development Track (20.08.2020)
                </div>
              </div>

              {/* Interests tag list */}
              <div className="pt-2">
                <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Qiziqishlar</h4>
                <div className="flex flex-wrap gap-2">
                  {interests.map((interest, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-0.5 text-xs rounded bg-white/5 border border-white/10 text-gray-400"
                    >
                      {interest}
                    </span>
                  ))}
                </div>
              </div>
            </Card>
          </motion.div>
        </motion.div>
        
        </div>

        {/* Right Column: Sticky Sidebar for Partners */}
        <div className="lg:col-span-4 lg:sticky lg:top-24 space-y-6 pt-6">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-xs font-semibold tracking-wider text-purple-400 uppercase">
              <Users className="w-3.5 h-3.5" />
              Loyiha Hamjamiyati
            </div>
            <h2 className="text-2xl font-extrabold tracking-tight">
              <GradientText animate>Yordamchilar</GradientText>
            </h2>
            <p className="text-gray-400 text-sm">
              Kanalimiz rivojiga o&apos;z hissasini qo&apos;shib kelayotgan bosh administratorlarimiz va hamkorlarimiz.
            </p>
          </div>

          <div className="flex flex-col gap-4">
            {partners.map((partner, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
              >
                <Card className="p-6 border-white/5 bg-gradient-to-b from-[#0a0a0a] to-[#040404] hover:border-purple-500/20 transition-all duration-300 flex items-center gap-5">
                  <div className="relative w-16 h-16 rounded-2xl overflow-hidden bg-white/5 border border-white/10 flex-shrink-0 flex items-center justify-center">
                    {partner.avatar ? (
                      <Image
                        src={partner.avatar}
                        alt={partner.name}
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <span className="text-2xl font-black text-purple-400 font-mono">
                        {partner.name.charAt(0)}
                      </span>
                    )}
                  </div>
                  <div className="flex-grow space-y-1 min-w-0">
                    <h3 className="font-bold text-white text-base tracking-tight truncate">
                      {partner.name}
                    </h3>
                    <p className="text-xs text-purple-400 font-medium">
                      {partner.role}
                    </p>
                    <div className="pt-2">
                      <a
                        href={partner.telegram}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#229ED9]/10 hover:bg-[#229ED9] text-[#229ED9] hover:text-white border border-[#229ED9]/20 text-xs font-semibold transition-all duration-300"
                      >
                        <Send className="w-3.5 h-3.5" />
                        <span>Telegram</span>
                      </a>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>

        </div>
      </div>
    </div>
  );
}
