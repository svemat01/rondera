import { DB, KEYSPACE } from './database.js';
import { m001_create_subcentrals } from './migrations/001_create_subcentrals.js';
import { m002_create_users } from './migrations/002_create_users.js';

export const migrations = [m001_create_subcentrals, m002_create_users];

export const runMigrations = async () => {
    await DB.useKeyspace(KEYSPACE, true);
    await DB.migrate(migrations, true);
};
