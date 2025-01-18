import axios from 'axios'
import { apiURL } from 'config/app'

export const getData = async (URL: string) => {
  const respond = await axios
    .get(apiURL + URL)
    .then((res) => res)
    .catch((error) => error.response)
  return respond.data
}

export const postData = async (URL: string, config: unknown) => {
  const respond = await axios
    .post(apiURL + URL, config)
    .then((res) => res)
    .catch((error) => error.response)

  return respond.data
}

export const putData = async (URL: string, config: unknown) => {
  const respond = await axios
    .put(apiURL + URL, config)
    .then((res) => res)
    .catch((error) => error.response)
  return respond.data
}

export const deleteData = async (URL: string, config: unknown) => {
  const respond = config
    ? await axios
        .delete(apiURL + URL, config)
        .then((res) => res)
        .catch((error) => error.response)
    : await axios
        .delete(apiURL + URL)
        .then((res) => res)
        .catch((error) => error.response)
  return respond.data
}

export const patchData = async (URL: string, config: unknown) => {
  const respond = await axios
    .patch(apiURL + URL, config)
    .then((res) => res)
    .catch((error) => error.response)

  return respond.data
}
