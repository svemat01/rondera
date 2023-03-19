import { redirect } from '@sveltejs/kit';

import { resetKeyCache } from '$lib/server/functions/keys.js';

import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ({ cookies, locals }) => {
    if (locals.user) {
        cookies.set('auth', '', {
            path: '/',
            httpOnly: true,
            sameSite: 'lax',
        });

        await resetKeyCache(locals.user.uid);

        locals.user = undefined;
    }

    throw redirect(307, '/')
};
