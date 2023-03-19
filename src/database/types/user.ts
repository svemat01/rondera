export type UserV1 = {
    uid: bigint;
    username: string;
    password: string;
    permissions: bigint;
};

export type User = UserV1;
