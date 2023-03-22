import { error, fail, redirect } from '@sveltejs/kit';
import { superValidate } from 'sveltekit-superforms/server';
import { z } from 'zod';

import { DB } from '$db/database.js';
import type { SubCentral } from '$db/types/subcentral.js';
import { invalidateRedisCache, useRedisCache } from '$lib/server/cache/redisCache.js';
import { useCache } from '$lib/server/useCache.js';

import type { Actions, PageServerLoad } from './$types';

const schema = z.object({
    id: z.bigint(),
    name: z.string().min(1).max(512),
    description: z.string().min(1).max(1024),
});

export const load = (async ({ params }) => {
    const { id } = params;

    const subcentral = await useCache<SubCentral>(
        `subcentral:${id}`,
        useRedisCache(300),
        async () => {
            return await DB.selectOneFrom('subcentrals', '*', { id });
        },
    );

    if (!subcentral) {
        throw error(404, 'Not found');
    }

    const form = await superValidate(subcentral, schema);

    return { form };
}) satisfies PageServerLoad;

export const actions = {
    default: async (event) => {
        const data = await event.request.formData();
        const form = await superValidate(data, schema);

        console.log('POST', form, data);

        if (!form.valid) {
            return fail(400, { form });
        }

        if (data.has('delete')) {
            await DB.deleteFrom('subcentrals', '*', {
                id: form.data.id,
            });

            await invalidateRedisCache(`subcentral:${form.data.id}`);

            throw redirect(302, '/subcentrals');
        } else {
            await DB.update(
                'subcentrals',
                {
                    name: form.data.name,
                    description: form.data.description,
                },
                { id: form.data.id },
            );

            await invalidateRedisCache(`subcentral:${form.data.id}`);
        }
    },
} satisfies Actions;
