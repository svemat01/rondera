import type { Migration } from 'scyllo';

import type { UserV1 } from '../types/user.js';

export const m002_create_users: Migration<{
    users: UserV1;
}> = async (database) => {
    await database.createTable(
        'users',
        true,
        {
            uid: { type: 'bigint' },
            kid: { type: 'bigint' },
            username: { type: 'text' },
            password: { type: 'text' },
            permissions: { type: 'bigint' },
        },
        'uid',
    );

    await database.createIndex('users', 'users_by_username', 'username');
};
