'use client';

import { ButtonHTMLAttributes, forwardRef } from 'react';
import { motion } from 'framer-motion';
import { twMerge } from 'tailwind-merge';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'glass';
    size?: 'sm' | 'md' | 'lg';
    glow?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant = 'primary', size = 'md', glow = false, children, ...props }, ref) => {
        const baseStyles = 'inline-flex items-center justify-center font-medium transition-all focus:outline-none disabled:opacity-50 disabled:pointer-events-none active:scale-95 cursor-pointer select-none';

        const variants = {
            primary: 'bg-white text-black hover:bg-gray-100 rounded-xl shadow-[0_4px_16px_rgba(255,255,255,0.2)]',
            secondary: 'bg-white/10 text-white hover:bg-white/18 backdrop-blur-xl border border-white/15 rounded-xl shadow-[inset_0_1px_0_rgba(255,255,255,0.2)]',
            glass: 'apple-glass-button text-white rounded-xl',
            outline: 'border border-white/20 text-white hover:bg-white/10 hover:border-white/30 backdrop-blur-md rounded-xl',
            ghost: 'text-gray-300 hover:text-white hover:bg-white/8 rounded-xl',
        };

        const sizes = {
            sm: 'h-8 px-3.5 text-xs rounded-lg',
            md: 'h-10 px-5 text-sm rounded-xl',
            lg: 'h-12 px-8 text-base rounded-2xl',
        };

        const glowStyles = glow ? 'shadow-[0_0_24px_rgba(255,255,255,0.22)] hover:shadow-[0_0_36px_rgba(255,255,255,0.35)]' : '';

        return (
            <motion.button
                ref={ref}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                transition={{ duration: 0.18, ease: 'easeOut' }}
                className={twMerge(baseStyles, variants[variant], sizes[size], glowStyles, className)}
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                {...(props as any)}
            >
                {children}
            </motion.button>
        );
    }
);

Button.displayName = 'Button';

export default Button;
