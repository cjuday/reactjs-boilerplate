import { Check, Monitor, Moon, Sun } from 'lucide-react';
import useTheme from './useTheme';
import type { ThemeMode } from './theme.types';
import { cn } from '@/shared/utils/cn';
import { PopoverItem } from '@/components/ui/Popover';

const themes: {
    value: ThemeMode;
    label: string;
    icon: typeof Sun;
}[] = [
    {
        value: 'light',
        label: 'Light',
        icon: Sun,
    },
    {
        value: 'dark',
        label: 'Dark',
        icon: Moon,
    },
    {
        value: 'system',
        label: 'System',
        icon: Monitor,
    },
];

export default function ThemeSwitcher() {
    const { theme, setTheme } = useTheme();

    return (
        <div className="space-y-1">
            {themes.map(({ value, label, icon: Icon }) => (
                <PopoverItem
                    key={value}
                    onClick={() => setTheme(value)}
                    className={cn(
                        theme === value
                            ? 'bg-blue-50 text-blue-700'
                            : '',
                    )}
                >
                    <div className="flex items-center gap-3">
                        <Icon size={18} />
                        <span>{label}</span>
                    </div>

                    {theme === value && (
                        <Check size={16} />
                    )}
                </PopoverItem>
            ))}
        </div>
    );
}