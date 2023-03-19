import { Migration } from 'scyllo';

import { KeyV1 } from '../types/key.js';

export const m003_create_keys: Migration<{
    keys: KeyV1;
}> = async (database) => {
    await database.createTable(
        'keys',
        true,
        {
            kid: { type: 'bigint' },
            uid: { type: 'bigint' },
        },
        'kid',
    );

    await database.createIndex('keys', 'keys_by_uid', 'uid');
};
