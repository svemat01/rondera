import jsonwebtoken from 'jsonwebtoken';
import { z } from 'zod';

import { DB } from '$db/database.js';
import type { User } from '$db/types/user.js';
import { CoercedBigInt } from '$lib/schemes.js';

import { deleteLocalValue, useLocalCache } from '../cache/localCache.js';
import { deleteRedisValue, useRedisCache } from '../cache/redisCache.js';
import { environment } from '../environment.js';
import { SnowflakeGen } from '../sunflake.js';
import { tryCatchMe } from '../trycatchme.js';
import { useCache } from '../useCache.js';

export const authKeyJWTSchema = z.object({
    uid: CoercedBigInt,
    kid: CoercedBigInt,
});

type AuthKeyData = z.infer<typeof authKeyJWTSchema>;

export const createKey = async (uid: bigint, kid: bigint) => {
    const keyData: AuthKeyData = {
        uid,
        kid,
    };

    const key = jsonwebtoken.sign(keyData, environment.JWT_PRIVATE_KEY);

    return key;
};

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

    const user = await useCache<User>(
        `user:${jwtParsed.data.uid}`,
        useLocalCache(),
        useRedisCache(),
        async () => {
            return await DB.selectOneFrom('users', '*', {
                uid: jwtParsed.data.uid,
                kid: jwtParsed.data.kid,
            });
        },
    );

    return user;
};

export const resetKeyCache = async (uid: string) => {
    deleteLocalValue(`user:${uid}`);
    await deleteRedisValue(`user:${uid}`);
};

export const resetKey = async (uid: string) => {
    const kid = SnowflakeGen();

    await DB.update(
        'users',
        {
            kid,
        },
        {
            uid,
        },
    );

    await resetKeyCache(uid);
};
