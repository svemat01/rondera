import { error, fail, redirect } from '@sveltejs/kit';
import { setError, superValidate } from 'sveltekit-superforms/server';
import { z } from 'zod';

import { Password, Username } from '$lib/schemes.js';
import { createKey } from '$lib/server/functions/keys.js';
import { createUser } from '$lib/server/functions/users.js';
import { Permissions } from '$lib/server/permissions.js';

import type { Actions, PageServerLoad } from './$types';

const schema = z.object({
    username: Username,
    password: Password,
    passwordConfirm: Password,
});

export const load = (async (event) => {
    const { setup } = await event.parent();

    if (setup) {
        throw error(400, 'Setup already completed');
    }

    const form = await superValidate(event, schema);

    return {
        form,
    };
}) satisfies PageServerLoad;

export const actions = {
    default: async (event) => {
        // Same syntax as in the load function
        const form = await superValidate(event, schema);

        if (form.data.password !== form.data.passwordConfirm) {
            setError(form, 'password', 'Passwords do not match');
            setError(form, 'passwordConfirm', 'Passwords do not match');
        }

        console.log('POST', form);

        // Convenient validation check:
        if (!form.valid) {
            // Again, always return { form } and things will just work.
            return fail(400, { form });
        }

        const { uid, kid } = await createUser(form.data.username, form.data.password, [
            Permissions.FULL,
        ]);

        const key = await createKey(uid, kid);

        event.cookies.set('auth', key, {
            path: '/',
            httpOnly: true,
            sameSite: 'lax',
        });

        throw redirect(307, '/');
    },
} satisfies Actions;
