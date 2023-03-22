export type UserV1 = {
    // User ID
    uid: bigint;
    // Key ID
    kid: bigint
    
    username: string;
    password: string;
    permissions: bigint;
};

export type User = UserV1;

export type SecureUser = Omit<User, 'password'>;
