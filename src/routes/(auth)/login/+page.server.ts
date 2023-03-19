import { error, fail, redirect } from '@sveltejs/kit';
import { setError, superValidate } from 'sveltekit-superforms/server';
import { z } from 'zod';

import { Password, Username } from '$lib/schemes.js';
import { createKey } from '$lib/server/functions/keys.js';
import { createUser } from '$lib/server/functions/users.js';
import { Permissions } from '$lib/server/permissions.js';

import { setupCheck } from '../setupCheck.js';
import type { Actions, PageServerLoad } from './$types';
import { DB } from '$db/database.js';
import { compare } from 'bcrypt';

const schema = z.object({
    username: Username,
    password: Password,
});

export const load = (async (event) => {
    const setup = await setupCheck();

    // If setup hasn't been completed, redirect to the setup page
    if (!setup) {
        throw redirect(307, '/setup');
    }

    const form = await superValidate(event, schema);

    return {
        form,
    };
}) satisfies PageServerLoad;

export const actions = {
    default: async (event) => {
        const setup = await setupCheck();
    
        // If setup hasn't been completed, redirect to the setup page
        if (!setup) {
            throw redirect(307, '/setup');
        }

        // Same syntax as in the load function
        const form = await superValidate(event, schema);

        // Convenient validation check:
        if (!form.valid) {
            // Again, always return { form } and things will just work.
            return fail(400, { form });
        }

        console.log('POST', form);

        const user = await DB.selectOneFrom('users', '*', {
            username: form.data.username,
        })

        if (!user) {
            setError(form, 'password', 'Invalid username or password');
            setError(form, 'username', 'Invalid username or password');

            return fail(400, { form });
        }

        const passwordMatches = await compare(form.data.password, user.password);

        if (!passwordMatches) {
            setError(form, 'password', 'Invalid username or password');
            setError(form, 'username', 'Invalid username or password');

            return fail(400, { form });
        }

        const key = await createKey(user.uid, user.kid);

        event.cookies.set('auth', key, {
            path: '/',
            httpOnly: true,
            sameSite: 'lax',
        });

        throw redirect(307, '/');
    },
} satisfies Actions;
