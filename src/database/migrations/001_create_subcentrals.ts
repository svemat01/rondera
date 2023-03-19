import { Migration } from 'scyllo';

import { SubCentralV1 } from '../types/subcentral.js';
import { KEYSPACE } from './../database.js';

export const m001_create_subcentrals: Migration<{
    subcentrals: SubCentralV1;
}> = async (database) => {
    await database.useKeyspace(KEYSPACE);

    await database.createTable(
        'subcentrals',
        true,
        {
            id: { type: 'bigint' },
            name: { type: 'text' },
            description: { type: 'text' },
        },
        'id',
    );

    const centralID = 80_795_984_841_412_608n;

    await database.insertInto('subcentrals', {
        id: centralID,
        name: 'BigStreet 1',
        description: 'Hidden in the shadows',
    });

    const central = await database.selectFrom('subcentrals', '*', {
        id: centralID,
    });

    if (!central || central.length === 0 || central[0].id !== centralID) {
        throw new Error('Failed to create custom subcentral');
    }

    await database.deleteFrom('subcentrals', '*', {
        id: centralID,
    });
};
