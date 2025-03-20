'use server'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

/**
 * 用户登陆验证
 * @param _prevState 初始消息
 * @param formData 登陆表单
 */
export async function login(_prevState: any, formData: FormData) {
  const username = formData.get('email') as string
  const password = formData.get('password') as string
  await sleep(1000)
  if (password == '123456') {
    return { msg: '用户名或密码错误' }
  }
  const cookieStore = await cookies()
  cookieStore.set('token', 'test_token', {
    httpOnly: true,
    maxAge: 3600 * 24 * 7,
  })
  redirect('/')
}

function sleep(t: number) {
  return new Promise((resolve) => setTimeout(resolve, 2000))
}

/**
 * 判断用户是否登陆
 */
export async function isLogin() {
  console.log('检测用户是否登陆')
  const cookieStore = await cookies()
  const token = cookieStore.get('token')?.value
  if (!token) return false
  return token === 'test_token'
}
