import { LoaderCircle } from 'lucide-react';
import { cn } from '@/shared/utils/cn';

interface SpinnerProps {
    size?: 'sm' | 'md' | 'lg' | 'xl';
    className?: string;
}

export default function Spinner({ size = 'md', className }: SpinnerProps) {
    return (
        <LoaderCircle
            className={cn(
                'animate-spin',
                {
                    'h-4 w-4': size === 'sm',
                    'h-6 w-6': size === 'md',
                    'h-8 w-8': size === 'lg',
                    'h-12 w-12': size === 'xl',
                },
                className,
            )}
        />
    );
}