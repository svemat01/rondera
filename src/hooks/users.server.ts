import type { Handle } from '@sveltejs/kit';

import { resolveKey } from '$lib/server/functions/keys.js';

export const checkUser = (async ({ event, resolve }) => {
    const { cookies } = event;

    const auth = cookies.get('auth');

    if (!auth) {
        console.log('No auth cookie found');
        return await resolve(event);
    }

    const user = await resolveKey(auth);

    if (!user) {
        console.log('No user found');
        cookies.delete('auth');

        return await resolve(event);
    }

    event.locals.user = user;

    const response = await resolve(event);
    return response;
}) satisfies Handle;
