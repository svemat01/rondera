import { building } from '$app/environment';
import { env } from '$env/dynamic/private';
import { cleanEnv, str } from 'envalid';
import type { ValidatorSpec, CleanedEnvAccessors } from 'envalid/dist/types';

type ValidatorSpecValue<T> = T extends ValidatorSpec<infer V> ? V : never;

type EnvSchema = Readonly<
	{
		[K in keyof typeof envSchema]: ValidatorSpecValue<(typeof envSchema)[K]>;
	} & CleanedEnvAccessors
>;

const envSchema = {
	JWT_PRIVATE_KEY: str(),
	SCYLLO_DB_HOST: str(),
	REDIS_URL: str(),
};

const buildingEnvs: EnvSchema = {
	JWT_PRIVATE_KEY: '',
	SCYLLO_DB_HOST: 'buildtime.local',
	REDIS_URL: '',

	// These are added by envalid
	isDev: false,
	isProd: false,
	isTest: false,
	isDevelopment: false,
	isProduction: false
};

export const environment: EnvSchema = building ? buildingEnvs : cleanEnv(env, envSchema);
