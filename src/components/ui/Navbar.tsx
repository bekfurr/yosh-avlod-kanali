'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { Menu, X, Youtube } from 'lucide-react';
import { clsx } from 'clsx';
import Image from 'next/image';

const navLinks = [
    { name: 'Bosh Sahifa', href: '/' },
    { name: 'Videolar', href: '/videos' },
    { name: 'Dasturlar', href: '/programs' },
    { name: 'Ramazon Taqvimi', href: '/ramazon-taqvimi' },
    { name: 'Statistika', href: '/stats' },
];

export default function Navbar() {
    const pathname = usePathname();
    const [isOpen, setIsOpen] = useState(false);

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 glass-panel border-b border-white/5">
            <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
                {/* Logo */}
                <Link href="/" className="flex items-center gap-3 group">
                    <div className="relative w-8 h-8 overflow-hidden rounded-full border border-white/10 group-hover:border-white/30 transition-colors">
                        <Image
                            src="/logo.png"
                            alt="Yosh Avlod Kanali Logo"
                            fill
                            className="object-cover"
                        />
                    </div>
                    <span className="font-bold text-lg tracking-tight group-hover:text-blue-400 transition-colors">
                        Yosh Avlod Kanali
                    </span>
                </Link>

                {/* Desktop Nav */}
                <div className="hidden md:flex items-center gap-8">
                    {navLinks.map((link) => {
                        const isActive = pathname === link.href;
                        return (
                            <Link
                                key={link.name}
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
                    <a
                        href="https://www.youtube.com/@YoshAvlodKanali"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <button className="bg-[#cc0000] hover:bg-[#ff0000] text-white px-5 py-2 rounded-full font-bold transition-all shadow-[0_0_15px_rgba(204,0,0,0.4)] hover:shadow-[0_0_25px_rgba(255,0,0,0.6)] flex items-center gap-2 transform hover:scale-105">
                            <Youtube className="w-5 h-5 fill-white" />
                            <span>YouTube</span>
                        </button>
                    </a>
                </div>

                {/* Mobile Toggle */}
                <button
                    className="md:hidden p-2 text-gray-400 hover:text-white"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    {isOpen ? <X /> : <Menu />}
                </button>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="md:hidden glass-panel border-b border-white/5 p-4 flex flex-col gap-4"
                >
                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            href={link.href}
                            onClick={() => setIsOpen(false)}
                            className={clsx(
                                'text-sm font-medium px-4 py-2 rounded-md transition-colors',
                                pathname === link.href
                                    ? 'bg-white/10 text-white'
                                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                            )}
                        >
                            {link.name}
                        </Link>
                    ))}
                </motion.div>
            )}
        </nav>
    );
}
