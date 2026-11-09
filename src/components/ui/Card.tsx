'use client';

import { motion } from 'framer-motion';
import { twMerge } from 'tailwind-merge';

interface CardProps {
    children: React.ReactNode;
    className?: string;
    hoverEffect?: boolean;
    style?: React.CSSProperties;
}

export default function Card({ children, className, hoverEffect = true, style }: CardProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            whileHover={
                hoverEffect
                    ? {
                          y: -4,
                          transition: { duration: 0.25, ease: [0.2, 0.8, 0.2, 1] },
                      }
                    : {}
            }
            style={style}
            className={twMerge(
                'apple-glass-card overflow-hidden',
                className
            )}
        >
            {children}
        </motion.div>
    );
}
