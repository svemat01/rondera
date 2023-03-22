import { EMPTY_PERMISSIONS, grantPermission, hasPermission } from 'permissio';

import { Permission } from '$lib/utils/permissions';

export const FullPerm = grantPermission(EMPTY_PERMISSIONS, Permission.FULL);

export const usePerms = (
    permission_data: bigint,
    required_perms: Permission[],
): [false, string[]] | [true, undefined] => {
    if (hasPermission(permission_data, Permission.FULL)) return [true, undefined];

    const missing_perms = required_perms.filter((perm) => !hasPermission(permission_data, perm));

    if (missing_perms.length > 0) return [false, missing_perms.map((perm) => Permission[perm])];

    return [true, undefined];
};
