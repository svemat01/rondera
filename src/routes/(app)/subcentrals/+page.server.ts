import { DB } from '$db/database.js';
import type { SubCentral } from '$db/types/subcentral.js';
import { useCache } from '$lib/server/useCache.js';

import type { PageServerLoad } from './$types';

export const load = (async () => {
    const subcentrals = await useCache<SubCentral[]>(
        'subcentrals',
        // useRedisCache(300),
        async () => {
            return await DB.selectFrom('subcentrals', '*');
        },
    );

    return {
        subcentrals,
    };
}) satisfies PageServerLoad;
