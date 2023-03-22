// See https://kit.svelte.dev/docs/types#app

import type { SecureUser } from '$db/types/user.js';

// for information about these interfaces
declare global {
    namespace App {
        // interface Error {}
        interface Locals {
            user?: SecureUser;
        }
        // interface PageData {}
        // interface Platform {}
    }
    interface BigInt {
        toJSON(): string;
    }
}

export {};
