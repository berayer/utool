import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { LoginForm } from './_comp/login-form'

export default function Page() {
  return (
    <div className="flex h-svh bg-linear-to-r from-cyan-500 to-blue-500">
      <div className="hidden h-full flex-1 lg:block"></div>
      <div className="flex flex-1 flex-col justify-center">
        <Card className="m-auto">
          <CardHeader>
            <CardTitle className="text-2xl">用户登陆</CardTitle>
            <CardDescription>在下面输入您的电子邮件以登录您的帐户</CardDescription>
          </CardHeader>
          <CardContent>
            <LoginForm />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
