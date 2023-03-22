import { hasPermission } from 'permissio';

export enum Permission {
    FULL = 0,

    SUBCENTRAL_READ = 1,
    SUBCENTRAL_WRITE = 2,
}

export const permsToString = (permissions_data: bigint): string[] => {
    const perms = [];

    for (const perm of Object.values(Permission).filter((v): v is string =>
        Number.isNaN(Number(v)),
    )) {
        if (hasPermission(permissions_data, Permission[perm as keyof typeof Permission]))
            perms.push(perm);
    }

    return perms;
};
