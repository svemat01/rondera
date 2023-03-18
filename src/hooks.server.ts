import { building } from '$app/environment';
import { setupDB } from '$db/database.js';

if (!building) {

    await setupDB();
}