import { forwardRef, type ButtonHTMLAttributes } from 'react';
import Spinner from './Spinner';
import { cn } from '@/shared/utils/cn';

interface ButtonProps
    extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'danger' | 'ghost' | 'outline' | 'success' | 'warning' | 'link';
    size?: 'sm' | 'md' | 'lg';
    loading?: boolean;
    fullWidth?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(({children, className, variant = 'primary', size = 'md', loading = false, fullWidth = false, disabled, ...props}, ref)=> {
    return (
        <button
            ref={ref}
            disabled={disabled || loading}
            className={cn(
                'inline-flex items-center justify-center gap-2 rounded-lg font-medium transition-colors',
                'focus:outline-none focus:ring-2 focus:ring-offset-2',
                'disabled:pointer-events-none disabled:opacity-50',
                fullWidth && 'w-full',
                {
                    'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500': variant === 'primary',
                    'border border-gray-300 bg-white hover:bg-gray-50 focus:ring-gray-400': variant === 'secondary',
                    'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500': variant === 'danger',
                    'hover:bg-gray-100 focus:ring-gray-400': variant === 'ghost',
                    'h-9 px-3 text-sm': size === 'sm',
                    'h-10 px-4 text-sm': size === 'md',
                    'h-11 px-5 text-base': size === 'lg',
                },
                className,
            )}
            {...props}
        >
            {loading && <Spinner size="sm" className="text-current" />}
            {children}
        </button>
    );
  },
);

Button.displayName = 'Button';

export default Button;