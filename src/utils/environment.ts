
/**
 * load data env
 * @key [string]
 * @init [string]
 */
// eslint-disable-next-line import/no-anonymous-default-export
export const env = <T>(key: string, init: T | string = ''): T | string => (process.env[key] || init)