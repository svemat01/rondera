import { errors } from 'cassandra-driver';
import { ScylloClient } from 'scyllo';

import { environment } from '$lib/server/environment.js';

import { runMigrations } from './migrations.js';
import type { SubCentral } from './types/subcentral.js';
import type { User } from './types/user.js';

export const KEYSPACE = 'tracka';

export const DB = new ScylloClient<{
    subcentrals: SubCentral;
    users: User;
}>({
    client: {
        keyspace: 'system',
        localDataCenter: 'datacenter1',
        contactPoints: [environment.SCYLLO_DB_HOST],
        encoding: {
            useBigIntAsLong: true,
            useBigIntAsVarint: true,
        },
    },
});

export const setupDB = async () => {
    console.log('Connecting to database...');

    let retries = 5;

    while (retries > 0) {
        try {
            await DB.client.connect();
            break;
        } catch (error) {
            if (error instanceof errors.NoHostAvailableError) {
                console.error('Could not connect to DB, retrying in 5 seconds...');
                retries -= 1;
                await new Promise((resolve) => setTimeout(resolve, 5000));
            } else {
                throw error;
            }
        }
    }

    if (retries === 0) {
        console.error('Could not connect to DB, exiting...');
        throw new Error('Could not connect to DB');
    }

    console.log('Connected to database');

    await runMigrations();
};
