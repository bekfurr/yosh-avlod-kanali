'use client';

import { useEffect, useState } from 'react';
import Section from '@/components/ui/Section';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import GradientText from '@/components/ui/GradientText';
import {
    Download,
    Package,
    Search,
    Cpu,
    Sparkles,
    Terminal,
    BookOpen,
    Copy,
    Check,
    ExternalLink,
    AlertTriangle,
    Info,
    Laptop,
    Play,
    HardDrive
} from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { Program } from '@/lib/types';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';

// Fallback data if Supabase is not connected
const MOCK_PROGRAMS: Program[] = [
    {
        id: 1,
        title: 'Yosh Avlod Helper Tool',
        description: 'Avtomatlashtirish va ish jarayonini optimallashtirish uchun yordamchi dastur.',
        download_url: '#',
        version: 'v1.2.0',
        created_at: new Date().toISOString(),
    },
    {
        id: 2,
        title: "O'quv To'plami 2024",
        description: "Bizning eng yangi video darslarimiz uchun to'liq manbalar to'plami.",
        download_url: '#',
        version: 'v2.0.1',
        created_at: new Date().toISOString(),
    },
];

// Local AI Tools Data
interface LocalAITool {
    id: string;
    title: string;
    description: Record<string, string>;
    url: string;
    tag: string;
    category: 'Engine' | 'GUI' | 'Hub' | 'Suite';
    accentColor: string;
}

const LOCAL_AI_TOOLS: LocalAITool[] = [
    {
        id: 'ollama',
        title: 'Ollama',
        description: {
            uz: "Llama 3, Mistral, Qwen2.5 va boshqa eng ilg'or ochiq kodli model turlarini shaxsiy kompyuteringizda (CPU/GPU) osongina ishga tushirish uchun eng mashhur terminal vositasi.",
            en: 'The most popular CLI tool to run Llama 3, Mistral, Qwen 2.5 and open-source LLMs locally on CPU and GPU.',
            ru: 'Популярный терминальный инструмент для удобного локального запуска Llama 3, Mistral, Qwen и других моделей на CPU/GPU.'
        },
        url: 'https://ollama.com/',
        tag: 'Local Engine',
        category: 'Engine',
        accentColor: '#38bdf8'
    },
    {
        id: 'lmstudio',
        title: 'LM Studio',
        description: {
            uz: "Hugging Face-dagi har qanday modelni osongina yuklab olish, sozlash va chiroyli grafik interfeys (GUI) orqali chat shaklida ishlatish uchun qulay va kuchli desktop ilova.",
            en: 'Discover, download, and run local LLMs offline with a beautiful desktop GUI interface.',
            ru: 'Удобное десктопное приложение для загрузки и использования любых моделей с Hugging Face через графический интерфейс.'
        },
        url: 'https://lmstudio.ai/',
        tag: 'Desktop GUI',
        category: 'GUI',
        accentColor: '#a855f7'
    },
    {
        id: 'anythingllm',
        title: 'AnythingLLM',
        description: {
            uz: "Fayllaringiz va hujjatlaringiz bilan local RAG (tahlil) tizimini o'rnatish uchun ideal all-in-one yordamchi. Istalgan local yoki tashqi modelga ulanadi.",
            en: 'All-in-one desktop & enterprise AI tool for local document RAG, AI agents, and private workspace chat.',
            ru: 'Универсальный инструмент для локального RAG анализа документов и персональных AI агентов без утечки данных.'
        },
        url: 'https://anythingllm.com/',
        tag: 'AI Agent & RAG',
        category: 'Suite',
        accentColor: '#10b981'
    },
    {
        id: 'openwebui',
        title: 'Open WebUI',
        description: {
            uz: "Ollama, LM Studio va OpenAI formatidagi barcha API ulanishlar uchun yaratilgan, ChatGPT interfeysiga juda o'xshash bo'lgan eng boy funksiyali ochiq kodli veb-interfeys.",
            en: 'User-friendly, ChatGPT-like self-hosted web UI designed for Ollama and OpenAI-compatible backends.',
            ru: 'Полнофункциональный веб-интерфейс в стиле ChatGPT для работы с Ollama, LM Studio и локальными серверами.'
        },
        url: 'https://github.com/open-webui/open-webui',
        tag: 'Web GUI',
        category: 'GUI',
        accentColor: '#f43f5e'
    },
    {
        id: 'huggingface',
        title: 'Hugging Face',
        description: {
            uz: "Dunyodagi eng yirik ochiq kodli AI hamjamiyati platformasi. Millionlab modellar (GGUF, Safetensors), datasetlar va AI dasturlar manbayi.",
            en: 'The leading open-source platform hosting millions of pre-trained models (GGUF), datasets, and AI applications.',
            ru: 'Крупнейшая платформа открытого ИИ сообщества с миллионами моделей (GGUF), датасетов и приложений.'
        },
        url: 'https://huggingface.co/',
        tag: 'Model Platform',
        category: 'Hub',
        accentColor: '#eab308'
    }
];

// Office Logo SVG Component
const OfficeLogo = ({ className = "w-4 h-4" }: { className?: string }) => (
    <svg viewBox="0 0 24 24" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
            <linearGradient id="office-tab-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#E04F5F" />
                <stop offset="100%" stopColor="#D83B01" />
            </linearGradient>
        </defs>
        <path d="M12 2L2 5v14l10 3 10-3V5L12 2z" fill="url(#office-tab-grad)" />
        <path d="M12 5.5l7 2.1v8.8l-7 2.1V5.5z" fill="#ffffff" opacity="0.8" />
    </svg>
);

interface OfficeProduct {
    id: string;
    title: string;
    description: Record<string, string>;
    downloadUrl: string;
    version: string;
    size: string;
    accentColor: string;
}

