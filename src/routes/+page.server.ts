import { setupCheck } from './(auth)/setupCheck.js';
import type { PageServerLoad } from './$types';

export const load = (async () => {
    const setup = await setupCheck();
    return { setup };
}) satisfies PageServerLoad;
