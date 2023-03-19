import jsonwebtoken from 'jsonwebtoken';
import { z } from 'zod';

import { DB } from '$db/database.js';

import { environment } from '../environment.js';
import { SnowflakeGen } from '../sunflake.js';

export const authKeyJWTSchema = z.object({
    id: z.coerce.bigint(),
});

export const createKey = async (uid: bigint) => {
    const kid = SnowflakeGen();

    await DB.insertInto('keys', {
        kid,
        uid,
    });

    const keyData = {
        id: kid.toString(),
    }

    const key = jsonwebtoken.sign(keyData, environment.JWT_PRIVATE_KEY)

    return key;
}