import { z } from 'zod';

// Requirements for a password:
// - At least 8 characters
export const Password = z.string().min(8, 'Password must be at least 8 characters long');

// Requirements for a username:
// - At least 3 characters
// - No spaces
// export const Username = z.string().min(3, 'Username must be at least 3 characters long').refine((value) => !value.includes(' '), 'Username cannot contain spaces');
// use regex instead of refine
export const Username = z.string().min(3, 'Username must be at least 3 characters long').regex(/^[^\s]+$/, 'Username cannot contain spaces');
