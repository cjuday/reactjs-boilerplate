import { ChevronDown, LogOut, Settings, User } from 'lucide-react';
import { Dropdown } from '@/components/ui';
import { useLogout } from '@/features/auth/hooks/use-logout';
import { useAppSelector } from '@/app/hooks';

export default function UserMenu() {
    const { signOut } = useLogout();
    const userName = useAppSelector((state) => state.auth.user?.name);

    return (
        <Dropdown
        trigger={
            <div className="flex items-center gap-2 rounded-lg px-3 py-2 transition hover:bg-slate-100">
            <User size={18} />

            <span className="text-sm font-medium">
                {userName}
            </span>

            <ChevronDown size={16} />
            </div>
        }
        >
        <div className="py-2">
            <button className="flex w-full items-center gap-3 px-4 py-2 text-sm hover:bg-slate-100">
            <User size={16} />
            My Profile
            </button>

            <button className="flex w-full items-center gap-3 px-4 py-2 text-sm hover:bg-slate-100">
            <Settings size={16} />
            Settings
            </button>

            <hr className="my-2 border-slate-200" />

            <button
            onClick={signOut}
            className="flex w-full items-center gap-3 px-4 py-2 text-sm text-red-600 hover:bg-red-50"
            >
            <LogOut size={16} />
            Logout
            </button>
        </div>
        </Dropdown>
    );
}