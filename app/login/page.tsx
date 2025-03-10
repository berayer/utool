import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

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
            <form>
              <div className="flex flex-col gap-6">
                <div className="grid gap-2">
                  <Label htmlFor="email">邮箱</Label>
                  <Input id="email" type="email" placeholder="m@example.com" required />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="password">密码</Label>
                  <Input id="password" type="password" required />
                </div>
                <Button type="submit" className="mt-2 w-full">
                  登陆
                </Button>
              </div>
              <div className="mt-4 text-center text-sm">
                还没有账号?{' '}
                <a href="#" className="underline underline-offset-4">
                  注册
                </a>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
