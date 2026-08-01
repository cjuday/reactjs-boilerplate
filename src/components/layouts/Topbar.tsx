import { Menu } from 'lucide-react';
import UserMenu from './UserMenu';

interface Props {
    onMenuClick: () => void;
}

export default function Topbar({ onMenuClick }: Props) {
    return (
        <header className="sticky top-0 z-30 flex h-16 items-center justify-between bg-white px-6 shadow-sm">
            <div className="flex items-center gap-4">
                <button className="lg:hidden" onClick={onMenuClick}>
                    <Menu size={24} />
                </button>

                <h2 className="text-lg font-semibold">
                    Dashboard
                </h2>
            </div>

            <UserMenu />
        </header>
    );
}