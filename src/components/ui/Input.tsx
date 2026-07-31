import { forwardRef, type InputHTMLAttributes, type ReactNode } from 'react';
import { cn } from '@/shared/utils/cn';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  leftAdornment?: ReactNode;
  rightAdornment?: ReactNode;
}

const Input = forwardRef<HTMLInputElement, InputProps>(({ className, leftAdornment, rightAdornment, ...props }, ref) => {
    return (
        <div className="relative">
            {leftAdornment && (
                <div className="absolute inset-y-0 left-3 flex items-center">
                    {leftAdornment}
                </div>
            )}

            <input
                ref={ref}
                className={cn(
                    'w-full rounded-lg border border-gray-300 bg-white py-2 text-sm outline-none transition-colors',
                    'focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20',
                    leftAdornment ? 'pl-10' : 'px-3',
                    rightAdornment ? 'pr-10' : 'px-3',
                    className,
                )}
                {...props}
            />

            {rightAdornment && (
                <div className="absolute inset-y-0 right-3 flex items-center">
                    {rightAdornment}
                </div>
            )}
        </div>
    );
});

Input.displayName = 'Input';

export default Input;