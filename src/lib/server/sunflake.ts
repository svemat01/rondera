import { generateSunflake } from 'sunflake';

export const SnowflakeGen = generateSunflake({
    as: 'bigint'
});