const OFFICE_PRODUCTS: OfficeProduct[] = [
    {
        id: 'office-365',
        title: 'Microsoft Office 365 ProPlus',
        description: {
            uz: "Bulutga asoslangan, eng so'nggi funksiyalar va doimiy yangilanishlarga ega Microsoft Office-ning to'liq paketi (Word, Excel, PowerPoint, Outlook va boshqalar).",
            en: 'Complete Microsoft Office suite featuring cloud capabilities, regular feature updates, Word, Excel, and PowerPoint.',
            ru: 'Полный пакет Microsoft Office с облачными функциями, регулярными обновлениями и поддержкой всех новейших возможностей.'
        },
        downloadUrl: 'https://officecdn.microsoft.com/db/492350f6-3a01-4f97-b9c0-c7c6ddf67d60/media/en-us/O365ProPlusRetail.img',
        version: 'Subscription / Full Retail',
        size: '~4.8 GB',
        accentColor: '#D83B01'
    },
    {
        id: 'office-2024',
        title: 'Microsoft Office 2024 Professional Plus',
        description: {
            uz: "Yaqinda taqdim etilgan, so'nggi dizayn va AI optimallashtirishlariga ega, bir martalik litsenziyali eng yangi Office to'plami.",
            en: 'The newest perpetual Office release with redesigned modern UI and enhanced performance improvements.',
            ru: 'Новейший бессрочный выпуск Office с современным интерфейсом и повышенной производительностью.'
        },
        downloadUrl: 'https://officecdn.microsoft.com/db/492350f6-3a01-4f97-b9c0-c7c6ddf67d60/media/en-us/ProPlus2024Retail.img',
        version: 'LTSC / Retail v2024',
        size: '~4.7 GB',
        accentColor: '#E04F5F'
    },
    {
        id: 'office-2021',
        title: 'Microsoft Office 2021 Professional Plus',
        description: {
            uz: "Barqaror va ishonchli, eng ommabop ofis ishlari va taqdimotlar tayyorlash uchun optimal tanlov bo'lgan versiya.",
            en: 'Highly stable and widely adopted release, optimal for daily productivity and presentations.',
            ru: 'Стабильная и надежная версия, идеальный выбор для офисной работы, аналитики и создания презентаций.'
        },
        downloadUrl: 'https://officecdn.microsoft.com/db/492350f6-3a01-4f97-b9c0-c7c6ddf67d60/media/en-us/ProPlus2021Retail.img',
        version: 'Retail v2021',
        size: '~4.6 GB',
        accentColor: '#EA4335'
    },
    {
        id: 'office-2019',
        title: 'Microsoft Office 2019 Professional Plus',
        description: {
            uz: "Klassik interfeysga ega, o'rta toifadagi noutbuk va kompyuterlar uchun eng yaxshi ish samaradorligini ta'minlovchi barqaror versiya.",
            en: 'Classic desktop interface with excellent compatibility on mid-range laptops and PCs.',
            ru: 'Классический интерфейс с превосходной совместимостью для ПК и ноутбуков средней мощности.'
        },
        downloadUrl: 'https://officecdn.microsoft.com/db/492350f6-3a01-4f97-b9c0-c7c6ddf67d60/media/en-us/ProPlus2019Retail.img',
        version: 'Retail v2019',
        size: '~3.5 GB',
        accentColor: '#FBBC05'
    },
    {
        id: 'office-2016',
        title: 'Microsoft Office 2016 Professional Plus',
        description: {
            uz: "Eski va resurslari cheklangan past ko'rsatkichli kompyuterlarda ham juda tez ishlovchi, eng barqaror klassik ofis to'plami.",
            en: 'Ultra-fast and lightweight classic suite, runs smoothly even on older legacy systems.',
            ru: 'Легкий и быстрый классический офисный пакет, отлично работающий даже на старых и слабых ПК.'
        },
        downloadUrl: 'https://officecdn.microsoft.com/db/492350f6-3a01-4f97-b9c0-c7c6ddf67d60/media/en-us/ProPlusRetail.img',
        version: 'Retail v2016',
        size: '~3.2 GB',
        accentColor: '#34A853'
    }
];

