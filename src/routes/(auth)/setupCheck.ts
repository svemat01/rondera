import { DB } from '$db/database.js';
import { useLocalCache } from '$lib/server/cache/localCache.js';
import { useCache } from '$lib/server/useCache.js';

export const setupCheck = async () => {
    const setup = await useCache<boolean>('setup', useLocalCache(), async () => {
        return !!(await DB.selectOneFrom('users', ['uid'], {}));
    });

    return !setup;
};
