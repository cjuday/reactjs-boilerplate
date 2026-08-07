import type { LucideIcon } from 'lucide-react';

export interface SidebarMenuItem {
    id: string;
    label: string;
    icon: LucideIcon;
    to?: string;
    children?: SidebarMenuItem[];
}