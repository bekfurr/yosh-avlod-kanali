import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

interface GradientTextProps {
    children: React.ReactNode;
    className?: string;
    animate?: boolean;
}

export default function GradientText({ children, className, animate = false }: GradientTextProps) {
    return (
        <span
            className={twMerge(
                'bg-clip-text text-transparent bg-gradient-to-br from-white via-gray-300 to-gray-600',
                animate && 'spotlight-text',
                className
            )}
        >
            {children}
        </span>
    );
}
