import { EMPTY_PERMISSIONS, grantPermission, hasPermission } from 'permissio';

export enum Permissions {
    FULL = 0,

    SUBCENTRAL_READ = 1,
    SUBCENTRAL_WRITE = 2,
}

export const FullPerm = grantPermission(EMPTY_PERMISSIONS, Permissions.FULL);

export const usePerms = (
    permission_data: bigint,
    required_perms: Permissions[],
): [false, string[]] | [true, undefined] => {
    if (hasPermission(permission_data, Permissions.FULL)) return [true, undefined];

    const missing_perms = required_perms.filter((perm) => !hasPermission(permission_data, perm));

    if (missing_perms.length > 0) return [false, missing_perms.map((perm) => Permissions[perm])];

    return [true, undefined];
};

export const permsToString = (permissions_data: bigint): string[] => {
    const perms = [];

    for (const perm of Object.values(Permissions).filter((v): v is string =>
        Number.isNaN(Number(v)),
    )) {
        if (hasPermission(permissions_data, Permissions[perm as keyof typeof Permissions]))
            perms.push(perm);
    }

    return perms;
};
