import { hash } from 'bcrypt';
import { grantPermission } from 'permissio';

import { DB } from '$db/database.js';

import type { Permission } from '../../utils/permissions.js';
import { SnowflakeGen } from '../sunflake.js';

export const createUser = async (
    username: string,
    password: string,
    permissions: Permission[],
) => {
    const passwordHash = await hash(password, 10);

    const uid = SnowflakeGen();
    const kid = SnowflakeGen();

    const perms = grantPermission(0n, ...permissions);

    await DB.insertInto('users', {
        uid,
        kid,
        username,
        password: passwordHash,
        permissions: perms,
    });

    return { uid, kid };
};
