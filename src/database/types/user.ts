export type UserV1 = {
    id: bigint;
    username: string;
    password: string;
    permissions: bigint;
};

export type User = UserV1;
