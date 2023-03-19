import NodeCache from 'node-cache';
import superjson from 'superjson';

import { building } from '$app/environment';
import type { ResolverSetter } from '$lib/server/useCache.js';

export const localCache = building
    ? (undefined as unknown as NodeCache)
    : new NodeCache({
          stdTTL: 5,
      });

export const useLocalCache: <K>() => ResolverSetter<K> = () => ({
    async resolver(key) {
        const data = localCache.get(key);

        if (!data) return;

        return superjson.parse(data as string);
    },
    setter(key, value) {
        localCache.set(key, superjson.stringify(value));
    },
});

export const deleteLocalValue = (key: string) => {
    localCache.del(key);
}