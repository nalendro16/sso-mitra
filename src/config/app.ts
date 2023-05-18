import { env } from '../utils'

export const appName = env('REACT_APP_TITLE', 'Sajang Apps')

export const debug = env('REACT_APP_DEBUG', false)

export const apiURL = env('REACT_APP_API_URL', '/')

export const authKey = env('REACT_APP_ACCESS_TOKEN', 'access_token')

export const clientID = env('REACT_APP_CLIENT_CREDENTIAL_ID', 1)

export const clientSecret = env('REACT_APP_CLIENT_CREDENTIAL_SECRET', '')
