import { AppSider } from '@/components/custom/app-sidebar'
import { SidebarInset, SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'
import { cookies } from 'next/headers'
import { getMenu } from '../v2'
import { Separator } from '@/components/ui/separator'
import { AppBreadcrumb } from '@/components/custom/app-breadcrumb'
import { isLogin } from '@/lib/auth'
import { redirect } from 'next/navigation'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Command, CommandGroup, CommandItem, CommandList, CommandSeparator } from '@/components/ui/command'
import { LogOut, Settings, UserRoundPen } from 'lucide-react'
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card'

// 用户头像
function UserMenu() {
  return (
    <HoverCard openDelay={100} closeDelay={100}>
      <HoverCardTrigger asChild>
        <Avatar className="mr-2 hover:cursor-pointer">
          <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </HoverCardTrigger>
      <HoverCardContent className="w-48 p-0">
        <Command>
          <CommandList>
            <CommandGroup heading="张炳鑫">
              <CommandItem>
                <UserRoundPen />
                <span>用户配置</span>
              </CommandItem>
              <CommandItem>
                <Settings />
                <span>系统设置</span>
              </CommandItem>
            </CommandGroup>
            <CommandSeparator />
            <CommandItem>
              <LogOut />
              <span>退出登陆</span>
            </CommandItem>
          </CommandList>
        </Command>
      </HoverCardContent>
    </HoverCard>
  )
}

export default async function Layout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  // TODO 通过请求获取当前用户的菜单, 用户信息等等, 如果没登录则跳转到登录页面
  if (!(await isLogin())) redirect('/login')
  const menu = await getMenu()
  // cookie存储侧边栏打开状态
  const cookieStore = await cookies()
  const defaultOpen = cookieStore.get('sidebar_state')?.value === 'true'

  return (
    <SidebarProvider defaultOpen={defaultOpen}>
      <AppSider menu={menu} />
      <SidebarInset>
        <header className="flex h-14 shrink-0 items-center justify-between gap-2 border-b">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <AppBreadcrumb menu={menu} />
          </div>
          <div className="flex items-center gap-2 px-4">
            <UserMenu />
          </div>
        </header>
        {children}
      </SidebarInset>
    </SidebarProvider>
  )
}
