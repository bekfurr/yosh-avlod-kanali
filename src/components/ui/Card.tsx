'use client';

import { motion } from 'framer-motion';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

interface CardProps {
    children: React.ReactNode;
    className?: string;
    hoverEffect?: boolean;
}

export default function Card({ children, className, hoverEffect = true }: CardProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            whileHover={hoverEffect ? { y: -5, boxShadow: "0 10px 40px -10px rgba(255,255,255,0.05)" } : {}}
            className={twMerge(
                'bg-[#0a0a0a] border border-[#1f1f1f] rounded-xl overflow-hidden',
                className
            )}
        >
            {children}
        </motion.div>
    );
}
