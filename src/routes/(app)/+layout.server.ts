import type { LayoutServerLoad } from './$types';

export const load = (async ({ locals }) => {
    return {
        user: locals.user as NonNullable<typeof locals.user>,
    };
}) satisfies LayoutServerLoad;
