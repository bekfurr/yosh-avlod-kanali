'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useRef, useEffect } from 'react';
import { Menu, X, Youtube, Globe, ChevronDown, Check } from 'lucide-react';
import { clsx } from 'clsx';
import Image from 'next/image';
import { useLanguage } from '@/context/LanguageContext';
import { languages, Locale } from '@/translations';

export default function Navbar() {
    const pathname = usePathname();
    const [isOpen, setIsOpen] = useState(false);
    const [isLangMenuOpen, setIsLangMenuOpen] = useState(false);
    const { locale, setLocale, t } = useLanguage();
    const langMenuRef = useRef<HTMLDivElement>(null);

    const navLinks = [
        { name: t.nav.home, href: '/' },
        { name: t.nav.videos, href: '/videos' },
        { name: t.nav.programs, href: '/programs' },
        { name: t.nav.os, href: '/os' },
        { name: t.nav.author, href: '/author' },
        { name: t.nav.stats, href: '/stats' },
    ];

    const currentLang = languages.find((l) => l.code === locale) || languages[0];

    // Close language dropdown on outside click
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (langMenuRef.current && !langMenuRef.current.contains(event.target as Node)) {
                setIsLangMenuOpen(false);
            }
        }
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleSelectLanguage = (code: Locale) => {
        setLocale(code);
        setIsLangMenuOpen(false);
    };

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 glass-panel border-b border-white/5">
            <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
                {/* Logo */}
                <Link href="/" className="flex items-center gap-3 group">
                    <div className="relative w-8 h-8 overflow-hidden rounded-full border border-amber-500/30 group-hover:border-amber-400/60 shadow-[0_0_12px_rgba(245,158,11,0.25)] transition-all flex items-center justify-center">
                        <Image
                            src="/logo-particle.jpg"
                            alt="Yosh Avlod Kanali Logo"
                            width={32}
                            height={32}
                            className="w-full h-full object-cover"
                            suppressHydrationWarning
                        />
                    </div>
                    <span className="font-bold text-lg tracking-tight group-hover:text-amber-300 transition-colors">
                        Yosh Avlod Kanali
                    </span>
                </Link>

                {/* Desktop Nav */}
                <div className="hidden md:flex items-center gap-6 lg:gap-8">
                    {navLinks.map((link) => {
                        const isActive = pathname === link.href;
                        return (
                            <Link
                                key={link.href}
                                href={link.href}
                                className={clsx(
                                    'relative text-sm font-medium transition-colors hover:text-white',
                                    isActive ? 'text-white' : 'text-gray-400'
                                )}
                            >
                                {link.name}
                                {isActive && (
                                    <motion.div
                                        layoutId="nav-pill"
                                        className="absolute -bottom-5 left-0 right-0 h-0.5 bg-white shadow-[0_0_10px_rgba(255,255,255,0.5)]"
                                    />
                                )}
                            </Link>
                        );
                    })}

                    {/* Language Switcher Dropdown */}
                    <div className="relative" ref={langMenuRef}>
                        <button
                            onClick={() => setIsLangMenuOpen(!isLangMenuOpen)}
                            className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-semibold text-gray-200 transition-all hover:border-white/20"
                            aria-label="Tilni tanlash / Select language"
                        >
                            <Globe className="w-3.5 h-3.5 text-blue-400" />
                            <span className="mr-0.5">{currentLang.flag}</span>
                            <span className="uppercase tracking-wider">{currentLang.code}</span>
                            <ChevronDown className={clsx('w-3 h-3 text-gray-400 transition-transform duration-200', isLangMenuOpen && 'rotate-180')} />
                        </button>

                        <AnimatePresence>
                            {isLangMenuOpen && (
                                <motion.div
                                    initial={{ opacity: 0, y: 8, scale: 0.95 }}
                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                    exit={{ opacity: 0, y: 8, scale: 0.95 }}
                                    transition={{ duration: 0.15 }}
                                    className="absolute right-0 mt-2 w-40 rounded-xl bg-[#0d0d0e]/95 backdrop-blur-xl border border-white/10 shadow-2xl p-1.5 z-50 flex flex-col gap-1"
                                >
                                    {languages.map((lang) => {
                                        const isSelected = locale === lang.code;
                                        return (
                                            <button
                                                key={lang.code}
                                                onClick={() => handleSelectLanguage(lang.code)}
                                                className={clsx(
                                                    'w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium transition-all text-left',
                                                    isSelected
                                                        ? 'bg-blue-600/20 text-blue-300 border border-blue-500/30 font-semibold'
                                                        : 'text-gray-300 hover:text-white hover:bg-white/5'
                                                )}
                                            >
                                                <span className="flex items-center gap-2">
                                                    <span>{lang.flag}</span>
                                                    <span>{lang.label}</span>
                                                </span>
                                                {isSelected && <Check className="w-3.5 h-3.5 text-blue-400" />}
                                            </button>
                                        );
                                    })}
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    {/* YouTube Button */}
                    <a
                        href="https://www.youtube.com/@YoshAvlodKanali"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <button className="bg-[#cc0000] hover:bg-[#ff0000] text-white px-4 py-2 rounded-full font-bold transition-all shadow-[0_0_15px_rgba(204,0,0,0.4)] hover:shadow-[0_0_25px_rgba(255,0,0,0.6)] flex items-center gap-2 transform hover:scale-105 text-xs lg:text-sm">
                            <Youtube className="w-4 h-4 fill-white" />
                            <span>YouTube</span>
                        </button>
                    </a>
                </div>

                {/* Mobile Right Controls */}
                <div className="flex md:hidden items-center gap-2">
                    {/* Quick Language Toggle on Mobile Top Bar */}
                    <button
                        onClick={() => {
                            const nextIdx = (languages.findIndex((l) => l.code === locale) + 1) % languages.length;
                            setLocale(languages[nextIdx].code);
                        }}
                        className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-xs text-gray-200"
                    >
                        <span>{currentLang.flag}</span>
                        <span className="uppercase font-bold text-[11px]">{currentLang.code}</span>
                    </button>

                    {/* Mobile Toggle */}
                    <button
                        className="p-2 text-gray-400 hover:text-white"
                        onClick={() => setIsOpen(!isOpen)}
                        aria-label="Menyu"
                    >
                        {isOpen ? <X /> : <Menu />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="md:hidden glass-panel border-b border-white/5 p-5 flex flex-col gap-4"
                >
                    {/* Language Segmented Control for Mobile */}
                    <div className="p-1 rounded-xl bg-white/5 border border-white/10 flex items-center gap-1">
                        {languages.map((lang) => {
                            const isSelected = locale === lang.code;
                            return (
                                <button
                                    key={lang.code}
                                    onClick={() => handleSelectLanguage(lang.code)}
                                    className={clsx(
                                        'flex-1 py-1.5 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition-all',
                                        isSelected
                                            ? 'bg-blue-600 text-white shadow-md'
                                            : 'text-gray-400 hover:text-white'
                                    )}
                                >
                                    <span>{lang.flag}</span>
                                    <span>{lang.label}</span>
                                </button>
                            );
                        })}
                    </div>

                    {navLinks.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            onClick={() => setIsOpen(false)}
                            className={clsx(
                                'text-sm font-medium px-4 py-2.5 rounded-lg transition-colors',
                                pathname === link.href
                                    ? 'bg-white/10 text-white font-semibold'
                                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                            )}
                        >
                            {link.name}
                        </Link>
                    ))}

                    <a
                        href="https://www.youtube.com/@YoshAvlodKanali"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="pt-2"
                    >
                        <button className="w-full bg-[#cc0000] hover:bg-[#ff0000] text-white py-2.5 rounded-xl font-bold transition-all shadow-[0_0_15px_rgba(204,0,0,0.4)] flex items-center justify-center gap-2">
                            <Youtube className="w-5 h-5 fill-white" />
                            <span>YouTube Kanalimiz</span>
                        </button>
                    </a>
                </motion.div>
            )}
        </nav>
    );
}
