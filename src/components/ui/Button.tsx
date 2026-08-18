import { forwardRef, type ButtonHTMLAttributes } from 'react';
import Spinner from './Spinner';
import { cn } from '@/shared/utils/cn';

interface ButtonProps
    extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'danger' | 'ghost' | 'outline' | 'success' | 'warning' | 'link';
    size?: 'xs' | 'sm' | 'md' | 'lg';
    loading?: boolean;
    fullWidth?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(({children, className, variant = 'primary', size = 'md', loading = false, fullWidth = false, disabled, ...props}, ref)=> {
    return (
        <button
            ref={ref}
            disabled={disabled || loading}
            className={cn(
                'inline-flex items-center justify-center gap-2 rounded-control font-medium transition-colors',
                'focus:outline-none focus:ring-2 focus:ring-offset-2',
                'disabled:pointer-events-none disabled:opacity-50',
                fullWidth && 'w-full',
                {
                    'bg-primary text-primary-foreground hover:bg-primary-hover focus:ring-primary': variant === 'primary',
                    'border border-border bg-surface hover:bg-surface-hover focus:ring-primary': variant === 'secondary',
                    'bg-bottle-green text-white hover:bg-success-hover focus:ring-success': variant === 'success',
                    'bg-mahogany-red text-white hover:bg-danger-hover focus:ring-danger': variant === 'danger',
                    'hover:bg-surface-hover focus:ring-primary': variant === 'ghost',
                    'h-8 px-3 text-xs' : size === 'xs',
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