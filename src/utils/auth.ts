import { StorageKey } from 'config/storage'
import { LocalStorage } from 'utils'

export const isAuthenticated = () => {
  const storage = new LocalStorage()

  const token: any = storage.getItem(StorageKey.ACCESS_TOKEN);
  return !!token?.access_token
}

export const isLogin = () => {
  const storage = new LocalStorage()

  const token: any = storage.getItem(StorageKey.ACCESS_TOKEN);
  const isLogin = storage.getItem(StorageKey.IS_LOGIN);

  return !!token?.access_token && isLogin
}