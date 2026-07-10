'use client';

import { useEffect, useState, useMemo } from 'react';
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
    CheckCircle,
    Info,
    Laptop,
    Server,
    Play,
    HardDrive
} from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { Program } from '@/lib/types';
import { motion, AnimatePresence } from 'framer-motion';

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
        title: 'O\'quv To\'plami 2024',
        description: 'Bizning eng yangi video darslarimiz uchun to\'liq manbalar to\'plami.',
        download_url: '#',
        version: 'v2.0.1',
        created_at: new Date().toISOString(),
    },
];

// Local AI Tools Data
interface LocalAITool {
    id: string;
    title: string;
    description: string;
    url: string;
    tag: string;
    category: 'Engine' | 'GUI' | 'Hub' | 'Suite';
    accentColor: string;
}

const LOCAL_AI_TOOLS: LocalAITool[] = [
    {
        id: 'ollama',
        title: 'Ollama',
        description: 'Llama 3, Mistral, Qwen2.5 va boshqa eng ilg\'or ochiq kodli model turlarini shaxsiy kompyuteringizda (CPU/GPU) osongina ishga tushirish uchun eng mashhur terminal vositasi.',
        url: 'https://ollama.com/',
        tag: 'Local Engine',
        category: 'Engine',
        accentColor: '#38bdf8'
    },
    {
        id: 'lmstudio',
        title: 'LM Studio',
        description: 'Hugging Face-dagi har qanday modelni osongina yuklab olish, sozlash va chiroyli grafik interfeys (GUI) orqali chat shaklida ishlatish uchun qulay va kuchli desktop ilova.',
        url: 'https://lmstudio.ai/',
        tag: 'Desktop GUI',
        category: 'GUI',
        accentColor: '#a855f7'
    },
    {
        id: 'anythingllm',
        title: 'AnythingLLM',
        description: 'Fayllaringiz va hujjatlaringiz bilan local RAG (tahlil) tizimini o\'rnatish uchun ideal all-in-one yordamchi. Istalgan local yoki tashqi modelga ulanadi.',
        url: 'https://anythingllm.com/',
        tag: 'AI Agent & RAG',
        category: 'Suite',
        accentColor: '#10b981'
    },
    {
        id: 'openwebui',
        title: 'Open WebUI',
        description: 'Ollama, LM Studio va OpenAI formatidagi barcha API ulanishlar uchun yaratilgan, ChatGPT interfeysiga juda o\'xshash bo\'lgan eng boy funksiyali ochiq kodli veb-interfeys.',
        url: 'https://github.com/open-webui/open-webui',
        tag: 'Web GUI',
        category: 'GUI',
        accentColor: '#f43f5e'
    },
    {
        id: 'huggingface',
        title: 'Hugging Face',
        description: 'Dunyodagi eng yirik ochiq kodli AI hamjamiyati platformasi. Millionlab modellar (GGUF, Safetensors), datasetlar va AI dasturlar manbayi.',
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
    description: string;
    downloadUrl: string;
    version: string;
    size: string;
    accentColor: string;
}

const OFFICE_PRODUCTS: OfficeProduct[] = [
    {
        id: 'office-365',
        title: 'Microsoft Office 365 ProPlus',
        description: 'Bulutga asoslangan, eng so\'nggi funksiyalar va doimiy yangilanishlarga ega Microsoft Office-ning to\'liq paketi (Word, Excel, PowerPoint, Outlook va boshqalar).',
        downloadUrl: 'https://officecdn.microsoft.com/db/492350f6-3a01-4f97-b9c0-c7c6ddf67d60/media/en-us/O365ProPlusRetail.img',
        version: 'Subscription / Full Retail',
        size: '~4.8 GB',
        accentColor: '#D83B01'
    },
    {
        id: 'office-2024',
        title: 'Microsoft Office 2024 Professional Plus',
        description: 'Yaqinda taqdim etilgan, so\'nggi dizayn va AI optimallashtirishlariga ega, bir martalik litsenziyali eng yangi Office to\'plami.',
        downloadUrl: 'https://officecdn.microsoft.com/db/492350f6-3a01-4f97-b9c0-c7c6ddf67d60/media/en-us/ProPlus2024Retail.img',
        version: 'LTSC / Retail v2024',
        size: '~4.7 GB',
        accentColor: '#E04F5F'
    },
    {
        id: 'office-2021',
        title: 'Microsoft Office 2021 Professional Plus',
        description: 'Barqaror va ishonchli, eng ommabop ofis ishlari va taqdimotlar tayyorlash uchun optimal tanlov bo\'lgan versiya.',
        downloadUrl: 'https://officecdn.microsoft.com/db/492350f6-3a01-4f97-b9c0-c7c6ddf67d60/media/en-us/ProPlus2021Retail.img',
        version: 'Retail v2021',
        size: '~4.6 GB',
        accentColor: '#EA4335'
    },
    {
        id: 'office-2019',
        title: 'Microsoft Office 2019 Professional Plus',
        description: 'Klassik interfeysga ega, o\'rta toifadagi noutbuk va kompyuterlar uchun eng yaxshi ish samaradorligini ta\'minlovchi barqaror versiya.',
        downloadUrl: 'https://officecdn.microsoft.com/db/492350f6-3a01-4f97-b9c0-c7c6ddf67d60/media/en-us/ProPlus2019Retail.img',
        version: 'Retail v2019',
        size: '~3.5 GB',
        accentColor: '#FBBC05'
    },
    {
        id: 'office-2016',
        title: 'Microsoft Office 2016 Professional Plus',
        description: 'Eski va resurslari cheklangan past ko\'rsatkichli kompyuterlarda ham juda tez ishlovchi, eng barqaror klassik ofis to\'plami.',
        downloadUrl: 'https://officecdn.microsoft.com/db/492350f6-3a01-4f97-b9c0-c7c6ddf67d60/media/en-us/ProPlusRetail.img',
        version: 'Retail v2016',
        size: '~3.2 GB',
        accentColor: '#34A853'
    }
];

export default function ProgramsPage() {
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
                    console.log('Using mock data (Supabase empty or error)');
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
                        <GradientText animate>Dasturlar va Resurslar</GradientText>
                    </h1>
                    <p className="text-gray-400 max-w-2xl">
                        Foydali tizim vositalari, mahalliy AI dasturlari hamda mutaxassislar uchun maxsus bepul yo&apos;riqnomalarni toping.
                    </p>
                </div>

                {/* Main Tabs Navigation */}
                <div className="flex border-b border-white/5 mb-10 pb-px overflow-x-auto gap-8 scrollbar-hide">
                    {[
                        { id: 'channel', name: 'Kanal Dasturlari', icon: Package },
                        { id: 'local_ai', name: 'Local AI Dasturlari', icon: Cpu },
                        { id: 'office', name: 'Microsoft Office', icon: OfficeLogo as any },
                        { id: 'free_claude', name: 'Free Claude + Codex', icon: BookOpen }
                    ].map((tab) => {
                        const Icon = tab.icon;
                        const isActive = activeMainTab === tab.id;
                        return (
                            <button
                                key={tab.id}
                                onClick={() => setActiveMainTab(tab.id as any)}
                                className={`flex items-center gap-2 pb-4 text-sm font-semibold transition-all duration-300 relative whitespace-nowrap ${isActive ? 'text-white' : 'text-gray-500 hover:text-gray-300'
                                    }`}
                            >
                                <Icon className="w-4 h-4" />
                                <span>{tab.name}</span>
                                {isActive && (
                                    <motion.div
                                        layoutId="active-main-tab-bar"
                                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.6)]"
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
                        >
                            {/* Search bar */}
                            <div className="relative max-w-md mb-8">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Search className="h-5 w-5 text-gray-400" />
                                </div>
                                <input
                                    type="text"
                                    className="block w-full pl-10 pr-4 py-2.5 border border-white/10 rounded-xl leading-5 bg-white/5 text-white placeholder-gray-400 focus:outline-none focus:bg-white/10 focus:ring-1 focus:ring-blue-500/50 transition-all backdrop-blur-sm"
                                    placeholder="Dasturlarni qidirish..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                            </div>

                            {loading ? (
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {[1, 2, 3].map((i) => (
                                        <div key={i} className="h-48 bg-white/5 animate-pulse rounded-xl" />
                                    ))}
                                </div>
                            ) : (
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {filteredPrograms.length > 0 ? (
                                        filteredPrograms.map((program) => (
                                            <Card key={program.id} className="p-6 flex flex-col justify-between hover:border-blue-500/30 transition-colors">
                                                <div className="space-y-4">
                                                    <div className="w-12 h-12 bg-blue-500/10 rounded-lg flex items-center justify-center text-blue-400">
                                                        <Package className="w-6 h-6" />
                                                    </div>
                                                    <div>
                                                        <h3 className="text-xl font-bold">{program.title}</h3>
                                                        <p className="text-sm text-blue-400 font-mono mt-1">{program.version}</p>
                                                    </div>
                                                    <p className="text-gray-400 text-sm leading-relaxed">{program.description}</p>
                                                </div>

                                                <div className="mt-8 pt-6 border-t border-white/5">
                                                    <a href={program.download_url} target="_blank" rel="noopener noreferrer" className="block">
                                                        <Button className="w-full" glow variant="secondary">
                                                            <Download className="w-4 h-4 mr-2" /> Yuklab Olish
                                                        </Button>
                                                    </a>
                                                </div>
                                            </Card>
                                        ))
                                    ) : (
                                        <div className="col-span-full py-12 text-center text-gray-500">
                                            Sizning so&apos;rovingiz bo&apos;yicha hech narsa topilmadi.
                                        </div>
                                    )}
                                </div>
                            )}
                        </motion.div>
                    )}

                    {activeMainTab === 'local_ai' && (
                        <motion.div
                            key="local-ai-tab"
                            initial={{ opacity: 0, y: 15 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -15 }}
                            transition={{ duration: 0.3 }}
                            className="space-y-6"
                        >
                            <div className="mb-6">
                                <h2 className="text-2xl font-bold mb-2">Local AI Tizimlari</h2>
                                <p className="text-gray-400 max-w-3xl text-sm">
                                    Hech qanday serverlar va internetga ulanishlarsiz shaxsiy kompyuteringizda sun&apos;iy intellekt modellarini ishga tushirish, boshqarish va integratsiya qilish uchun zaruriy ilovalar va manbalar.
                                </p>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {LOCAL_AI_TOOLS.map((tool) => (
                                    <Card
                                        key={tool.id}
                                        className="p-6 flex flex-col justify-between transition-all duration-300"
                                        hoverEffect={false}
                                        style={{
                                            boxShadow: `hover:0 10px 40px -10px ${tool.accentColor}20`
                                        }}
                                    >
                                        <div className="space-y-4">
                                            <div
                                                className="w-12 h-12 rounded-lg flex items-center justify-center text-white"
                                                style={{ backgroundColor: `${tool.accentColor}15`, border: `1px solid ${tool.accentColor}30` }}
                                            >
                                                <Cpu className="w-6 h-6" style={{ color: tool.accentColor }} />
                                            </div>
                                            <div>
                                                <div className="flex items-center justify-between">
                                                    <h3 className="text-xl font-bold">{tool.title}</h3>
                                                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-white/5 text-gray-400">
                                                        {tool.tag}
                                                    </span>
                                                </div>
                                            </div>
                                            <p className="text-gray-400 text-sm leading-relaxed">{tool.description}</p>
                                        </div>

                                        <div className="mt-8 pt-4 border-t border-white/5">
                                            <a href={tool.url} target="_blank" rel="noopener noreferrer" className="block">
                                                <Button
                                                    className="w-full"
                                                    variant="secondary"
                                                    style={{
                                                        background: 'rgba(255,255,255,0.05)',
                                                        borderColor: 'rgba(255,255,255,0.05)'
                                                    }}
                                                >
                                                    Tashrif Buyurish <ExternalLink className="w-3.5 h-3.5 ml-2" />
                                                </Button>
                                            </a>
                                        </div>
                                    </Card>
                                ))}
                            </div>
                        </motion.div>
                    )}

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
                            <div className="p-6 rounded-2xl bg-gradient-to-r from-blue-500/10 to-indigo-500/10 border border-white/10 relative overflow-hidden">
                                <div className="absolute top-0 right-0 opacity-5 blur-sm pointer-events-none">
                                    <Sparkles className="w-64 h-64 text-indigo-500" />
                                </div>
                                <div className="max-w-3xl space-y-3">
                                    <span className="text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded bg-blue-500/20 text-blue-400 border border-blue-500/30">
                                        Maxsus Yo&apos;riqnoma
                                    </span>
                                    <h2 className="text-2xl md:text-3xl font-bold tracking-tight">Claude Code + Codex: Bepul O&apos;rnatish va Sozlash</h2>
                                    <p className="text-gray-300 text-sm leading-relaxed">
                                        Claude Code terminal yordamchisini va Codex-ni bepul AI API provayderlari (Google Gemini, NVIDIA NIM, OpenRouter) yoki mutlaqo shaxsiy local modellar bilan integratsiya qilish yo&apos;riqnomasi.
                                    </p>
                                </div>
                            </div>

                            {/* Video Guide Section */}
                            <div className="space-y-4 max-w-4xl mx-auto">
                                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                                    <Play className="w-5 h-5 text-red-500 fill-red-500" />
                                    <span>Video Qo&apos;llanma</span>
                                </h3>
                                <div className="aspect-video w-full max-w-3xl mx-auto rounded-2xl overflow-hidden border border-white/10 shadow-[0_0_30px_rgba(255,0,0,0.05)] bg-black/50 backdrop-blur-sm">
                                    <iframe
                                        src="https://www.youtube.com/embed/_L3cHupdU2g"
                                        title="Claude Code + Codex Bepul O'rnatish Qo'llanmasi"
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
                                        ? 'bg-white text-black shadow-lg'
                                        : 'text-gray-400 hover:text-white'
                                        }`}
                                >
                                    <Laptop className="w-4 h-4" /> Windows
                                </button>
                                <button
                                    onClick={() => setOsTab('linux_mac')}
                                    className={`flex-1 py-2 rounded-lg text-sm font-semibold flex items-center justify-center gap-2 transition-all ${osTab === 'linux_mac'
                                        ? 'bg-white text-black shadow-lg'
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
                                        {/* Step 1 */}
                                        <div className="space-y-4">
                                            <h3 className="text-lg font-bold text-white flex items-center gap-3">
                                                <span className="w-6 h-6 rounded-full bg-blue-500/20 text-blue-400 border border-blue-500/30 flex items-center justify-center text-xs">1</span>
                                                Zaruriy dasturlarni yuklab oling
                                            </h3>
                                            <p className="text-gray-400 text-sm pl-9">
                                                O&apos;rnatishni boshlashdan oldin kompyuteringizda Git va Node.js dasturlari mavjud ekanligini tasdiqlang:
                                            </p>
                                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pl-9">
                                                <Card className="p-4 flex items-center justify-between bg-white/5 hover:border-blue-500/30 transition-colors" hoverEffect={false}>
                                                    <div>
                                                        <h4 className="font-semibold text-white">Git for Windows</h4>
                                                        <p className="text-xs text-gray-500 mt-1">Versiya v2.55.0.2</p>
                                                    </div>
                                                    <a href="https://t.me/Yosh_avlod_kanali/4060" target="_blank" rel="noopener noreferrer">
                                                        <Button size="sm" variant="secondary" className="gap-1.5 text-xs">
                                                            <Download className="w-3.5 h-3.5" /> Yuklash
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
                                                            <Download className="w-3.5 h-3.5" /> Yuklash
                                                        </Button>
                                                    </a>
                                                </Card>
                                            </div>

                                            {/* Admin warning */}
                                            <div className="flex gap-3 p-4 pl-5 border-l-4 border-red-500/50 bg-red-500/5 rounded-r-xl pl-9 ml-9">
                                                <AlertTriangle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                                                <div>
                                                    <h5 className="font-bold text-red-400 text-sm">ADMIN HUQUQI TALAB QILINADI</h5>
                                                    <p className="text-gray-400 text-xs mt-1">
                                                        Keyingi barcha buyruqlar **PowerShell** dasturida **Administrator** (Run as Administrator) huquqi bilan ishga tushirilishi shart.
                                                    </p>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Step 2 */}
                                        <div className="space-y-4">
                                            <h3 className="text-lg font-bold text-white flex items-center gap-3">
                                                <span className="w-6 h-6 rounded-full bg-blue-500/20 text-blue-400 border border-blue-500/30 flex items-center justify-center text-xs">2</span>
                                                Skriptlarga ruxsat berish
                                            </h3>
                                            <p className="text-gray-400 text-sm pl-9">
                                                Ko&apos;p hollarda tizimda shaxsiy skriptlarni ishga tushirish bloklangan bo&apos;ladi. O&apos;rnatuvchi skript to&apos;g&apos;ri ishlashi uchun PowerShell oynasida quyidagi buyruqni bajaring:
                                            </p>
                                            <div className="pl-9">
                                                <div className="relative group">
                                                    <pre className="bg-black/40 border border-white/10 p-4 rounded-xl font-mono text-xs overflow-x-auto text-blue-400 pr-16 select-all">
                                                        Set-ExecutionPolicy RemoteSigned -Scope CurrentUser
                                                    </pre>
                                                    <button
                                                        onClick={() => handleCopy('Set-ExecutionPolicy RemoteSigned -Scope CurrentUser')}
                                                        className="absolute right-3 top-3 p-2 bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white rounded-lg transition-all"
                                                        title="Nusxa olish"
                                                    >
                                                        {copiedText === 'Set-ExecutionPolicy RemoteSigned -Scope CurrentUser' ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
                                                    </button>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Step 3 */}
                                        <div className="space-y-4">
                                            <h3 className="text-lg font-bold text-white flex items-center gap-3">
                                                <span className="w-6 h-6 rounded-full bg-blue-500/20 text-blue-400 border border-blue-500/30 flex items-center justify-center text-xs">3</span>
                                                O&apos;rnatish skriptini ishga tushiring
                                            </h3>
                                            <p className="text-gray-400 text-sm pl-9">
                                                Tizim tayyor bo&apos;lgach, free-claude-code dasturlarini yuklab olish va global tarzda Node.js-ga ulash uchun quyidagi asosiy o&apos;rnatish skriptini ishga tushiring:
                                            </p>
                                            <div className="pl-9">
                                                <div className="relative group">
                                                    <pre className="bg-black/40 border border-white/10 p-4 rounded-xl font-mono text-xs overflow-x-auto text-blue-400 pr-16 select-all">
                                                        irm &quot;https://github.com/Alishahryar1/free-claude-code/blob/main/scripts/install.ps1?raw=1&quot; | iex
                                                    </pre>
                                                    <button
                                                        onClick={() => handleCopy('irm "https://github.com/Alishahryar1/free-claude-code/blob/main/scripts/install.ps1?raw=1" | iex')}
                                                        className="absolute right-3 top-3 p-2 bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white rounded-lg transition-all"
                                                        title="Nusxa olish"
                                                    >
                                                        {copiedText === 'irm "https://github.com/Alishahryar1/free-claude-code/blob/main/scripts/install.ps1?raw=1" | iex' ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
                                                    </button>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Step 4 */}
                                        <div className="space-y-4">
                                            <h3 className="text-lg font-bold text-white flex items-center gap-3">
                                                <span className="w-6 h-6 rounded-full bg-blue-500/20 text-blue-400 border border-blue-500/30 flex items-center justify-center text-xs">4</span>
                                                Serverni ishga tushirish va API-larni ulash
                                            </h3>
                                            <p className="text-gray-400 text-sm pl-9">
                                                O&apos;rnatish muvaffaqiyatli tugagach, bepul Claude Code va Codex serverini ishga tushirish uchun quyidagi buyruqni bering:
                                            </p>
                                            <div className="pl-9">
                                                <div className="relative group">
                                                    <pre className="bg-black/40 border border-white/10 p-4 rounded-xl font-mono text-xs overflow-x-auto text-blue-400 pr-16 select-all">
                                                        fcc-server
                                                    </pre>
                                                    <button
                                                        onClick={() => handleCopy('fcc-server')}
                                                        className="absolute right-3 top-3 p-2 bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white rounded-lg transition-all"
                                                        title="Nusxa olish"
                                                    >
                                                        {copiedText === 'fcc-server' ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
                                                    </button>
                                                </div>
                                            </div>

                                            {/* Key providers sub-block */}
                                            <div className="pl-9 space-y-4">
                                                <p className="text-gray-300 text-sm">
                                                    Server birinchi marta ishga tushganda sizdan API kaliti va unga mos keladigan model yo&apos;nalishini so&apos;raydi. Bepul API kalitlarni quyidagi saytlardan olishingiz mumkin:
                                                </p>
                                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
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
                                                    <a href="https://aistudio.google.com/app/apikey" target="_blank" rel="noopener noreferrer" className="block">
                                                        <Card className="p-3 bg-white/5 hover:border-blue-500/30 text-center text-xs font-semibold text-gray-300" hoverEffect={false}>
                                                            Google AI Studio API
                                                            <ExternalLink className="w-3 h-3 inline-block ml-1 opacity-70" />
                                                        </Card>
                                                    </a>
                                                </div>

                                                <div className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-2">
                                                    <h5 className="font-bold text-sm text-white flex items-center gap-1.5">
                                                        <Info className="w-4 h-4 text-blue-400" /> Model routing yo&apos;naltirish sintaksisi:
                                                    </h5>
                                                    <ul className="text-xs text-gray-400 space-y-1 list-disc pl-5">
                                                        <li>OpenRouter: <code className="text-blue-300">open_router/model_nomi</code> (masalan: <code className="text-gray-300">open_router/meta-llama/llama-3.1-8b-instruct</code>)</li>
                                                        <li>Gemini: <code className="text-blue-300">gemini/models/model_nomi</code> (masalan: <code className="text-gray-300">gemini/models/gemini-2.5-flash</code>)</li>
                                                        <li>NVIDIA NIM: <code className="text-blue-300">nvidia_nim/model_nomi</code> (masalan: <code className="text-gray-300">nvidia_nim/meta/llama-3.1-8b-instruct</code>)</li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Step 5 */}
                                        <div className="space-y-4">
                                            <h3 className="text-lg font-bold text-white flex items-center gap-3">
                                                <span className="w-6 h-6 rounded-full bg-blue-500/20 text-blue-400 border border-blue-500/30 flex items-center justify-center text-xs">5</span>
                                                Claude Code va Codex-ni ishga tushirish
                                            </h3>

                                            {/* Crucial Note */}
                                            <div className="flex gap-3 p-4 border-l-4 border-yellow-500/50 bg-yellow-500/5 rounded-r-xl pl-9 ml-9">
                                                <AlertTriangle className="w-5 h-5 text-yellow-500 flex-shrink-0 mt-0.5" />
                                                <div>
                                                    <h5 className="font-bold text-yellow-400 text-sm">YANGI terminal OYNASI OCHILSIN</h5>
                                                    <p className="text-gray-400 text-xs mt-1">
                                                        **MUHIM:** Server ishga tushgan PowerShell oynasini yopmang. Uni orqada (background) qoldirib, **yangi PowerShell oynasini oching** va quyidagi buyruqlarni bajaring.
                                                    </p>
                                                </div>
                                            </div>

                                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pl-9 mt-4">
                                                <Card className="p-4 bg-white/5 border border-white/5 space-y-3" hoverEffect={false}>
                                                    <div className="flex items-center gap-2 text-sm font-semibold text-white">
                                                        <Terminal className="w-4 h-4 text-blue-400" />
                                                        <span>Claude Code client</span>
                                                    </div>
                                                    <div className="relative">
                                                        <pre className="bg-black/30 p-2.5 rounded-lg text-xs font-mono text-blue-400 pr-10">
                                                            fcc-claude
                                                        </pre>
                                                        <button
                                                            onClick={() => handleCopy('fcc-claude')}
                                                            className="absolute right-2 top-2 p-1.5 bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white rounded transition-all"
                                                        >
                                                            {copiedText === 'fcc-claude' ? <Check className="w-3 h-3 text-green-400" /> : <Copy className="w-3 h-3" />}
                                                        </button>
                                                    </div>
                                                    <p className="text-xs text-gray-500">Claude-ning rasmiy CLI interfeysini bepul API orqali ishga tushirish.</p>
                                                </Card>
                                                <Card className="p-4 bg-white/5 border border-white/5 space-y-3" hoverEffect={false}>
                                                    <div className="flex items-center gap-2 text-sm font-semibold text-white">
                                                        <Terminal className="w-4 h-4 text-purple-400" />
                                                        <span>Codex client</span>
                                                    </div>
                                                    <div className="relative">
                                                        <pre className="bg-black/30 p-2.5 rounded-lg text-xs font-mono text-blue-400 pr-10">
                                                            fcc-codex
                                                        </pre>
                                                        <button
                                                            onClick={() => handleCopy('fcc-codex')}
                                                            className="absolute right-2 top-2 p-1.5 bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white rounded transition-all"
                                                        >
                                                            {copiedText === 'fcc-codex' ? <Check className="w-3 h-3 text-green-400" /> : <Copy className="w-3 h-3" />}
                                                        </button>
                                                    </div>
                                                    <p className="text-xs text-gray-500">Local modellar orqali kod yaratuvchi yordamchini ishlatish.</p>
                                                </Card>
                                            </div>
                                        </div>
                                    </div>
                                ) : (
                                    // LINUX / MACOS GUIDE
                                    <div className="space-y-8 animate-fadeIn">
                                        {/* Step 1 */}
                                        <div className="space-y-4">
                                            <h3 className="text-lg font-bold text-white flex items-center gap-3">
                                                <span className="w-6 h-6 rounded-full bg-blue-500/20 text-blue-400 border border-blue-500/30 flex items-center justify-center text-xs">1</span>
                                                Prerekvizitlarni o&apos;rnating (Git & Node.js)
                                            </h3>
                                            <p className="text-gray-400 text-sm pl-9">
                                                Terminal orqali Git va Node.js dasturlarini (NVM yordamida LTS versiyasini) o&apos;rnating:
                                            </p>

                                            <div className="pl-9 space-y-3">
                                                {/* Git */}
                                                <div className="space-y-2">
                                                    <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Git o&apos;rnatish:</div>
                                                    <div className="relative">
                                                        <pre className="bg-black/40 border border-white/10 p-3 rounded-xl font-mono text-xs overflow-x-auto text-blue-400 pr-16 select-all">
                                                            sudo apt install git  # Linux (Ubuntu/Debian) uchun
                                                        </pre>
                                                        <button
                                                            onClick={() => handleCopy('sudo apt install git')}
                                                            className="absolute right-3 top-2.5 p-1.5 bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white rounded-lg transition-all"
                                                        >
                                                            {copiedText === 'sudo apt install git' ? <Check className="w-3.5 h-3.5 text-green-400" /> : <Copy className="w-3.5 h-3.5" />}
                                                        </button>
                                                    </div>
                                                </div>

                                                {/* Node.js */}
                                                <div className="space-y-2">
                                                    <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Node.js (NVM LTS) o&apos;rnatish:</div>
                                                    <div className="relative">
                                                        <pre className="bg-black/40 border border-white/10 p-3.5 rounded-xl font-mono text-xs overflow-x-auto text-blue-400 pr-16 select-all">
                                                            curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.5/install.sh | bash && \
                                                            source ~/.bashrc && \
                                                            nvm install --lts
                                                        </pre>
                                                        <button
                                                            onClick={() => handleCopy('curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.5/install.sh | bash && source ~/.bashrc && nvm install --lts')}
                                                            className="absolute right-3 top-3 p-1.5 bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white rounded-lg transition-all"
                                                        >
                                                            {copiedText === 'curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.5/install.sh | bash && source ~/.bashrc && nvm install --lts' ? <Check className="w-3.5 h-3.5 text-green-400" /> : <Copy className="w-3.5 h-3.5" />}
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Step 2 */}
                                        <div className="space-y-4">
                                            <h3 className="text-lg font-bold text-white flex items-center gap-3">
                                                <span className="w-6 h-6 rounded-full bg-blue-500/20 text-blue-400 border border-blue-500/30 flex items-center justify-center text-xs">2</span>
                                                Asosiy o&apos;rnatish skriptini ishga tushiring
                                            </h3>
                                            <p className="text-gray-400 text-sm pl-9">
                                                Barcha paketlar tayyor bo&apos;lgach, terminalda quyidagi skript buyrug&apos;ini ishlating:
                                            </p>
                                            <div className="pl-9">
                                                <div className="relative">
                                                    <pre className="bg-black/40 border border-white/10 p-4 rounded-xl font-mono text-xs overflow-x-auto text-blue-400 pr-16 select-all">
                                                        curl -fsSL &quot;https://github.com/Alishahryar1/free-claude-code/blob/main/scripts/install.sh?raw=1&quot; | sh
                                                    </pre>
                                                    <button
                                                        onClick={() => handleCopy('curl -fsSL "https://github.com/Alishahryar1/free-claude-code/blob/main/scripts/install.sh?raw=1" | sh')}
                                                        className="absolute right-3 top-3 p-2 bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white rounded-lg transition-all"
                                                    >
                                                        {copiedText === 'curl -fsSL "https://github.com/Alishahryar1/free-claude-code/blob/main/scripts/install.sh?raw=1" | sh' ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
                                                    </button>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Step 3 */}
                                        <div className="space-y-4">
                                            <h3 className="text-lg font-bold text-white flex items-center gap-3">
                                                <span className="w-6 h-6 rounded-full bg-blue-500/20 text-blue-400 border border-blue-500/30 flex items-center justify-center text-xs">3</span>
                                                Serverni boshlash va modellar
                                            </h3>
                                            <p className="text-gray-400 text-sm pl-9">
                                                Claude Code va Codex uchun modellarni ulash uchun maxsus serverni ishga tushirish uchun:
                                            </p>
                                            <div className="pl-9">
                                                <div className="relative">
                                                    <pre className="bg-black/40 border border-white/10 p-4 rounded-xl font-mono text-xs text-blue-400 pr-16">
                                                        fcc-server
                                                    </pre>
                                                    <button
                                                        onClick={() => handleCopy('fcc-server')}
                                                        className="absolute right-3 top-3 p-2 bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white rounded-lg transition-all"
                                                    >
                                                        {copiedText === 'fcc-server' ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
                                                    </button>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Step 4 */}
                                        <div className="space-y-4">
                                            <h3 className="text-lg font-bold text-white flex items-center gap-3">
                                                <span className="w-6 h-6 rounded-full bg-blue-500/20 text-blue-400 border border-blue-500/30 flex items-center justify-center text-xs">4</span>
                                                Mijoz dasturlarni yangi oynada ishga tushirish
                                            </h3>

                                            {/* Note */}
                                            <div className="flex gap-3 p-4 border-l-4 border-yellow-500/50 bg-yellow-500/5 rounded-r-xl pl-9 ml-9">
                                                <AlertTriangle className="w-5 h-5 text-yellow-500 flex-shrink-0 mt-0.5" />
                                                <div>
                                                    <h5 className="font-bold text-yellow-400 text-sm">TERMINAL OYNASINI YOPMANG</h5>
                                                    <p className="text-gray-400 text-xs mt-1">
                                                        **MUHIM:** `fcc-server` ishlayotgan oynaga tegmang. Boshqa yangi terminal oynasini oching va unga kerakli buyruqni bering.
                                                    </p>
                                                </div>
                                            </div>

                                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pl-9 mt-4">
                                                <Card className="p-4 bg-white/5 border border-white/5 space-y-3" hoverEffect={false}>
                                                    <div className="flex items-center gap-2 text-sm font-semibold text-white">
                                                        <Terminal className="w-4 h-4 text-blue-400" />
                                                        <span>Claude Code</span>
                                                    </div>
                                                    <div className="relative">
                                                        <pre className="bg-black/30 p-2.5 rounded-lg text-xs font-mono text-blue-400 pr-10">
                                                            fcc-claude
                                                        </pre>
                                                        <button
                                                            onClick={() => handleCopy('fcc-claude')}
                                                            className="absolute right-2 top-2 p-1.5 bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white rounded transition-all"
                                                        >
                                                            {copiedText === 'fcc-claude' ? <Check className="w-3 h-3 text-green-400" /> : <Copy className="w-3 h-3" />}
                                                        </button>
                                                    </div>
                                                </Card>
                                                <Card className="p-4 bg-white/5 border border-white/5 space-y-3" hoverEffect={false}>
                                                    <div className="flex items-center gap-2 text-sm font-semibold text-white">
                                                        <Terminal className="w-4 h-4 text-purple-400" />
                                                        <span>Codex Client</span>
                                                    </div>
                                                    <div className="relative">
                                                        <pre className="bg-black/30 p-2.5 rounded-lg text-xs font-mono text-blue-400 pr-10">
                                                            fcc-codex
                                                        </pre>
                                                        <button
                                                            onClick={() => handleCopy('fcc-codex')}
                                                            className="absolute right-2 top-2 p-1.5 bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white rounded transition-all"
                                                        >
                                                            {copiedText === 'fcc-codex' ? <Check className="w-3 h-3 text-green-400" /> : <Copy className="w-3 h-3" />}
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
                                    <h2 className="text-2xl font-bold mb-2">Microsoft Office Dasturlari</h2>
                                    <p className="text-gray-400 max-w-3xl text-sm">
                                        Rasmiy Microsoft CDN tarmoqlaridan to&apos;g&apos;ri va tezkor yuklab olinuvchi original Microsoft Office o&apos;rnatish paketlari. Aktivatsiya qilish uchun Operatsion Tizimlar bo&apos;limidagi qo&apos;llanmaga murojaat qilishingiz mumkin.
                                    </p>
                                </div>
                                <a href="/os#activation" className="flex-shrink-0">
                                    <Button size="sm" variant="secondary" className="border-orange-500/30 text-orange-400 hover:bg-orange-500/10">
                                        ⚡ Aktivatsiya qilish qo&apos;llanmasi
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
                                            <p className="text-gray-400 text-sm leading-relaxed">{prod.description}</p>
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
                                                    <Download className="w-4 h-4 mr-2" /> Yuklab Olish
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
