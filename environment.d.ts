import 'next'

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      // 酷家乐 appkey
      KUJIALE_APP_KEY: string
      // 酷家乐 appsecret
      KUJIALE_APP_SECRET: string
      // 酷家乐 域名
      KUJIALE_DOMAIN: string
      // 酷家乐 请求的超时时间
      KUJIALE_TIMEOUT: number
    }
  }
}
