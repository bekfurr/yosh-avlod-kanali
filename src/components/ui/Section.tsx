'use client';

import { motion } from 'framer-motion';
import { clsx } from 'clsx';

interface SectionProps {
    children: React.ReactNode;
    className?: string;
    delay?: number;
}

export default function Section({ children, className, delay = 0 }: SectionProps) {
    return (
        <motion.section
            initial={{ opacity: 0, filter: 'blur(10px)', y: 30 }}
            whileInView={{ opacity: 1, filter: 'blur(0px)', y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay, ease: 'easeOut' }}
            className={clsx('relative', className)}
        >
            {children}
        </motion.section>
    );
}