export default function ProgramsPage() {
    const { t, locale } = useLanguage();
    const [activeMainTab, setActiveMainTab] = useState<'channel' | 'local_ai' | 'free_claude' | 'office'>('channel');
    const [osTab, setOsTab] = useState<'windows' | 'linux_mac'>('windows');
    const [copiedText, setCopiedText] = useState<string | null>(null);

    // Channel programs state
    const [programs, setPrograms] = useState<Program[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        async function fetchPrograms() {
            try {
                const { data, error } = await supabase
                    .from('programs')
                    .select('*')
                    .order('created_at', { ascending: false });

                if (error || !data || data.length === 0) {
                    setPrograms(MOCK_PROGRAMS);
                } else {
                    setPrograms(data);
                }
            } catch (err) {
                console.error('Error fetching programs:', err);
                setPrograms(MOCK_PROGRAMS);
            } finally {
                setLoading(false);
            }
        }

        fetchPrograms();
    }, []);

    const filteredPrograms = programs.filter(program =>
        program.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        program.description.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleCopy = (text: string) => {
        navigator.clipboard.writeText(text);
        setCopiedText(text);
        setTimeout(() => setCopiedText(null), 2000);
    };

    return (
        <div className="pt-8 px-6 max-w-7xl mx-auto min-h-screen">
            <Section>
                {/* Heading */}
                <div className="mb-12 relative">
                    <h1 className="text-4xl md:text-5xl font-black mb-4 tracking-tight">
                        <GradientText animate>{t.programs.title}</GradientText>
                    </h1>
                    <p className="text-gray-400 max-w-2xl">
                        {t.programs.subtitle}
                    </p>
                </div>

                {/* Main Tabs Navigation */}
                <div className="flex border-b border-white/5 mb-10 pb-px overflow-x-auto gap-8 scrollbar-hide">
                    {[
                        { id: 'channel', name: t.programs.tabChannel, icon: Package },
                        { id: 'local_ai', name: t.programs.tabLocalAi, icon: Cpu },
                        { id: 'office', name: t.programs.tabOffice, icon: OfficeLogo as any },
                        { id: 'free_claude', name: t.programs.tabFreeClaude, icon: BookOpen }
                    ].map((tab) => {
                        const Icon = tab.icon;
                        const isActive = activeMainTab === tab.id;
                        return (
                            <button
                                key={tab.id}
                                onClick={() => setActiveMainTab(tab.id as any)}
                                className={`pb-4 text-sm font-semibold flex items-center gap-2.5 transition-all relative whitespace-nowrap ${isActive ? 'text-white' : 'text-gray-400 hover:text-gray-200'
                                    }`}
                            >
                                <Icon className={`w-4 h-4 ${isActive ? 'text-blue-400' : 'text-gray-400'}`} />
                                <span>{tab.name}</span>
                                {isActive && (
                                    <motion.div
                                        layoutId="active-program-tab"
                                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-500 shadow-[0_0_12px_rgba(59,130,246,0.6)]"
                                    />
                                )}
                            </button>
                        );
                    })}
                </div>

                {/* Tab Contents */}
                <AnimatePresence mode="wait">
                    {activeMainTab === 'channel' && (
                        <motion.div
                            key="channel-tab"
                            initial={{ opacity: 0, y: 15 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -15 }}
                            transition={{ duration: 0.3 }}
                            className="space-y-6"
                        >
                            {/* Search bar */}
                            <div className="relative max-w-md">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                <input
                                    type="text"
                                    placeholder={t.programs.searchPlaceholder}
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="w-full bg-white/5 border border-white/10 rounded-xl pl-9 pr-4 py-2.5 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-blue-500/50 transition-colors"
                                />
                            </div>

                            {/* Programs Grid */}
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {loading ? (
                                    Array.from({ length: 3 }).map((_, i) => (
                                        <Card key={i} className="p-6 animate-pulse" hoverEffect={false}>
                                            <div className="h-6 bg-white/10 rounded w-2/3 mb-4" />
                                            <div className="h-4 bg-white/5 rounded w-full mb-2" />
                                            <div className="h-4 bg-white/5 rounded w-4/5 mb-6" />
                                            <div className="h-10 bg-white/10 rounded w-full" />
                                        </Card>
                                    ))
                                ) : filteredPrograms.length > 0 ? (
                                    filteredPrograms.map((prog) => (
                                        <Card key={prog.id} className="p-6 flex flex-col justify-between" hoverEffect={false}>
                                            <div className="space-y-3">
                                                <div className="flex items-center justify-between">
                                                    <span className="text-xs font-mono px-2 py-0.5 rounded bg-blue-500/10 text-blue-400 border border-blue-500/20">
                                                        {prog.version}
                                                    </span>
                                                </div>
                                                <h3 className="text-lg font-bold text-white">{prog.title}</h3>
                                                <p className="text-sm text-gray-400 line-clamp-3">{prog.description}</p>
                                            </div>
                                            <div className="pt-6 mt-6 border-t border-white/5">
                                                <a href={prog.download_url} target="_blank" rel="noopener noreferrer">
                                                    <Button size="sm" className="w-full gap-2">
                                                        <Download className="w-4 h-4" /> {t.programs.downloadBtn}
                                                    </Button>
                                                </a>
                                            </div>
                                        </Card>
                                    ))
                                ) : (
                                    <div className="col-span-full py-12 text-center text-gray-500">
                                        {t.programs.noPrograms}
                                    </div>
                                )}
                            </div>
                        </motion.div>
                    )}

                    {activeMainTab === 'local_ai' && (
                        <motion.div
                            key="local-ai-tab"
                            initial={{ opacity: 0, y: 15 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -15 }}
                            transition={{ duration: 0.3 }}
                            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                        >
                            {LOCAL_AI_TOOLS.map((tool) => (
                                <Card
                                    key={tool.id}
                                    className="p-6 flex flex-col justify-between transition-all duration-300 hover:border-blue-500/20"
                                    hoverEffect={false}
                                >
                                    <div className="space-y-4">
                                        <div className="flex items-center justify-between">
                                            <span
                                                className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded"
                                                style={{
                                                    backgroundColor: `${tool.accentColor}15`,
                                                    color: tool.accentColor,
                                                    border: `1px solid ${tool.accentColor}30`
                                                }}
                                            >
                                                {tool.tag}
                                            </span>
                                            <span className="text-xs text-gray-500 font-mono">{tool.category}</span>
                                        </div>
                                        <h3 className="text-xl font-bold text-white">{tool.title}</h3>
                                        <p className="text-gray-400 text-sm leading-relaxed">
                                            {tool.description[locale] || tool.description.uz}
                                        </p>
                                    </div>

                                    <div className="mt-8 pt-6 border-t border-white/5">
                                        <a href={tool.url} target="_blank" rel="noopener noreferrer" className="block">
                                            <Button
                                                className="w-full"
                                                glow
                                                variant="secondary"
                                                style={{
                                                    backgroundColor: `${tool.accentColor}10`,
                                                    borderColor: `${tool.accentColor}20`,
                                                    color: '#ffffff'
                                                }}
                                            >
                                                <ExternalLink className="w-4 h-4 mr-2" /> {t.programs.visitBtn}
                                            </Button>
                                        </a>
                                    </div>
                                </Card>
                            ))}
                        </motion.div>
                    )}

                    {/* FREE CLAUDE + CODEX (OMNIROUTE) TAB */}
                    {activeMainTab === 'free_claude' && (
                        <motion.div
                            key="free-claude-tab"
                            initial={{ opacity: 0, y: 15 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -15 }}
                            transition={{ duration: 0.3 }}
                            className="space-y-8"
                        >
                            {/* Description Banner */}
                            <div className="p-6 rounded-2xl bg-gradient-to-r from-blue-500/10 via-indigo-500/10 to-purple-500/10 border border-white/10 relative overflow-hidden">
                                <div className="absolute top-0 right-0 opacity-5 blur-sm pointer-events-none">
                                    <Sparkles className="w-64 h-64 text-indigo-500" />
                                </div>
                                <div className="max-w-3xl space-y-3">
                                    <span className="text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded bg-blue-500/20 text-blue-400 border border-blue-500/30">
                                        {t.programs.claudeBadge}
                                    </span>
                                    <h2 className="text-2xl md:text-3xl font-bold tracking-tight">
                                        {t.programs.claudeTitle}
                                    </h2>
                                    <p className="text-gray-300 text-sm leading-relaxed">
                                        {t.programs.claudeDesc}
                                    </p>
                                </div>
                            </div>

                            {/* Video Guide Section - UPDATED WITH USER REQUESTED VIDEO fwbqLuJKIz0 */}
                            <div className="space-y-4 max-w-4xl mx-auto">
                                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                                    <Play className="w-5 h-5 text-red-500 fill-red-500" />
                                    <span>{t.programs.videoGuideTitle}</span>
                                </h3>
                                <div className="aspect-video w-full max-w-3xl mx-auto rounded-2xl overflow-hidden border border-white/10 shadow-[0_0_30px_rgba(255,0,0,0.1)] bg-black/50 backdrop-blur-sm">
                                    <iframe
                                        src="https://www.youtube.com/embed/fwbqLuJKIz0"
                                        title={t.programs.videoIframeTitle}
                                        frameBorder="0"
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                        allowFullScreen
                                        className="w-full h-full"
                                    />
                                </div>
                            </div>

                            {/* OS Selection Toggle */}
                            <div className="flex gap-4 items-center justify-center bg-white/5 p-1.5 rounded-xl max-w-xs mx-auto border border-white/5">
                                <button
                                    onClick={() => setOsTab('windows')}
                                    className={`flex-1 py-2 rounded-lg text-sm font-semibold flex items-center justify-center gap-2 transition-all ${osTab === 'windows'
                                        ? 'bg-white text-black shadow-lg font-bold'
                                        : 'text-gray-400 hover:text-white'
                                        }`}
                                >
                                    <Laptop className="w-4 h-4" /> Windows
                                </button>
                                <button
                                    onClick={() => setOsTab('linux_mac')}
                                    className={`flex-1 py-2 rounded-lg text-sm font-semibold flex items-center justify-center gap-2 transition-all ${osTab === 'linux_mac'
                                        ? 'bg-white text-black shadow-lg font-bold'
                                        : 'text-gray-400 hover:text-white'
                                        }`}
                                >
                                    <Terminal className="w-4 h-4" /> Linux / macOS
                                </button>
                            </div>

                            {/* Steps Content */}
                            <div className="space-y-8 max-w-4xl mx-auto">
                                {osTab === 'windows' ? (
                                    // WINDOWS GUIDE
                                    <div className="space-y-8 animate-fadeIn">
                                        {/* Step 1: Prerequisites */}
                                        <div className="space-y-4">
                                            <h3 className="text-lg font-bold text-white flex items-center gap-3">
                                                <span className="w-6 h-6 rounded-full bg-blue-500/20 text-blue-400 border border-blue-500/30 flex items-center justify-center text-xs">1</span>
                                                {t.programs.winStep1Title}
                                            </h3>
                                            <p className="text-gray-400 text-sm pl-9">
                                                {t.programs.winStep1Desc}
                                            </p>
                                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pl-9">
                                                <Card className="p-4 flex items-center justify-between bg-white/5 hover:border-blue-500/30 transition-colors" hoverEffect={false}>
                                                    <div>
                                                        <h4 className="font-semibold text-white">Git for Windows</h4>
                                                        <p className="text-xs text-gray-500 mt-1">Git Runtime</p>
                                                    </div>
                                                    <a href="https://t.me/Yosh_avlod_kanali/4060" target="_blank" rel="noopener noreferrer">
                                                        <Button size="sm" variant="secondary" className="gap-1.5 text-xs">
                                                            <Download className="w-3.5 h-3.5" /> {t.programs.downloadBtn}
                                                        </Button>
                                                    </a>
                                                </Card>
                                                <Card className="p-4 flex items-center justify-between bg-white/5 hover:border-blue-500/30 transition-colors" hoverEffect={false}>
                                                    <div>
                                                        <h4 className="font-semibold text-white">Node.js (LTS)</h4>
                                                        <p className="text-xs text-gray-500 mt-1">Node runtime</p>
                                                    </div>
                                                    <a href="https://nodejs.org/en/download" target="_blank" rel="noopener noreferrer">
                                                        <Button size="sm" variant="secondary" className="gap-1.5 text-xs">
                                                            <Download className="w-3.5 h-3.5" /> {t.programs.downloadBtn}
                                                        </Button>
                                                    </a>
                                                </Card>
                                            </div>

                                            {/* Admin warning */}
                                            <div className="flex gap-3 p-4 border-l-4 border-red-500/50 bg-red-500/5 rounded-r-xl pl-9 ml-9">
                                                <AlertTriangle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                                                <div>
                                                    <h5 className="font-bold text-red-400 text-sm">{t.programs.winAdminWarningTitle}</h5>
                                                    <p className="text-gray-400 text-xs mt-1">
                                                        {t.programs.winAdminWarningDesc}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Step 2: Set Execution Policy */}
                                        <div className="space-y-4">
                                            <h3 className="text-lg font-bold text-white flex items-center gap-3">
                                                <span className="w-6 h-6 rounded-full bg-blue-500/20 text-blue-400 border border-blue-500/30 flex items-center justify-center text-xs">2</span>
                                                {t.programs.winStep2Title}
                                            </h3>
                                            <p className="text-gray-400 text-sm pl-9">
                                                {t.programs.winStep2Desc}
                                            </p>
                                            <div className="pl-9">
                                                <div className="relative group">
                                                    <pre className="bg-black/40 border border-white/10 p-4 rounded-xl font-mono text-xs overflow-x-auto text-blue-400 pr-16 select-all">
                                                        Set-ExecutionPolicy RemoteSigned -Scope CurrentUser
                                                    </pre>
                                                    <button
                                                        onClick={() => handleCopy('Set-ExecutionPolicy RemoteSigned -Scope CurrentUser')}
                                                        className="absolute right-3 top-3 p-2 bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white rounded-lg transition-all"
                                                        title="Copy"
                                                    >
                                                        {copiedText === 'Set-ExecutionPolicy RemoteSigned -Scope CurrentUser' ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
                                                    </button>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Step 3: Install OmniRoute */}
                                        <div className="space-y-4">
                                            <h3 className="text-lg font-bold text-white flex items-center gap-3">
                                                <span className="w-6 h-6 rounded-full bg-blue-500/20 text-blue-400 border border-blue-500/30 flex items-center justify-center text-xs">3</span>
                                                {t.programs.winStep3Title}
                                            </h3>
                                            <p className="text-gray-400 text-sm pl-9">
                                                {t.programs.winStep3Desc}
                                            </p>
                                            <div className="pl-9">
                                                <div className="relative group">
                                                    <pre className="bg-black/40 border border-white/10 p-4 rounded-xl font-mono text-xs overflow-x-auto text-blue-400 pr-16 select-all">
                                                        npm install -g omniroute
                                                    </pre>
                                                    <button
                                                        onClick={() => handleCopy('npm install -g omniroute')}
                                                        className="absolute right-3 top-3 p-2 bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white rounded-lg transition-all"
                                                        title="Copy"
                                                    >
                                                        {copiedText === 'npm install -g omniroute' ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
                                                    </button>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Step 4: Install Claude Code CLI */}
                                        <div className="space-y-4">
                                            <h3 className="text-lg font-bold text-white flex items-center gap-3">
                                                <span className="w-6 h-6 rounded-full bg-blue-500/20 text-blue-400 border border-blue-500/30 flex items-center justify-center text-xs">4</span>
                                                {t.programs.winStep4Title}
                                            </h3>
                                            <p className="text-gray-400 text-sm pl-9">
                                                {t.programs.winStep4Desc}
                                            </p>
                                            <div className="pl-9">
                                                <div className="relative group">
                                                    <pre className="bg-black/40 border border-white/10 p-4 rounded-xl font-mono text-xs overflow-x-auto text-blue-400 pr-16 select-all">
                                                        irm https://claude.ai/install.ps1 | iex
                                                    </pre>
                                                    <button
                                                        onClick={() => handleCopy('irm https://claude.ai/install.ps1 | iex')}
                                                        className="absolute right-3 top-3 p-2 bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white rounded-lg transition-all"
                                                        title="Copy"
                                                    >
                                                        {copiedText === 'irm https://claude.ai/install.ps1 | iex' ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
                                                    </button>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Step 5: Start OmniRoute & Configure Keys */}
                                        <div className="space-y-4">
                                            <h3 className="text-lg font-bold text-white flex items-center gap-3">
                                                <span className="w-6 h-6 rounded-full bg-blue-500/20 text-blue-400 border border-blue-500/30 flex items-center justify-center text-xs">5</span>
                                                {t.programs.winStep5Title}
                                            </h3>
                                            <p className="text-gray-400 text-sm pl-9">
                                                {t.programs.winStep5Desc}
                                            </p>
                                            <div className="pl-9">
                                                <div className="relative group">
                                                    <pre className="bg-black/40 border border-white/10 p-4 rounded-xl font-mono text-xs overflow-x-auto text-blue-400 pr-16 select-all">
                                                        omniroute
                                                    </pre>
                                                    <button
                                                        onClick={() => handleCopy('omniroute')}
                                                        className="absolute right-3 top-3 p-2 bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white rounded-lg transition-all"
                                                        title="Copy"
                                                    >
                                                        {copiedText === 'omniroute' ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
                                                    </button>
                                                </div>
                                            </div>

                                            {/* Key providers sub-block */}
                                            <div className="pl-9 space-y-4">
                                                <p className="text-gray-300 text-sm">
                                                    {t.programs.keyProvidersDesc}
                                                </p>
                                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                                    <a href="https://aistudio.google.com/app/apikey" target="_blank" rel="noopener noreferrer" className="block">
                                                        <Card className="p-3 bg-white/5 hover:border-blue-500/30 text-center text-xs font-semibold text-gray-300" hoverEffect={false}>
                                                            Google AI Studio API
                                                            <ExternalLink className="w-3 h-3 inline-block ml-1 opacity-70" />
                                                        </Card>
                                                    </a>
                                                    <a href="https://build.nvidia.com/" target="_blank" rel="noopener noreferrer" className="block">
                                                        <Card className="p-3 bg-white/5 hover:border-emerald-500/30 text-center text-xs font-semibold text-gray-300" hoverEffect={false}>
                                                            NVIDIA NIM API
                                                            <ExternalLink className="w-3 h-3 inline-block ml-1 opacity-70" />
                                                        </Card>
                                                    </a>
                                                    <a href="https://openrouter.ai/sign-in?redirect_url=https%3A%2F%2Fopenrouter.ai%2Fworkspaces%2Fdefault%2Fkeys" target="_blank" rel="noopener noreferrer" className="block">
                                                        <Card className="p-3 bg-white/5 hover:border-purple-500/30 text-center text-xs font-semibold text-gray-300" hoverEffect={false}>
                                                            OpenRouter API
                                                            <ExternalLink className="w-3 h-3 inline-block ml-1 opacity-70" />
                                                        </Card>
                                                    </a>
                                                </div>

                                                <div className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-2">
                                                    <h5 className="font-bold text-sm text-white flex items-center gap-1.5">
                                                        <Info className="w-4 h-4 text-blue-400" /> {t.programs.routingSyntaxTitle}
                                                    </h5>
                                                    <ul className="text-xs text-gray-400 space-y-1 list-disc pl-5">
                                                        <li>{t.programs.routingSyntax1}</li>
                                                        <li>{t.programs.routingSyntax2}</li>
                                                        <li>{t.programs.routingSyntax3}</li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Step 6: Launch Claude Code & Codex */}
                                        <div className="space-y-4">
                                            <h3 className="text-lg font-bold text-white flex items-center gap-3">
                                                <span className="w-6 h-6 rounded-full bg-blue-500/20 text-blue-400 border border-blue-500/30 flex items-center justify-center text-xs">6</span>
                                                {t.programs.winStep6Title}
                                            </h3>

                                            {/* Crucial Note */}
                                            <div className="flex gap-3 p-4 border-l-4 border-yellow-500/50 bg-yellow-500/5 rounded-r-xl pl-9 ml-9">
                                                <AlertTriangle className="w-5 h-5 text-yellow-500 flex-shrink-0 mt-0.5" />
                                                <div>
                                                    <h5 className="font-bold text-yellow-400 text-sm">{t.programs.keepServerWarningTitle}</h5>
                                                    <p className="text-gray-400 text-xs mt-1">
                                                        {t.programs.keepServerWarningDesc}
                                                    </p>
                                                </div>
                                            </div>

                                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pl-9 mt-4">
                                                <Card className="p-4 bg-white/5 border border-white/5 space-y-3" hoverEffect={false}>
                                                    <div className="flex items-center gap-2 text-sm font-semibold text-white">
                                                        <Terminal className="w-4 h-4 text-blue-400" />
                                                        <span>{t.programs.claudeClientLabel}</span>
                                                    </div>
                                                    <div className="relative">
                                                        <pre className="bg-black/30 p-2.5 rounded-lg text-xs font-mono text-blue-400 pr-10">
                                                            omniroute launch
                                                        </pre>
                                                        <button
                                                            onClick={() => handleCopy('omniroute launch')}
                                                            className="absolute right-2 top-2 p-1.5 bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white rounded transition-all"
                                                        >
                                                            {copiedText === 'omniroute launch' ? <Check className="w-3 h-3 text-green-400" /> : <Copy className="w-3 h-3" />}
                                                        </button>
                                                    </div>
                                                    <p className="text-xs text-gray-500">{t.programs.claudeClientDesc}</p>
                                                </Card>
                                                <Card className="p-4 bg-white/5 border border-white/5 space-y-3" hoverEffect={false}>
                                                    <div className="flex items-center gap-2 text-sm font-semibold text-white">
                                                        <Terminal className="w-4 h-4 text-purple-400" />
                                                        <span>{t.programs.codexClientLabel}</span>
                                                    </div>
                                                    <div className="relative">
                                                        <pre className="bg-black/30 p-2.5 rounded-lg text-xs font-mono text-purple-400 pr-10">
                                                            omniroute launch-codex
                                                        </pre>
                                                        <button
                                                            onClick={() => handleCopy('omniroute launch-codex')}
                                                            className="absolute right-2 top-2 p-1.5 bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white rounded transition-all"
                                                        >
                                                            {copiedText === 'omniroute launch-codex' ? <Check className="w-3 h-3 text-green-400" /> : <Copy className="w-3 h-3" />}
                                                        </button>
                                                    </div>
                                                    <p className="text-xs text-gray-500">{t.programs.codexClientDesc}</p>
                                                </Card>
                                            </div>
                                        </div>
                                    </div>
                                ) : (
                                    // LINUX / MACOS GUIDE
                                    <div className="space-y-8 animate-fadeIn">
                                        {/* Step 1: Install Node.js & Git */}
                                        <div className="space-y-4">
                                            <h3 className="text-lg font-bold text-white flex items-center gap-3">
                                                <span className="w-6 h-6 rounded-full bg-blue-500/20 text-blue-400 border border-blue-500/30 flex items-center justify-center text-xs">1</span>
                                                {t.programs.linuxStep1Title}
                                            </h3>
                                            <p className="text-gray-400 text-sm pl-9">
                                                {t.programs.linuxStep1Desc}
                                            </p>

                                            <div className="pl-9 space-y-3">
                                                {/* Ubuntu/Debian/Kali/Mint */}
                                                <div className="space-y-1.5">
                                                    <div className="text-xs font-semibold text-gray-400">Ubuntu / Debian / Kali / Mint:</div>
                                                    <div className="relative">
                                                        <pre className="bg-black/40 border border-white/10 p-3 rounded-xl font-mono text-xs overflow-x-auto text-blue-400 pr-16 select-all">
                                                            sudo apt install nodejs npm -y
                                                        </pre>
                                                        <button
                                                            onClick={() => handleCopy('sudo apt install nodejs npm -y')}
                                                            className="absolute right-3 top-2.5 p-1.5 bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white rounded-lg transition-all"
                                                        >
                                                            {copiedText === 'sudo apt install nodejs npm -y' ? <Check className="w-3.5 h-3.5 text-green-400" /> : <Copy className="w-3.5 h-3.5" />}
                                                        </button>
                                                    </div>
                                                </div>

                                                {/* Fedora */}
                                                <div className="space-y-1.5">
                                                    <div className="text-xs font-semibold text-gray-400">Fedora:</div>
                                                    <div className="relative">
                                                        <pre className="bg-black/40 border border-white/10 p-3 rounded-xl font-mono text-xs overflow-x-auto text-blue-400 pr-16 select-all">
                                                            sudo dnf install nodejs -y
                                                        </pre>
                                                        <button
                                                            onClick={() => handleCopy('sudo dnf install nodejs -y')}
                                                            className="absolute right-3 top-2.5 p-1.5 bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white rounded-lg transition-all"
                                                        >
                                                            {copiedText === 'sudo dnf install nodejs -y' ? <Check className="w-3.5 h-3.5 text-green-400" /> : <Copy className="w-3.5 h-3.5" />}
                                                        </button>
                                                    </div>
                                                </div>

                                                {/* Arch Linux */}
                                                <div className="space-y-1.5">
                                                    <div className="text-xs font-semibold text-gray-400">Arch Linux:</div>
                                                    <div className="relative">
                                                        <pre className="bg-black/40 border border-white/10 p-3 rounded-xl font-mono text-xs overflow-x-auto text-blue-400 pr-16 select-all">
                                                            sudo pacman -Syu nodejs npm
                                                        </pre>
                                                        <button
                                                            onClick={() => handleCopy('sudo pacman -Syu nodejs npm')}
                                                            className="absolute right-3 top-2.5 p-1.5 bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white rounded-lg transition-all"
                                                        >
                                                            {copiedText === 'sudo pacman -Syu nodejs npm' ? <Check className="w-3.5 h-3.5 text-green-400" /> : <Copy className="w-3.5 h-3.5" />}
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Step 2: Install OmniRoute */}
                                        <div className="space-y-4">
                                            <h3 className="text-lg font-bold text-white flex items-center gap-3">
                                                <span className="w-6 h-6 rounded-full bg-blue-500/20 text-blue-400 border border-blue-500/30 flex items-center justify-center text-xs">2</span>
                                                {t.programs.linuxStep2Title}
                                            </h3>
                                            <p className="text-gray-400 text-sm pl-9">
                                                {t.programs.linuxStep2Desc}
                                            </p>
                                            <div className="pl-9">
                                                <div className="relative">
                                                    <pre className="bg-black/40 border border-white/10 p-4 rounded-xl font-mono text-xs overflow-x-auto text-blue-400 pr-16 select-all">
                                                        npm install -g omniroute
                                                    </pre>
                                                    <button
                                                        onClick={() => handleCopy('npm install -g omniroute')}
                                                        className="absolute right-3 top-3 p-2 bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white rounded-lg transition-all"
                                                    >
                                                        {copiedText === 'npm install -g omniroute' ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
                                                    </button>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Step 3: Allow Scripts */}
                                        <div className="space-y-4">
                                            <h3 className="text-lg font-bold text-white flex items-center gap-3">
                                                <span className="w-6 h-6 rounded-full bg-blue-500/20 text-blue-400 border border-blue-500/30 flex items-center justify-center text-xs">3</span>
                                                {t.programs.linuxStep3Title}
                                            </h3>
                                            <p className="text-gray-400 text-sm pl-9">
                                                {t.programs.linuxStep3Desc}
                                            </p>
                                            <div className="pl-9">
                                                <div className="relative">
                                                    <pre className="bg-black/40 border border-white/10 p-4 rounded-xl font-mono text-xs overflow-x-auto text-blue-400 pr-16 select-all">
                                                        npm config set allow-scripts=omniroute,tls-client-node,core-js,@parcel/watcher,@swc/core,koffi,esbuild --location=user
                                                    </pre>
                                                    <button
                                                        onClick={() => handleCopy('npm config set allow-scripts=omniroute,tls-client-node,core-js,@parcel/watcher,@swc/core,koffi,esbuild --location=user')}
                                                        className="absolute right-3 top-3 p-2 bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white rounded-lg transition-all"
                                                    >
                                                        {copiedText === 'npm config set allow-scripts=omniroute,tls-client-node,core-js,@parcel/watcher,@swc/core,koffi,esbuild --location=user' ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
                                                    </button>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Step 4: Install Claude Code */}
                                        <div className="space-y-4">
                                            <h3 className="text-lg font-bold text-white flex items-center gap-3">
                                                <span className="w-6 h-6 rounded-full bg-blue-500/20 text-blue-400 border border-blue-500/30 flex items-center justify-center text-xs">4</span>
                                                {t.programs.linuxStep4Title}
                                            </h3>
                                            <p className="text-gray-400 text-sm pl-9">
                                                {t.programs.linuxStep4Desc}
                                            </p>
                                            <div className="pl-9">
                                                <div className="relative">
                                                    <pre className="bg-black/40 border border-white/10 p-4 rounded-xl font-mono text-xs text-blue-400 pr-16">
                                                        curl -fsSL https://claude.ai/install.sh | bash
                                                    </pre>
                                                    <button
                                                        onClick={() => handleCopy('curl -fsSL https://claude.ai/install.sh | bash')}
                                                        className="absolute right-3 top-3 p-2 bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white rounded-lg transition-all"
                                                    >
                                                        {copiedText === 'curl -fsSL https://claude.ai/install.sh | bash' ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
                                                    </button>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Step 5: Start Server */}
                                        <div className="space-y-4">
                                            <h3 className="text-lg font-bold text-white flex items-center gap-3">
                                                <span className="w-6 h-6 rounded-full bg-blue-500/20 text-blue-400 border border-blue-500/30 flex items-center justify-center text-xs">5</span>
                                                {t.programs.linuxStep5Title}
                                            </h3>
                                            <p className="text-gray-400 text-sm pl-9">
                                                {t.programs.linuxStep5Desc}
                                            </p>
                                            <div className="pl-9">
                                                <div className="relative">
                                                    <pre className="bg-black/40 border border-white/10 p-4 rounded-xl font-mono text-xs text-blue-400 pr-16">
                                                        omniroute
                                                    </pre>
                                                    <button
                                                        onClick={() => handleCopy('omniroute')}
                                                        className="absolute right-3 top-3 p-2 bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white rounded-lg transition-all"
                                                    >
                                                        {copiedText === 'omniroute' ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
                                                    </button>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Step 6: Launch Clients in New Terminal */}
                                        <div className="space-y-4">
                                            <h3 className="text-lg font-bold text-white flex items-center gap-3">
                                                <span className="w-6 h-6 rounded-full bg-blue-500/20 text-blue-400 border border-blue-500/30 flex items-center justify-center text-xs">6</span>
                                                {t.programs.linuxStep6Title}
                                            </h3>

                                            {/* Note */}
                                            <div className="flex gap-3 p-4 border-l-4 border-yellow-500/50 bg-yellow-500/5 rounded-r-xl pl-9 ml-9">
                                                <AlertTriangle className="w-5 h-5 text-yellow-500 flex-shrink-0 mt-0.5" />
                                                <div>
                                                    <h5 className="font-bold text-yellow-400 text-sm">{t.programs.linuxServerWarningTitle}</h5>
                                                    <p className="text-gray-400 text-xs mt-1">
                                                        {t.programs.linuxServerWarningDesc}
                                                    </p>
                                                </div>
                                            </div>

                                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pl-9 mt-4">
                                                <Card className="p-4 bg-white/5 border border-white/5 space-y-3" hoverEffect={false}>
                                                    <div className="flex items-center gap-2 text-sm font-semibold text-white">
                                                        <Terminal className="w-4 h-4 text-blue-400" />
                                                        <span>{t.programs.claudeClientLabel}</span>
                                                    </div>
                                                    <div className="relative">
                                                        <pre className="bg-black/30 p-2.5 rounded-lg text-xs font-mono text-blue-400 pr-10">
                                                            omniroute launch
                                                        </pre>
                                                        <button
                                                            onClick={() => handleCopy('omniroute launch')}
                                                            className="absolute right-2 top-2 p-1.5 bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white rounded transition-all"
                                                        >
                                                            {copiedText === 'omniroute launch' ? <Check className="w-3 h-3 text-green-400" /> : <Copy className="w-3 h-3" />}
                                                        </button>
                                                    </div>
                                                </Card>
                                                <Card className="p-4 bg-white/5 border border-white/5 space-y-3" hoverEffect={false}>
                                                    <div className="flex items-center gap-2 text-sm font-semibold text-white">
                                                        <Terminal className="w-4 h-4 text-purple-400" />
                                                        <span>{t.programs.codexClientLabel}</span>
                                                    </div>
                                                    <div className="relative">
                                                        <pre className="bg-black/30 p-2.5 rounded-lg text-xs font-mono text-purple-400 pr-10">
                                                            omniroute launch-codex
                                                        </pre>
                                                        <button
                                                            onClick={() => handleCopy('omniroute launch-codex')}
                                                            className="absolute right-2 top-2 p-1.5 bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white rounded transition-all"
                                                        >
                                                            {copiedText === 'omniroute launch-codex' ? <Check className="w-3 h-3 text-green-400" /> : <Copy className="w-3 h-3" />}
                                                        </button>
                                                    </div>
                                                </Card>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </motion.div>
                    )}

                    {/* MICROSOFT OFFICE TAB */}
                    {activeMainTab === 'office' && (
                        <motion.div
                            key="office-tab"
                            initial={{ opacity: 0, y: 15 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -15 }}
                            transition={{ duration: 0.3 }}
                            className="space-y-6"
                        >
                            <div className="mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
                                <div>
                                    <h2 className="text-2xl font-bold mb-2">{t.programs.officeHeading}</h2>
                                    <p className="text-gray-400 max-w-3xl text-sm">
                                        {t.programs.officeDesc}
                                    </p>
                                </div>
                                <a href="/os#activation" className="flex-shrink-0">
                                    <Button size="sm" variant="secondary" className="border-orange-500/30 text-orange-400 hover:bg-orange-500/10">
                                        {t.programs.officeActivationBtn}
                                    </Button>
                                </a>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {OFFICE_PRODUCTS.map((prod) => (
                                    <Card
                                        key={prod.id}
                                        className="p-6 flex flex-col justify-between transition-all duration-300 hover:border-orange-500/20"
                                        hoverEffect={false}
                                    >
                                        <div className="space-y-4">
                                            <div
                                                className="w-12 h-12 rounded-xl flex items-center justify-center text-white"
                                                style={{ backgroundColor: `${prod.accentColor}15`, border: `1px solid ${prod.accentColor}30` }}
                                            >
                                                <OfficeLogo className="w-6 h-6" />
                                            </div>
                                            <div>
                                                <div className="flex items-center justify-between gap-2">
                                                    <h3 className="text-xl font-bold truncate" title={prod.title}>{prod.title}</h3>
                                                </div>
                                                <div className="flex flex-wrap gap-1.5 mt-2">
                                                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-white/5 text-gray-400">
                                                        {prod.version}
                                                    </span>
                                                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-white/5 text-gray-400 flex items-center gap-1">
                                                        <HardDrive className="w-3 h-3" /> {prod.size}
                                                    </span>
                                                </div>
                                            </div>
                                            <p className="text-gray-400 text-sm leading-relaxed">
                                                {prod.description[locale] || prod.description.uz}
                                            </p>
                                        </div>

                                        <div className="mt-8 pt-6 border-t border-white/5">
                                            <a href={prod.downloadUrl} target="_blank" rel="noopener noreferrer" className="block">
                                                <Button
                                                    className="w-full"
                                                    glow
                                                    variant="secondary"
                                                    style={{
                                                        backgroundColor: `${prod.accentColor}10`,
                                                        borderColor: `${prod.accentColor}20`,
                                                        color: '#ffffff'
                                                    }}
                                                >
                                                    <Download className="w-4 h-4 mr-2" /> {t.programs.downloadBtn}
                                                </Button>
                                            </a>
                                        </div>
                                    </Card>
                                ))}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </Section>
        </div>
    );
}
