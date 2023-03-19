import { hash } from 'bcrypt';
import { grantPermission } from 'permissio';

import { DB } from '$db/database.js';

import type { Permissions } from '../permissions.js';
import { SnowflakeGen } from '../sunflake.js';

export const createUser = async (username: string, password: string, permissions: Permissions[]) => {
    const passwordHash = await hash(password, 10);

    const uid = SnowflakeGen();
    const kid = SnowflakeGen();

    const perms = grantPermission(0n, ...permissions)

    await DB.insertInto('users', {
        uid,
        kid,
        username,
        password: passwordHash,
        permissions: perms,
    });

    return uid;
}