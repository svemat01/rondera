import { DB, KEYSPACE } from './database.js';
import { m001_create_subcentrals } from './migrations/001_create_subcentrals.js';
import { m002_create_users } from './migrations/002_create_users.js';
import { m003_create_keys } from './migrations/003_create_keys.js';

export const migrations = [m001_create_subcentrals, m002_create_users, m003_create_keys];

export const runMigrations = async () => {
    await DB.useKeyspace(KEYSPACE, true);
    await DB.migrate(migrations, true);
};
