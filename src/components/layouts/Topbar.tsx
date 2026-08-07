import { Menu } from 'lucide-react';
import UserMenu from './UserMenu';
import Logo from './Logo';
import { Moon } from 'lucide-react';
import ThemeSwitcher from '@/shared/theme/ThemeSwitcher';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/Popover';

interface Props {
    onMenuClick: () => void;
}

export default function Topbar({ onMenuClick }: Props) {
    return (
        <header className="sticky top-0 z-30 flex h-16 items-center justify-between bg-[var(--surface)] shadow-sm">
            {/* Desktop */}
            <div className="hidden lg:flex">
                <div className="hidden h-16 w-60 items-center justify-center border-b border-[var(--border)] bg-[var(--surface)] lg:flex">
                    <Logo />
                </div>

                <div className="flex items-center px-6">
                    <h2 className="text-lg font-semibold">
                        Dashboard
                    </h2>
                </div>
            </div>
            {/* Mobile */}
            <div className="flex w-full items-center justify-between px-4 lg:hidden">
                <button
                    type="button"
                    onClick={onMenuClick}
                    className="rounded-md p-2 hover:bg-slate-100"
                >
                    <Menu size={20} />
                </button>
                <Logo />
                <UserMenu />
            </div>
            {/* Desktop User Menu */}
            <div className="hidden items-center gap-2 px-6 lg:flex">
                <Popover>
                    <PopoverTrigger className="flex h-10 w-10 items-center justify-center rounded-lg text-slate-600 transition-colors hover:bg-slate-100">
                        <Moon size={18} />
                    </PopoverTrigger>

                    <PopoverContent>
                        <ThemeSwitcher />
                    </PopoverContent>
                </Popover>

                <UserMenu />
            </div>
        </header>
    );
}