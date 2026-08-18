import { useSelector } from 'react-redux';
import type { RootState } from '@/app/store';

export function usePermissions() {
    const user = useSelector(
        (state: RootState) => state.auth.user,
    );

    const hasPermission = (
        resource: string,
        action: string,
    ): boolean => {
        if (!user) {
            return false;
        }

        return user.permissions?.some((permission) =>
                permission.resource === resource &&
                permission.action === action,
        ) ?? false;
    };

    return {
        hasPermission,
    };
}