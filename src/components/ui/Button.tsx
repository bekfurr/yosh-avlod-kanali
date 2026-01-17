'use client';

import { ButtonHTMLAttributes, forwardRef } from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
    size?: 'sm' | 'md' | 'lg';
    glow?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant = 'primary', size = 'md', glow = false, children, ...props }, ref) => {
        const baseStyles = 'inline-flex items-center justify-center rounded-lg font-medium transition-all focus:outline-none disabled:opacity-50 disabled:pointer-events-none active:scale-95';

        const variants = {
            primary: 'bg-white text-black hover:bg-gray-200',
            secondary: 'bg-white/10 text-white hover:bg-white/20 backdrop-blur-sm',
            outline: 'border border-white/20 text-white hover:bg-white/10',
            ghost: 'text-gray-400 hover:text-white hover:bg-white/5',
        };

        const sizes = {
            sm: 'h-8 px-3 text-xs',
            md: 'h-10 px-5 text-sm',
            lg: 'h-12 px-8 text-base',
        };

        const glowStyles = glow ? 'shadow-[0_0_20px_rgba(255,255,255,0.15)] hover:shadow-[0_0_30px_rgba(255,255,255,0.3)]' : '';

        return (
            <motion.button
                ref={ref}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={twMerge(baseStyles, variants[variant], sizes[size], glowStyles, className)}
                {...(props as any)}
            >
                {children}
            </motion.button>
        );
    }
);

Button.displayName = 'Button';

export default Button;
