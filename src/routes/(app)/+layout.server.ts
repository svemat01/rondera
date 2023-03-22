import type { SecureUser } from '$db/types/user.js';
import { useAuth } from '$lib/server/useAuth.js';

import type { LayoutServerLoad } from './$types';

export const load = (async ({ locals }) => {
    useAuth(locals.user);

    return {
        user: locals.user as SecureUser,
    };
}) satisfies LayoutServerLoad;
