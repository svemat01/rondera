import { createClient } from 'redis';
import superjson from 'superjson';

import { environment } from '../environment.js';
import type { ResolverSetter } from '../useCache.js';

export const redisCache = createClient({
    url: environment.REDIS_URL,
});

export const setupRedis = async () => {
    console.log('Connecting to Redis...');
    await redisCache.connect();
    console.log('Connected to Redis');
};

export const useRedisCache: <K>() => ResolverSetter<K> = (expiry = 600) => ({
    async resolver<K>(key: string) {
        if (redisCache && redisCache.isOpen) {
            const data = await redisCache.get(key);

            if (!data) return;

            return superjson.parse<K>(data);
        }
    },
    setter(key, value) {
        if (redisCache && redisCache.isOpen)
            redisCache.set(key, superjson.stringify(value), { EX: expiry });
    },
});
