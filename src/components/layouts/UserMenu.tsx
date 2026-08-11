import { Bell, LogOut, User } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLogout } from '@/features/auth/hooks/use-logout';
import HeaderIconButton from '../ui/HeaderIconButton';

export default function UserMenu() {
    const { signOut } = useLogout();

    return (
        <div className="flex items-center gap-1">

            <HeaderIconButton title="Notifications">
                <Bell size={20} />
            </HeaderIconButton>

            <Link
                to="/profile"
                title="Profile"
                className="rounded-control p-2 text-muted transition-all duration-200 hover:bg-surface-hover hover:text-foreground"
            >
                <User size={20} />
            </Link>

            <HeaderIconButton
                title="Logout"
                onClick={signOut}
            >
                <LogOut size={20} />
            </HeaderIconButton>

        </div>
    );
}