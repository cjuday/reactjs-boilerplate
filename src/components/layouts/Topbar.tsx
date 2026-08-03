import { Menu } from 'lucide-react';
import UserMenu from './UserMenu';
import Logo from './Logo';

interface Props {
    onMenuClick: () => void;
}

export default function Topbar({ onMenuClick }: Props) {
    return (
        <header className="sticky top-0 z-30 flex h-16 items-center justify-between bg-white shadow-sm">
            {/* Desktop */}
            <div className="hidden lg:flex">
                <div className="hidden h-16 w-60 items-center justify-center border-b border-slate-200 bg-white lg:flex">
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
            <div className="hidden px-6 lg:block">
                <UserMenu />
            </div>
        </header>
    );
}