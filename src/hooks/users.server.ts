import type { Handle } from '@sveltejs/kit';
import jsonwebtoken from 'jsonwebtoken';

import { DB } from '$db/database.js';
import type { Key } from '$db/types/key.js';
import type { User } from '$db/types/user.js';
import { useLocalCache } from '$lib/server/cache/localCache.js';
import { useRedisCache } from '$lib/server/cache/redisCache.js';
import { environment } from '$lib/server/environment.js';
import { authKeyJWTSchema } from '$lib/server/functions/keys.js';
import { tryCatchMe } from '$lib/server/trycatchme.js';
import { useCache } from '$lib/server/useCache.js';

export const resolveKey = async (authToken: string) => {
    const [jwt, jwtError] = tryCatchMe(() =>
        jsonwebtoken.verify(authToken, environment.JWT_PRIVATE_KEY, {}),
    );

    if (jwtError) {
        return;
    }

    const jwtParsed = authKeyJWTSchema.safeParse(jwt);

    if (!jwtParsed.success) {
        return;
    }

    // const key = await DB.selectOneFrom('keys', '*', {
    //     kid: jwtParsed.data.id,
    // });

    const key = await useCache<Key>(
        `key:${jwtParsed.data.id}`,
        useLocalCache(),
        useRedisCache(),
        async () => {
            return await DB.selectOneFrom('keys', '*', {
                kid: jwtParsed.data.id,
            });
        },
    );

    return key;
};

export const checkUser = (async ({ event, resolve }) => {
    const { cookies } = event;

    const auth = cookies.get('auth');

    if (!auth) {
        console.log('No auth cookie found');
        return await resolve(event);
    }

    const key = await resolveKey(auth);

    if (!key) {
        console.log('No key found');
        cookies.delete('auth');

        return await resolve(event);
    }

    console.log('Key found', key);

    const user = await useCache<User>(
        `user:${key.uid}`,
        useLocalCache(),
        useRedisCache(),
        async () => {
            return await DB.selectOneFrom('users', '*', {
                uid: key.uid,
            });
        }
    )

    if (!user) {
        console.log('No user found');
        cookies.delete('auth');

        return await resolve(event);
    }

    event.locals.user = user;

    const response = await resolve(event);
    return response;
}) satisfies Handle;
