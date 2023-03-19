/* eslint-disable no-redeclare */
type Result<T> = [T, undefined] | [undefined, Error];

export async function tryCatchMe<T>(asyncFunction: () => Promise<T>): Promise<Result<T>>;

export function tryCatchMe<T>(syncFunction: () => T): Result<T>;

export function tryCatchMe<T>(function_: () => T | Promise<T>): Result<T> | Promise<Result<T>> {
    try {
        const result = function_();

        if (result instanceof Promise) {
            return result
                .then((value) => [value, undefined])
                .catch((error) => [undefined, error]) as Promise<Result<T>>;
        }

        return [result, undefined];
    } catch (error) {
        return [undefined, error as Error];
    }
}
