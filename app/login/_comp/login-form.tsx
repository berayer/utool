'use client'
import { useActionState } from 'react'
import { login } from '@/lib/auth'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { LoaderCircleIcon } from 'lucide-react'

// 登陆表单
export function LoginForm() {
  const [state, action, pending] = useActionState(login, null)
  return (
    <form action={action}>
      <div className="flex flex-col gap-5">
        <div className="grid gap-2">
          <Label htmlFor="email">邮箱</Label>
          <Input id="email" name="email" type="email" placeholder="m@example.com" required />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="password">密码</Label>
          <Input id="password" name="password" type="password" required />
        </div>
        <p aria-live="polite" role="status" className="text-sm text-destructive">
          {state?.msg}
        </p>
        <Button disabled={pending} type="submit" className="w-full">
          {pending && <LoaderCircleIcon className="animate-spin" />}
          登录
        </Button>
      </div>
      <div className="mt-4 text-center text-sm">
        还没有账号?{' '}
        <a href="#" className="underline underline-offset-4">
          注册
        </a>
      </div>
    </form>
  )
}
