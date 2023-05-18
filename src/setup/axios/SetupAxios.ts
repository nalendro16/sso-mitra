import { authKey } from "config/app";
import { IAuthKey } from "models";
import { Storage } from "utils/LocalStorage";

export default function setupAxios(axios: any) {
  axios.interceptors.request.use(
    (config: any) => {

      const token = Storage.getItem<IAuthKey>(authKey)

      if (token?.access_token) {
        config.headers.Authorization = `Bearer ${token.access_token}`
      }

      return config
    },
    (err: any) => Promise.reject(err)
  )

  axios.interceptors.response.use(
    (res: any) => res,
    (err: any) => {
      return Promise.reject(err);
    });
}