import { env } from 'utils'

export const StorageKey = {
  ACCESS_TOKEN: env('REACT_APP_ACCESS_TOKEN', 'access_token'),
  IS_LOGIN: 'is_login',
}

export default { StorageKey }