import {
    LayoutDashboard,
    Users,
    Settings,
    User,
    Shield,
    KeyRound,
} from 'lucide-react';
import type { SidebarMenuItem } from './types/sidebar.types';

export const sidebarMenu: SidebarMenuItem[] = [
    {
        id: 'dashboard',
        label: 'Dashboard',
        icon: LayoutDashboard,
        to: '/dashboard',
    },
    {
        id: 'users',
        label: 'Users',
        icon: Users,
        to: '/users',
    },
    {
        id: 'settings',
        label: 'Settings',
        icon: Settings,
        children: [
            {
                id: 'profile',
                label: 'Profile',
                icon: User,
                to: '/profile',
            },
            {
                id: 'security',
                label: 'Security',
                icon: Shield,
                children: [
                    {
                        id: 'change-password',
                        label: 'Change Password',
                        icon: KeyRound,
                        to: '/settings/security',
                    },
                ],
            },
        ],
    },
];