import { error, redirect, type RequestEvent } from '@sveltejs/kit';
import { hasPermission } from 'permissio';

import type { Permission } from '../utils/permissions.js';

export const useAuth = (event: RequestEvent, requiredPermissions: Permission[] = []) => {
    const { user } = event.locals;

    if (!user) {
        const toUrl = event.url.pathname + event.url.search;

        throw redirect(307, `/auth/login?redirectTo=${toUrl}`);
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
