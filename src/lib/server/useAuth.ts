import { error, redirect } from '@sveltejs/kit';
import { hasPermission } from 'permissio';

import type { User } from '$db/types/user.js';

import type { Permissions } from './permissions.js';

export const useAuth = (user: User | undefined, requiredPermissions: Permissions[] = []) => {
    if (!user) {
        throw redirect(307, '/login');
    }

    if (requiredPermissions.length > 0) {
        const hasPermissions = requiredPermissions.every((permission) =>
            hasPermission(user.permissions, permission),
        );

        if (!hasPermissions) {
            throw error(403, 'Forbidden');
        }
    }

    return user;
};
