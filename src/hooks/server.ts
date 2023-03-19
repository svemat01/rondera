import { building } from '$app/environment';
import { setupDB } from '$db/database.js';
import { setupRedis } from '$lib/server/cache/redisCache.js';

import { checkUser } from './users.server.js';

BigInt.prototype.toJSON = function() { return this.toString() }

if (!building) {
    await setupDB();
    await setupRedis();
}

export const handle = checkUser;
