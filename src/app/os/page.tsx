'use client';

import { useState, useMemo } from 'react';
import Section from '@/components/ui/Section';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import GradientText from '@/components/ui/GradientText';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import {
    Search,
    Download,
    Users,
    Info,
    HardDrive,
    Sparkles,
    ShieldCheck,
    AlertTriangle,
    Copy,
    Check,
    Key,
    Terminal
} from 'lucide-react';

// --- Custom SVG Logos for OS ---

const KaliLogo = () => (
    <svg viewBox="0 0 24 24" className="w-8 h-8" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
            <linearGradient id="kali-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#00c6ff" />
                <stop offset="100%" stopColor="#0072ff" />
            </linearGradient>
        </defs>
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" fill="none" stroke="url(#kali-grad)" strokeWidth="2" />
        <path d="M12 6v6m0 0l-3-3m3 3l3-3" stroke="url(#kali-grad)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M9 16c1.5 1.5 4.5 1.5 6 0" stroke="url(#kali-grad)" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
);

const ParrotLogo = () => (
    <svg viewBox="0 0 24 24" className="w-8 h-8" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
            <linearGradient id="parrot-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#00E5FF" />
                <stop offset="100%" stopColor="#00FF87" />
            </linearGradient>
        </defs>
        <path d="M12 2a10 10 0 00-7.07 17.07l2.83-2.83A6 6 0 1112 18v3.5a10 10 0 000-20z" fill="url(#parrot-grad)" />
        <circle cx="12" cy="12" r="3" fill="#00E5FF" opacity="0.3" />
    </svg>
);

const BlackArchLogo = () => (
    <svg viewBox="0 0 24 24" className="w-8 h-8" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
            <linearGradient id="blackarch-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#ff0055" />
                <stop offset="100%" stopColor="#800020" />
            </linearGradient>
        </defs>
        <path d="M12 2L1 21h22L12 2zm0 5l7.5 12h-15L12 7z" fill="url(#blackarch-grad)" />
        <circle cx="12" cy="14" r="2" fill="#ff0055" />
    </svg>
);

const WindowsLogo = () => (
    <svg viewBox="0 0 24 24" className="w-8 h-8" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
            <linearGradient id="win-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#0078D4" />
                <stop offset="100%" stopColor="#00bcf2" />
            </linearGradient>
        </defs>
        <path d="M2 2h9.5v9.5H2V2zm10.5 0H22v9.5h-9.5V2zM2 12.5h9.5V22H2v-9.5zm10.5 0H22V22h-9.5v-9.5z" fill="url(#win-grad)" />
    </svg>
);

const WindowsLTSCLogo = () => (
    <svg viewBox="0 0 24 24" className="w-8 h-8" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
            <linearGradient id="win-ltsc-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#005A9E" />
                <stop offset="100%" stopColor="#0086F0" />
            </linearGradient>
        </defs>
        <path d="M2 2h9.5v9.5H2V2zm10.5 0H22v9.5h-9.5V2zM2 12.5h9.5V22H2v-9.5zm10.5 0H22V22h-9.5v-9.5z" fill="url(#win-ltsc-grad)" />
        <circle cx="12" cy="12" r="2" fill="#ffffff" />
    </svg>
);

const CachyOSLogo = () => (
    <svg viewBox="0 0 24 24" className="w-8 h-8" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
            <linearGradient id="cachy-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FF6B00" />
                <stop offset="100%" stopColor="#FFA800" />
            </linearGradient>
        </defs>
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10h-2c0 4.41-3.59 8-8 8s-8-3.59-8-8 3.59-8 8-8V2z" fill="url(#cachy-grad)" />
        <path d="M12 6a6 6 0 00-6 6h2a4 4 0 018 0h2a6 6 0 00-6-6z" fill="#FF6B00" />
        <circle cx="12" cy="12" r="2" fill="#FFA800" />
    </svg>
);

const UbuntuLogo = () => (
    <svg viewBox="0 0 24 24" className="w-8 h-8" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
            <linearGradient id="ubuntu-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#E95420" />
                <stop offset="100%" stopColor="#ff7900" />
            </linearGradient>
        </defs>
        <circle cx="12" cy="12" r="10" stroke="url(#ubuntu-grad)" strokeWidth="2" />
        <circle cx="12" cy="6" r="2" fill="url(#ubuntu-grad)" />
        <circle cx="7" cy="15" r="2" fill="url(#ubuntu-grad)" />
        <circle cx="17" cy="15" r="2" fill="url(#ubuntu-grad)" />
        <path d="M12 9a3 3 0 00-2.82 2H8.1a5 5 0 017.8 0h-1.08A3 3 0 0012 9z" fill="url(#ubuntu-grad)" />
    </svg>
);

const ArchLogo = () => (
    <svg viewBox="0 0 24 24" className="w-8 h-8" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
            <linearGradient id="arch-grad" x1="0%" y1="100%" x2="50%" y2="0%">
                <stop offset="0%" stopColor="#1793D1" />
                <stop offset="100%" stopColor="#33aadd" />
            </linearGradient>
        </defs>
        <path d="M12 2L1 21h4.5L12 9.5l6.5 11.5H23L12 2zm0 5l5 9H7l5-9z" fill="url(#arch-grad)" />
    </svg>
);

const ManjaroLogo = () => (
    <svg viewBox="0 0 24 24" className="w-8 h-8" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
            <linearGradient id="manjaro-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#35BF5C" />
                <stop offset="100%" stopColor="#168039" />
            </linearGradient>
        </defs>
        <path d="M2 2h6v20H2V2zm8 0h6v8h-6V2zm0 10h6v10h-6V12zm8-10h4v20h-4V2z" fill="url(#manjaro-grad)" />
    </svg>
);

const OmarchyLogo = () => (
    <svg viewBox="0 0 24 24" className="w-8 h-8" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
            <linearGradient id="omarchy-grad" x1="0%" y1="100%" x2="50%" y2="0%">
                <stop offset="0%" stopColor="#8B5CF6" />
                <stop offset="100%" stopColor="#A78BFA" />
            </linearGradient>
        </defs>
        <path d="M12 2L1 21h4.5L12 9.5l6.5 11.5H23L12 2zm0 5l5 9H7l5-9z" fill="url(#omarchy-grad)" />
        <path d="M12 11a3 3 0 100 6 3 3 0 000-6z" fill="#ffffff" opacity="0.8" />
    </svg>
);

// --- Interface ---
interface OperatingSystem {
    id: string;
    name: string;
    description: string;
    downloadUrl: string;
    targetAudience: string;
    category: 'Cybersecurity' | 'Windows' | 'General';
    tags: string[];
    accentColor: string;
    logo: React.ComponentType;
    downloadSize: string;
    variants?: {
        language: string;
        architecture: string;
        downloadUrl: string;
        downloadSize?: string;
    }[];
    productKeys?: { edition: string; key: string }[];
}

// --- Data ---
const OPERATING_SYSTEMS: OperatingSystem[] = [
    {
        id: 'kali',
        name: 'Kali Linux',
        category: 'Cybersecurity',
        description: 'Kiberxavfsizlik, penetratsion testlar va zaifliklarni aniqlash uchun eng kuchli va mashhur Linux distributivi. Minglab maxsus xavfsizlik qurollari bilan jihozlangan.',
        downloadUrl: 'https://www.kali.org/get-kali/#kali-installer-images',
        targetAudience: 'Kiberxavfsizlik mutaxassislari, etika xakerlar (ethical hackers) va penetratsion testlovchilar.',
        tags: ['Security', 'Pen-testing', 'Debian'],
        accentColor: '#00c6ff',
        logo: KaliLogo,
        downloadSize: '~4.1 GB'
    },
    {
        id: 'parrot',
        name: 'Parrot Security OS',
        category: 'Cybersecurity',
        description: 'Xavfsizlik, maxfiylik va dasturiy ta\'minot yaratish uchun maxsus ishlab chiqilgan, tizim resurslariga juda yengil va qulay operatsion tizim.',
        downloadUrl: 'https://parrotsec.org/download/',
        targetAudience: 'Xavfsizlik tahlilchilari, dasturchilar, kriptografiya ixlosmandlari va shaxsiy daxlsizlik tarafdorlari.',
        tags: ['Privacy', 'Cybersec', 'MATE/KDE'],
        accentColor: '#00E5FF',
        logo: ParrotLogo,
        downloadSize: '~4.9 GB'
    },
    {
        id: 'blackarch',
        name: 'BlackArch Linux',
        category: 'Cybersecurity',
        description: 'Arch Linux-ga asoslangan, ichiga 2800 dan ortiq professional xavfsizlik va sinov vositalari o\'rnatilgan juda katta hajmli professional tizim.',
        downloadUrl: 'https://blackarch.org/downloads.html',
        targetAudience: 'Tajribali penetratsion testlovchilar, reverse-muhandislar va kiberxavfsizlik ekspertlari.',
        tags: ['Arch-based', 'Ultra-Heavy', 'Security'],
        accentColor: '#ff0055',
        logo: BlackArchLogo,
        downloadSize: '~22 GB'
    },
    {
        id: 'win11',
        name: 'Windows 11 Pro',
        category: 'Windows',
        description: 'Eng so\'nggi interfeys, mukammal o\'yin unumdorligi va yangilangan xavfsizlik tizimiga ega eng mashhur Microsoft operatsion tizimi.',
        downloadUrl: 'https://buzzheavier.com/piy2m79cwp6f',
        targetAudience: 'Kundalik foydalanuvchilar, geymerlar, ofis xodimlari va Windows ilovalari dasturchilari.',
        tags: ['Microsoft', 'Gaming', 'User-Friendly'],
        accentColor: '#0078D4',
        logo: WindowsLogo,
        downloadSize: '~5.4 GB',
        variants: [
            { language: 'English', architecture: '64-bit', downloadUrl: 'https://buzzheavier.com/piy2m79cwp6f', downloadSize: '~5.4 GB' },
            { language: 'Russian', architecture: '64-bit', downloadUrl: 'https://buzzheavier.com/mu03gk7psfff', downloadSize: '~5.4 GB' }
        ]
    },
    {
        id: 'win11-ltsc',
        name: 'Windows 11 Enterprise LTSC',
        category: 'Windows',
        description: 'Ortiqcha keraksiz dasturlar (bloatware) va keraksiz foniy jarayonlarsiz, uzoq yillik rasmiy yordamga va yuqori barqarorlikka ega korporativ tizim.',
        downloadUrl: 'https://buzzheavier.com/2gtemvaqgfm3',
        targetAudience: 'Tizim administratorlari, optimal tezlikni istovchi geymerlar va barqaror ish muhitini qadrlovchilar.',
        tags: ['LTSC 2024', 'Bloat-Free', 'Stability'],
        accentColor: '#0086F0',
        logo: WindowsLTSCLogo,
        downloadSize: '~4.8 GB',
        variants: [
            { language: 'English', architecture: '64-bit', downloadUrl: 'https://buzzheavier.com/2gtemvaqgfm3', downloadSize: '' }
        ]
    },
    {
        id: 'win10',
        name: 'Windows 10 Pro / Home',
        category: 'Windows',
        description: 'Ko\'plab foydalanuvchilar tomonidan eng qulay va sinovdan o\'tgan, o\'yinlar va eski dasturlar bilan mukammal mos keluvchi operatsion tizim.',
        downloadUrl: 'https://buzzheavier.com/fuxscqu93mnn',
        targetAudience: 'Barqarorlikni xohlovchilar, eski kompyuter egalari va geymerlar.',
        tags: ['Microsoft', 'Popular', 'Classic'],
        accentColor: '#00A4EF',
        logo: WindowsLogo,
        downloadSize: '~5.7 GB',
        variants: [
            { language: 'English', architecture: '64-bit', downloadUrl: 'https://buzzheavier.com/fuxscqu93mnn', downloadSize: '~5.7 GB' },
            { language: 'English', architecture: '32-bit', downloadUrl: 'https://buzzheavier.com/4wlxz1qpf5vm', downloadSize: '~3.9 GB' },
            { language: 'Russian', architecture: '64-bit', downloadUrl: 'https://buzzheavier.com/nltq3kxobqyy', downloadSize: '~5.7 GB' },
            { language: 'Russian', architecture: '32-bit', downloadUrl: 'https://buzzheavier.com/kkonwh2ajbyb', downloadSize: '~3.9 GB' }
        ]
    },
    {
        id: 'win10-ltsc',
        name: 'Windows 10 Enterprise LTSC',
        category: 'Windows',
        description: 'Minimal tizim resurslari talab qiladigan, keraksiz Microsoft bloatware dasturlarisiz va uzoq yillik rasmiy xavfsizlik yangilanishlariga ega bo\'lgan Windows 10 versiyasi.',
        downloadUrl: 'https://buzzheavier.com/5eerq83cpgwi',
        targetAudience: 'Eski yoki past ko\'rsatkichli noutbuk va kompyuter egalari, shuningdek barqarorlikni birinchi o\'ringa qo\'yuvchilar.',
        tags: ['LTSC 2021', 'Lightweight', 'Enterprise'],
        accentColor: '#00B7C3',
        logo: WindowsLTSCLogo,
        downloadSize: '~4.3 GB',
        variants: [
            { language: 'English', architecture: '64-bit', downloadUrl: 'https://buzzheavier.com/5eerq83cpgwi', downloadSize: '' }
        ]
    },
    {
        id: 'win11-arm',
        name: 'Windows 11 ARM',
        category: 'Windows',
        description: 'ARM arxitekturali qurilmalar (Surface Pro X, Snapdragon PC, Apple Silicon VM) uchun optimallashtirilgan Windows 11 rasmiy ISO fayli.',
        downloadUrl: 'https://software-static.download.prss.microsoft.com/dbazure/888969d5-f34g-4e03-ac9d-1f9786c66749/26200.6584.250915-1905.25h2_ge_release_svc_refresh_CLIENT_CONSUMER_A64FRE_en-us.iso',
        targetAudience: 'Snapdragon qurilma egalari, Surface Pro X / Surface Pro 9 (ARM) va ARM arxitekturali virtualizatsiya muhitlari.',
        tags: ['ARM64', 'Microsoft', 'Surface'],
        accentColor: '#6E40C9',
        logo: WindowsLogo,
        downloadSize: '~5.6 GB',
        variants: [
            { language: 'English', architecture: 'ARM64', downloadUrl: 'https://software-static.download.prss.microsoft.com/dbazure/888969d5-f34g-4e03-ac9d-1f9786c66749/26200.6584.250915-1905.25h2_ge_release_svc_refresh_CLIENT_CONSUMER_A64FRE_en-us.iso', downloadSize: '~5.6 GB' },
            { language: 'Russian', architecture: 'ARM64', downloadUrl: 'https://software-static.download.prss.microsoft.com/dbazure/888969d5-f34g-4e03-ac9d-1f9786c66749/26200.6584.250915-1905.25h2_ge_release_svc_refresh_CLIENT_CONSUMER_A64FRE_ru-ru.iso', downloadSize: '~5.6 GB' }
        ]
    },
    {
        id: 'win81',
        name: 'Windows 8.1',
        category: 'Windows',
        description: 'Windows 7 va 10 o\'rtasidagi klassik versiya. Eski dasturlar bilan mukammal mos keladi. ISO yuklab olgandan so\'ng mahsulot kalitini qo\'llang.',
        downloadUrl: 'https://buzzheavier.com/2i65axai8pao',
        targetAudience: 'Eski dasturiy ta\'minot bilan ishlash zarur bo\'lganlar va klassik Windows interfeysi tarafdorlari.',
        tags: ['Classic', 'Legacy', '32/64-bit'],
        accentColor: '#0277BD',
        logo: WindowsLTSCLogo,
        downloadSize: '~4.0 GB',
        variants: [
            { language: 'English', architecture: '64-bit', downloadUrl: 'https://buzzheavier.com/2i65axai8pao', downloadSize: '~4.0 GB' },
            { language: 'English', architecture: '32-bit', downloadUrl: 'https://buzzheavier.com/ddhrb4eax1x1', downloadSize: '~2.8 GB' },
            { language: 'Russian', architecture: '64-bit', downloadUrl: 'https://zerofs.link/f/bOi9D_hBQaUfaZVn4FKLdsAa8co_6bVsmtFj1LckoO1MPyBNpKnSxqIS0opPzI6wynA/', downloadSize: '~4.0 GB' },
            { language: 'Russian', architecture: '32-bit', downloadUrl: 'https://zerofs.link/f/M6BI4XXfRVeI6IPzEIkgDXPVApSq0FANyAK8bEozNAE5QN0CivxO1Hm5nbYO7Ls1OLY/', downloadSize: '~2.8 GB' }
        ],
        productKeys: [
            { edition: 'Core', key: '334NH-RXG76-64THK-C7CKG-D3VPT' },
            { edition: 'Core N', key: '6NPQ8-PK64X-W4WMM-MF84V-RGB89' },
            { edition: 'Core Single Language', key: 'Y9NXP-XT8MV-PT9TG-97CT3-9D6TC' },
            { edition: 'Pro', key: 'XHQ8N-C3MCJ-RQXB6-WCHYG-C9WKB' },
            { edition: 'Pro N', key: 'JRBBN-4Q997-H4RM2-H3B7W-Q68KC' }
        ]
    },
    {
        id: 'win7',
        name: 'Windows 7 SP1',
        category: 'Windows',
        description: 'Barcha zamonlarning eng mashhur Windows versiyasi. Qadimiy kompyuterlar va eski dasturiy ta\'minot uchun hamon eng ishonchli tanlov.',
        downloadUrl: 'https://buzzheavier.com/lllag2h2ucql',
        targetAudience: 'Juda eski kompyuter egalari, retro dasturlar va o\'yinlar ishqibozlari.',
        tags: ['Legacy', 'Classic', 'SP1'],
        accentColor: '#1565C0',
        logo: WindowsLogo,
        downloadSize: '~3.1 GB',
        variants: [
            { language: 'English', architecture: '64-bit', downloadUrl: 'https://buzzheavier.com/lllag2h2ucql', downloadSize: '~3.1 GB' },
            { language: 'English', architecture: '32-bit', downloadUrl: 'https://buzzheavier.com/wru8ac6nwk2x', downloadSize: '~2.4 GB' },
            { language: 'Russian', architecture: '64-bit', downloadUrl: 'https://zerofs.link/f/XsmotsH_4CNUIl8k1-p2VN10LreJHgQhGCKoo7KY80Qbz2Ltn_9xegsiIC_IfjQsMro/', downloadSize: '~3.1 GB' },
            { language: 'Russian', architecture: '32-bit', downloadUrl: 'https://zerofs.link/f/DS3eFKYXF1ZsRZHyi3PmPp89qxAx-jajMOIICgvCcK9kO3X_JChfD1q1RLTUEZdR0Rg/', downloadSize: '~2.4 GB' }
        ]
    },
    {
        id: 'cachyos',
        name: 'CachyOS',
        category: 'General',
        description: 'Tezlik va unumdorlik uchun optimallashtirilgan kernel va CPU schedulers bilan jihozlangan, eng so\'nggi x86-64-v3/v4 arxitekturalarini qo\'llab-quvvatlovchi zamonaviy Arch-distro.',
        downloadUrl: 'https://cachyos.org/download/',
        targetAudience: 'O\'yin o\'ynovchilar (gamers), video montaj qiluvchilar va tizimning maksimal tezligidan bahramand bo\'lmoqchi bo\'lganlar.',
        tags: ['Performance', 'Arch-based', 'Optimized'],
        accentColor: '#FF6B00',
        logo: CachyOSLogo,
        downloadSize: '~2.8 GB'
    },
    {
        id: 'ubuntu',
        name: 'Ubuntu Desktop',
        category: 'General',
        description: 'Dunyodagi eng ko\'p ishlatiladigan, juda katta hamjamiyatga va dasturlar omboriga ega, o\'rnatish va ishlatish juda oson bo\'lgan Linux distributivi.',
        downloadUrl: 'https://ubuntu.com/download/desktop',
        targetAudience: 'Linux dunyosiga endi kirgan yangi o\'rganuvchilar, server/web dasturchilar va umumiy foydalanuvchilar.',
        tags: ['LTS', 'Beginner', 'Popular'],
        accentColor: '#E95420',
        logo: UbuntuLogo,
        downloadSize: '~4.1 GB'
    },
    {
        id: 'arch',
        name: 'Arch Linux',
        category: 'General',
        description: 'Tizimni noldan boshlab har bir detalini o\'zingiz yig\'ishingiz imkonini beruvchi, minimalist, rolling-release (doimiy eng yangi paketlar) distributivi.',
        downloadUrl: 'https://archlinux.org/',
        targetAudience: 'Linux operatsion tizimi qanday ishlashini mukammal o\'rganishni istaganlar va minimalist tizim yig\'uvchilar.',
        tags: ['DIY', 'Rolling Release', 'Minimalist'],
        accentColor: '#1793D1',
        logo: ArchLogo,
        downloadSize: '~1.1 GB'
    },
    {
        id: 'manjaro',
        name: 'Manjaro Linux',
        category: 'General',
        description: 'Arch Linux qudrati va rolling-release tizimini sodda, grafik interfeysli o\'rnatuvchi bilan birlashtirgan, foydalanishga tayyor mukammal tizim.',
        downloadUrl: 'https://manjaro.org/products/download/x86',
        targetAudience: 'Arch Linux paketlaridan oddiy va xavfsiz foydalanishni, barqaror o\'yin va dasturlash muhitiga ega bo\'lishni istovchilar.',
        tags: ['Arch-based', 'Graphical', 'Stable-Rolls'],
        accentColor: '#35BF5C',
        logo: ManjaroLogo,
        downloadSize: '~3.4 GB'
    },
    {
        id: 'omarchy',
        name: 'Omarchy Linux',
        category: 'General',
        description: 'Arch Linux-ga asoslangan, pre-konfiguratsiya qilingan (oldindan sozlangan) va chiroyli dizaynga ega o\'zbek hamjamiyati uchun ajoyib, yengil va qulay distributiv.',
        downloadUrl: 'https://iso.omarchy.org/omarchy-3.8.2.iso',
        targetAudience: 'Arch Linux-ni sozlashga vaqt sarflamay, noldan tayyor va tezkor ishga tushadigan tizimni xohlovchilar hamda mahalliy hamjamiyat a\'zolari.',
        tags: ['Custom Arch', 'Local Spin', 'Out-Of-Box'],
        accentColor: '#8B5CF6',
        logo: OmarchyLogo,
        downloadSize: '~2.5 GB'
    }
];

export default function OSPage() {
    const [searchQuery, setSearchQuery] = useState('');
    const [activeCategory, setActiveCategory] = useState<string>('All');
    const [hoveredCard, setHoveredCard] = useState<string | null>(null);
    const [selectedLanguage, setSelectedLanguage] = useState<Record<string, string>>({});
    const [selectedArch, setSelectedArch] = useState<Record<string, string>>({});

    const categories = [
        { id: 'All', name: 'Barchasi', special: false },
        { id: 'Cybersecurity', name: 'Kiberxavfsizlik', special: false },
        { id: 'Windows', name: 'Windows', special: false },
        { id: 'General', name: 'Kundalik & Dasturlash', special: false },
        { id: 'Activation', name: '⚡ Win & Office Aktivatsiya', special: true },
    ];

    // Filter systems
    const filteredOS = useMemo(() => {
        return OPERATING_SYSTEMS.filter(os => {
            const matchesSearch =
                os.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                os.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                os.targetAudience.toLowerCase().includes(searchQuery.toLowerCase()) ||
                os.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));

            const matchesCategory = activeCategory === 'All' || os.category === activeCategory;

            return matchesSearch && matchesCategory;
        });
    }, [searchQuery, activeCategory]);

    return (
        <div className="pt-8 px-6 max-w-7xl mx-auto min-h-screen">
            <Section>
                <div className="mb-12 relative">
                    <div className="absolute top-0 right-0 opacity-10 blur-xl pointer-events-none">
                        <Sparkles className="w-48 h-48 text-blue-500 animate-pulse" />
                    </div>

                    <h1 className="text-4xl md:text-5xl font-black mb-4 tracking-tight">
                        <GradientText animate>Operatsion Tizimlar</GradientText>
                    </h1>
                    <p className="text-gray-400 max-w-2xl mb-8">
                        Loyihalarimiz, videodarslarimiz va kundalik ishingiz uchun eng maqbul, sinovdan o&apos;tgan va ishonchli operatsion tizimlarni yuklab oling.
                    </p>

                    {/* Filter and Search Bar */}
                    <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
                        {/* Category Selector */}
                        <div className="flex flex-wrap gap-2 w-full md:w-auto">
                            {categories.map((cat) => {
                                const isActive = activeCategory === cat.id;
                                if (cat.special) {
                                    return (
                                        <button
                                            key={cat.id}
                                            onClick={() => setActiveCategory(cat.id)}
                                            className={`relative px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-300 ${isActive
                                                    ? 'text-black bg-orange-400 shadow-[0_0_20px_rgba(251,146,60,0.5)]'
                                                    : 'text-orange-400 bg-orange-500/10 border border-orange-500/30 hover:bg-orange-500/20'
                                                }`}
                                        >
                                            {cat.name}
                                        </button>
                                    );
                                }
                                return (
                                    <button
                                        key={cat.id}
                                        onClick={() => setActiveCategory(cat.id)}
                                        className={`relative px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-300 ${isActive
                                                ? 'text-black bg-white shadow-[0_0_20px_rgba(255,255,255,0.25)]'
                                                : 'text-gray-400 hover:text-white bg-white/5 border border-white/5 hover:bg-white/10'
                                            }`}
                                    >
                                        {cat.name}
                                    </button>
                                );
                            })}
                        </div>

                        {/* Search Input */}
                        <div className="relative w-full md:max-w-md">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <Search className="h-5 w-5 text-gray-500" />
                            </div>
                            <input
                                type="text"
                                className="block w-full pl-10 pr-4 py-2.5 border border-white/10 rounded-xl bg-white/5 text-white placeholder-gray-500 focus:outline-none focus:bg-white/10 focus:ring-1 focus:ring-blue-500/50 transition-all backdrop-blur-sm"
                                placeholder="Operatsion tizimni qidirish..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>
                    </div>
                </div>

                {/* Operating System Grid - hidden when Activation tab is active */}
                {activeCategory !== 'Activation' && (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pb-20">
                        <AnimatePresence mode="popLayout">
                            {filteredOS.length > 0 ? (
                                filteredOS.map((os) => {
                                    const LogoComponent = os.logo;
                                    const isHovered = hoveredCard === os.id;

                                    const hasVariants = !!os.variants && os.variants.length > 0;
                                    let currentDownloadUrl = os.downloadUrl;
                                    let currentDownloadSize = os.downloadSize;
                                    let availableLanguages: string[] = [];
                                    let availableArchs: string[] = [];
                                    let currentLang = '';
                                    let currentAr = '';

                                    if (hasVariants && os.variants) {
                                        availableLanguages = Array.from(new Set(os.variants.map(v => v.language)));
                                        currentLang = selectedLanguage[os.id] || availableLanguages[0];
                                        const langVariants = os.variants.filter(v => v.language === currentLang);
                                        availableArchs = Array.from(new Set(langVariants.map(v => v.architecture)));
                                        currentAr = selectedArch[os.id] || availableArchs[0];
                                        if (!availableArchs.includes(currentAr)) {
                                            currentAr = availableArchs[0];
                                        }
                                        const matchedVariant = os.variants.find(v => v.language === currentLang && v.architecture === currentAr);
                                        if (matchedVariant) {
                                            currentDownloadUrl = matchedVariant.downloadUrl;
                                            currentDownloadSize = matchedVariant.downloadSize || os.downloadSize;
                                        }
                                    }

                                    return (
                                        <motion.div
                                            layout
                                            initial={{ opacity: 0, scale: 0.95 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            exit={{ opacity: 0, scale: 0.9 }}
                                            transition={{ duration: 0.3 }}
                                            key={os.id}
                                            onMouseEnter={() => setHoveredCard(os.id)}
                                            onMouseLeave={() => setHoveredCard(null)}
                                            className="relative"
                                        >
                                            <Card
                                                className="h-full p-6 flex flex-col justify-between transition-all duration-500"
                                                hoverEffect={false}
                                                style={{
                                                    borderColor: isHovered ? `${os.accentColor}40` : '#1f1f1f',
                                                    boxShadow: isHovered
                                                        ? `0 10px 40px -10px ${os.accentColor}15, 0 0 25px -5px ${os.accentColor}10`
                                                        : 'none',
                                                }}
                                            >
                                                <div className="space-y-5">
                                                    {/* Header Icon + Sizes */}
                                                    <div className="flex items-center justify-between">
                                                        <div
                                                            className="w-14 h-14 rounded-xl flex items-center justify-center transition-all duration-300"
                                                            style={{
                                                                backgroundColor: `${os.accentColor}12`,
                                                                border: `1px solid ${os.accentColor}25`
                                                            }}
                                                        >
                                                            <LogoComponent />
                                                        </div>
                                                        <div className="flex items-center gap-1.5 text-xs text-gray-500 bg-white/5 border border-white/5 px-2.5 py-1 rounded-full">
                                                            <HardDrive className="w-3.5 h-3.5" />
                                                            <span>{currentDownloadSize}</span>
                                                        </div>
                                                    </div>

                                                    {/* Title & Tags */}
                                                    <div>
                                                        <div className="flex items-center gap-2">
                                                            <h3 className="text-xl font-bold tracking-tight text-white">
                                                                {os.name}
                                                            </h3>
                                                        </div>

                                                        {/* Custom tags */}
                                                        <div className="flex flex-wrap gap-1.5 mt-2">
                                                            {os.tags.map(tag => (
                                                                <span
                                                                    key={tag}
                                                                    className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-white/5 border border-white/5 text-gray-400"
                                                                >
                                                                    {tag}
                                                                </span>
                                                            ))}
                                                        </div>
                                                    </div>

                                                    {/* Description */}
                                                    <p className="text-gray-400 text-sm leading-relaxed">
                                                        {os.description}
                                                    </p>

                                                    {/* Dynamic Variant Selector */}
                                                    {hasVariants && (
                                                        <div className="space-y-3 pt-3 border-t border-white/5">
                                                            <div className="flex flex-wrap items-center gap-3 bg-white/5 p-2 rounded-lg border border-white/5">
                                                                {/* Language */}
                                                                <div className="flex items-center gap-1.5">
                                                                    <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">Til:</span>
                                                                    {availableLanguages.length > 1 ? (
                                                                        <div className="flex gap-1 bg-black/40 p-0.5 rounded border border-white/5">
                                                                            {availableLanguages.map(lang => {
                                                                                const isSelected = currentLang === lang;
                                                                                return (
                                                                                    <button
                                                                                        key={lang}
                                                                                        onClick={() => setSelectedLanguage(prev => ({ ...prev, [os.id]: lang }))}
                                                                                        className={`px-1.5 py-0.5 rounded text-[10px] font-bold transition-all duration-200 ${isSelected
                                                                                                ? 'bg-blue-500 text-white shadow-[0_0_8px_rgba(59,130,246,0.3)]'
                                                                                                : 'text-gray-400 hover:text-white'
                                                                                            }`}
                                                                                    >
                                                                                        {lang === 'English' ? 'EN' : 'RU'}
                                                                                    </button>
                                                                                );
                                                                            })}
                                                                        </div>
                                                                    ) : (
                                                                        <span className="text-[11px] font-semibold text-gray-300">
                                                                            {currentLang === 'English' ? '🇬🇧 EN' : '🇷🇺 RU'}
                                                                        </span>
                                                                    )}
                                                                </div>

                                                                {/* Architecture */}
                                                                <div className="flex items-center gap-1.5 ml-auto">
                                                                    <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">Tizim:</span>
                                                                    {availableArchs.length > 1 ? (
                                                                        <div className="flex gap-1 bg-black/40 p-0.5 rounded border border-white/5">
                                                                            {availableArchs.map(arch => {
                                                                                const isSelected = currentAr === arch;
                                                                                return (
                                                                                    <button
                                                                                        key={arch}
                                                                                        onClick={() => setSelectedArch(prev => ({ ...prev, [os.id]: arch }))}
                                                                                        className={`px-1.5 py-0.5 rounded text-[10px] font-bold transition-all duration-200 ${isSelected
                                                                                                ? 'bg-blue-500 text-white shadow-[0_0_8px_rgba(59,130,246,0.3)]'
                                                                                                : 'text-gray-400 hover:text-white'
                                                                                            }`}
                                                                                    >
                                                                                        {arch}
                                                                                    </button>
                                                                                );
                                                                            })}
                                                                        </div>
                                                                    ) : (
                                                                        <span className="text-[11px] font-semibold text-gray-300">
                                                                            {currentAr}
                                                                        </span>
                                                                    )}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    )}

                                                    {/* Divider */}
                                                    <div className="h-px bg-white/5" />

                                                    {/* Target Audience */}
                                                    <div className="space-y-2">
                                                        <div className="flex items-center gap-2 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                                                            <Users className="w-4 h-4" style={{ color: os.accentColor }} />
                                                            <span>Kimlar uchun:</span>
                                                        </div>
                                                        <p className="text-gray-300 text-sm italic pl-6 border-l border-white/10">
                                                            {os.targetAudience}
                                                        </p>
                                                    </div>

                                                    {/* Product Keys */}
                                                    {os.productKeys && os.productKeys.length > 0 && (
                                                        <div className="space-y-2 pt-2 border-t border-white/5">
                                                            <div className="flex items-center gap-2 text-xs font-semibold text-amber-400 uppercase tracking-wider">
                                                                <Key className="w-3.5 h-3.5" />
                                                                <span>Mahsulot Kalitlari</span>
                                                            </div>
                                                            <div className="space-y-1.5">
                                                                {os.productKeys.map((pk) => (
                                                                    <div key={pk.edition} className="flex items-center justify-between gap-2 bg-black/40 border border-amber-500/10 rounded-lg px-3 py-1.5">
                                                                        <div>
                                                                            <span className="text-[10px] text-amber-400/70 font-bold uppercase tracking-wider block">{pk.edition}</span>
                                                                            <span className="text-[11px] font-mono text-gray-300 select-all">{pk.key}</span>
                                                                        </div>
                                                                        <button
                                                                            onClick={() => navigator.clipboard.writeText(pk.key)}
                                                                            className="flex-shrink-0 p-1 text-gray-500 hover:text-amber-400 transition-colors"
                                                                            title="Nusxa olish"
                                                                        >
                                                                            <Copy className="w-3.5 h-3.5" />
                                                                        </button>
                                                                    </div>
                                                                ))}
                                                            </div>
                                                        </div>
                                                    )}
                                                </div>

                                                {/* Download Action */}
                                                <div className="mt-8 pt-4 border-t border-white/5">
                                                    <a href={currentDownloadUrl} target="_blank" rel="noopener noreferrer" className="block w-full">
                                                        <Button
                                                            className="w-full relative overflow-hidden group/btn"
                                                            variant="secondary"
                                                            style={{
                                                                background: isHovered ? `${os.accentColor}18` : 'rgba(255,255,255,0.05)',
                                                                border: `1px solid ${isHovered ? `${os.accentColor}30` : 'rgba(255,255,255,0.05)'}`,
                                                                color: isHovered ? '#ffffff' : '#e2e8f0',
                                                            }}
                                                        >
                                                            <Download className="w-4 h-4 mr-2 group-hover/btn:translate-y-0.5 transition-transform" />
                                                            <span>Yuklab Olish</span>
                                                        </Button>
                                                    </a>
                                                </div>
                                            </Card>
                                        </motion.div>
                                    );
                                })
                            ) : (
                                <div className="col-span-full py-20 text-center text-gray-500">
                                    <Info className="w-12 h-12 mx-auto mb-4 stroke-1 opacity-60" />
                                    Sizning so&apos;rovingiz bo&apos;yicha hech qanday operatsion tizim topilmadi.
                                </div>
                            )}
                        </AnimatePresence>
                    </div>
                )}

                {/* ===== ACTIVATION GUIDE SECTION ===== */}
                {activeCategory === 'Activation' && (
                    <div className="pb-20" id="activation">
                        <div className="mb-10 flex items-center gap-4">
                            <div className="w-12 h-12 rounded-xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center">
                                <ShieldCheck className="w-6 h-6 text-orange-400" />
                            </div>
                            <div>
                                <h2 className="text-3xl font-black tracking-tight">
                                    <GradientText>Windows & Office Aktivatsiyasi</GradientText>
                                </h2>
                                <p className="text-gray-400 text-sm mt-1">Rasmiy Microsoft Activation Scripts (MAS) orqali bepul doimiy aktivatsiya</p>
                            </div>
                        </div>

                        {/* Warning banner */}
                        <div className="flex gap-4 p-5 mb-8 rounded-2xl bg-red-500/8 border border-red-500/20">
                            <AlertTriangle className="w-6 h-6 text-red-400 flex-shrink-0 mt-0.5" />
                            <div className="space-y-1">
                                <h4 className="font-bold text-red-400">MUHIM: Oldin amalga oshiring</h4>
                                <ul className="text-sm text-gray-300 space-y-1 list-disc pl-4">
                                    <li>PowerShell-ni <strong>Administrator</strong> huquqida ishga tushiring</li>
                                    <li>Skript ishlashi uchun <strong>Windows Firewall va Antivirusni vaqtincha o&apos;chiring</strong></li>
                                </ul>
                            </div>
                        </div>

                        {/* Step 1: Run Script */}
                        <div className="space-y-10">
                            <ActivationStep number={1} title="Aktivatsiya skriptini ishga tushiring">
                                <p className="text-gray-400 text-sm mb-4">
                                    PowerShell (Admin) da quyidagi buyruqni bering. Skript avtomatik yuklanib ishga tushadi:
                                </p>
                                <CopyBlock text="irm get.activated.win | iex" />
                                <div className="mt-6 rounded-xl overflow-hidden border border-white/10">
                                    <Image src="/activate-1-command.png" alt="Buyruq PowerShell da" width={900} height={300} className="w-full object-cover" />
                                </div>
                            </ActivationStep>

                            {/* Windows Activation */}
                            <div className="pt-8 border-t border-white/5">
                                <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                                    <span className="w-7 h-7 rounded-lg bg-blue-500/20 border border-blue-500/30 flex items-center justify-center text-blue-400 text-sm font-bold">W</span>
                                    Windows Aktivatsiyasi
                                </h3>
                                <div className="space-y-8">
                                    <ActivationStep number={2} title="Menyudan [1] HWID – Windows ni tanlang">
                                        <p className="text-gray-400 text-sm mb-4">
                                            Skript ishga tushgandan so&apos;ng menyu ko&apos;rsatiladi. Klaviaturadan <kbd className="px-2 py-0.5 bg-white/10 border border-white/10 rounded text-xs font-mono">1</kbd> tugmasini bosib Windows aktivatsiyasini tanlang:
                                        </p>
                                        <div className="rounded-xl overflow-hidden border border-white/10">
                                            <Image src="/activate-win-select.png" alt="Windows 1 tanlangan" width={900} height={460} className="w-full object-cover" />
                                        </div>
                                    </ActivationStep>

                                    <ActivationStep number={3} title="Aktivatsiya yakunlanishini kuting">
                                        <p className="text-gray-400 text-sm mb-4">
                                            Bir necha soniya ichida aktivatsiya jarayoni tugaydi va quyidagi natija ko&apos;rsatiladi:
                                        </p>
                                        <div className="rounded-xl overflow-hidden border border-green-500/20 shadow-[0_0_20px_rgba(34,197,94,0.05)]">
                                            <Image src="/activate-win-done.png" alt="Windows aktivatsiya yakunlandi" width={900} height={280} className="w-full object-cover" />
                                        </div>
                                        <div className="mt-3 flex items-center gap-2 text-green-400 text-sm">
                                            <Check className="w-4 h-4" />
                                            <span>Windows muvaffaqiyatli va doimiy ravishda aktivatsiya qilinadi!</span>
                                        </div>
                                    </ActivationStep>
                                </div>
                            </div>

                            {/* Office Activation */}
                            <div className="pt-8 border-t border-white/5">
                                <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                                    <span className="w-7 h-7 rounded-lg bg-orange-500/20 border border-orange-500/30 flex items-center justify-center text-orange-400 text-sm font-bold">O</span>
                                    Microsoft Office Aktivatsiyasi
                                </h3>
                                <p className="text-gray-400 text-sm mb-6">
                                    Office aktivatsiyasi uchun xuddi shu skriptdan foydalaniladi. Qayta ishlating yoki menyu ochiq bo&apos;lsa davom eting:
                                </p>
                                <div className="space-y-8">
                                    <ActivationStep number={4} title="Menyudan [2] Ohook – Office ni tanlang">
                                        <p className="text-gray-400 text-sm mb-4">
                                            Aktivatsiya menyusida <kbd className="px-2 py-0.5 bg-white/10 border border-white/10 rounded text-xs font-mono">2</kbd> tugmasini bosib Office bo&apos;limiga o&apos;ting:
                                        </p>
                                        <div className="rounded-xl overflow-hidden border border-white/10">
                                            <Image src="/activate-office-select.png" alt="Office 2 tanlangan" width={900} height={460} className="w-full object-cover" />
                                        </div>
                                    </ActivationStep>

                                    <ActivationStep number={5} title="[1] Install Ohook Office Activation ni tanlang">
                                        <p className="text-gray-400 text-sm mb-4">
                                            Office submenyusida <kbd className="px-2 py-0.5 bg-white/10 border border-white/10 rounded text-xs font-mono">1</kbd> tugmasini bosib aktivatsiyani o&apos;rnating:
                                        </p>
                                        <div className="rounded-xl overflow-hidden border border-white/10">
                                            <Image src="/activate-office-done.png" alt="Office aktivatsiya 1 tanlangan" width={900} height={360} className="w-full object-cover" />
                                        </div>
                                        <div className="mt-3 flex items-center gap-2 text-green-400 text-sm">
                                            <Check className="w-4 h-4" />
                                            <span>Microsoft Office doimiy ravishda aktivatsiya qilinadi!</span>
                                        </div>
                                    </ActivationStep>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </Section>
        </div>
    );
}

// ===== Helper Components =====

function ActivationStep({ number, title, children }: { number: number; title: string; children: React.ReactNode }) {
    return (
        <div className="space-y-4">
            <h4 className="text-base font-bold text-white flex items-center gap-3">
                <span className="w-7 h-7 rounded-full bg-white/10 border border-white/10 flex items-center justify-center text-xs font-bold text-gray-300 flex-shrink-0">
                    {number}
                </span>
                {title}
            </h4>
            <div className="pl-10">
                {children}
            </div>
        </div>
    );
}

function CopyBlock({ text }: { text: string }) {
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="relative group">
            <pre className="bg-black/50 border border-white/10 p-4 rounded-xl font-mono text-sm overflow-x-auto text-orange-400 pr-16 select-all">
                {text}
            </pre>
            <button
                onClick={handleCopy}
                className="absolute right-3 top-3 p-2 bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white rounded-lg transition-all"
                title="Nusxa olish"
            >
                {copied ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
            </button>
        </div>
    );
}
