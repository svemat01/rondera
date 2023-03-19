import type { LayoutServerLoad } from './$types';
import { setupCheck } from './setupCheck.js';

export const load = (async () => {
    const setup = await setupCheck();

    return {
        setup,
    };
}) satisfies LayoutServerLoad;
