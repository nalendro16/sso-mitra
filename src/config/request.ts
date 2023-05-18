import { apiURL } from 'config/app'

const axios = require("axios")

export const request = axios.create({
  baseURL: apiURL,
  headers: { "Content-Type": "application/json" }
})