import { useAuth } from '$lib/server/useAuth.js';

import type { LayoutServerLoad } from './$types';

export const load = (async ({ locals }) => {
    useAuth(locals.user);

    return {};
}) satisfies LayoutServerLoad;
