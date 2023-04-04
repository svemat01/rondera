import type { Handle } from '@sveltejs/kit';

import { useAuth } from '$lib/server/useAuth.js';

export const checkAuth = (async ({ event, resolve }) => {

    if (!event.url.pathname.startsWith('/auth')) {
        useAuth(event);
    }

    return await resolve(event);
}) satisfies Handle;
