import { fail, redirect } from '@sveltejs/kit';
import { superValidate } from 'sveltekit-superforms/server';
import { z } from 'zod';

import { DB } from '$db/database.js';
import { SnowflakeGen } from '$lib/server/sunflake';

import type { Actions, PageServerLoad } from './$types';

const schema = z.object({
    name: z.string().min(1).max(512),
    description: z.string().min(1).max(1024),
});

export const load = (async (event) => {
    const form = await superValidate(event, schema);
    return { form };
}) satisfies PageServerLoad;

export const actions = {
    default: async (event) => {
        const form = await superValidate(event, schema);

        console.log('POST', form);

        if (!form.valid) {
            return fail(400, { form });
        }

        const subCentralId = SnowflakeGen();

        await DB.insertInto('subcentrals', {
            id: subCentralId,
            name: form.data.name,
            description: form.data.description,
        });

        throw redirect(302, `/subcentrals/${subCentralId}`);
    },
} satisfies Actions;
