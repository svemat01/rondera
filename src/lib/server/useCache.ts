export type Setter<K> = (key: string, value: K) => void;

export type Resolver<K> = (key: string) => Promise<K | undefined> | K | undefined;

export type ResolverSetter<K> = {
	resolver: Resolver<K>;
	setter: Setter<K> | undefined;
};

/**
 * useCache is a hook that uses several resolver functions to retrieve a value.
 * The resolvers are called in order until one of them returns a value.
 * If a resolver returns a value, the value is returned and the value is saved in the cache for the next time.
 * If all resolvers return undefined, the value is returned as undefined.
 * @param key The key that will be used to get or set the value.
 * @param functions The resolvers and setters to use.
 * @returns The value returned by the resolvers or undefined.
 */
export const useCache = async <K>(
	key: string,
	...functions: (ResolverSetter<K> | Resolver<K>)[]
): Promise<K | undefined> => {
	let data;
	const setters: Setter<K>[] = [];

	for (const ResolverData of functions) {
		// eslint-disable-next-line @typescript-eslint/no-empty-function
		const { resolver, setter = () => {} } =
			typeof ResolverData == 'function' ? { resolver: ResolverData } : ResolverData;

		data = await resolver(key);

		if (data !== undefined) {
			for (const set of setters) set(key, data);

			break;
		}

		if (setter) setters.push(setter);
	}

	return data;
};
