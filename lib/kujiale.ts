import axios from 'axios'
import md5 from 'crypto-js/md5'

const APP_KEY = process.env.KUJIALE_APP_KEY
const APP_SECRET = process.env.KUJIALE_APP_SECRET
const DOMAIN = process.env.KUJIALE_DOMAIN

const http = axios.create({
  baseURL: DOMAIN,
  timeout: process.env.KUJIALE_TIMEOUT,
})

http.interceptors.request.use((config) => {
  if (!config.params) {
    config.params = {}
  }
  const appuid = config.params.appuid || ''
  const timestamp = new Date().getTime().toString()
  const sign = md5(APP_SECRET + APP_KEY + appuid + timestamp).toString()
  const params: any = {
    appkey: APP_KEY,
    timestamp: timestamp,
    sign: sign,
  }
  if (appuid) params.appuid = appuid
  Object.assign(config.params, params)
  return config
})

export const fetchKujiale = http
