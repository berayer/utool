import { AppSider } from '@/components/custom/app-sidebar'
import { SidebarInset, SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'
import { cookies } from 'next/headers'
import { getMenu } from '../api'

export default async function Layout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  // TODO 通过请求获取当前用户的菜单, 用户信息等等, 如果没登录则跳转到登录页面
  const menu = await getMenu()
  // cookie存储侧边栏打开状态
  const cookieStore = await cookies()
  const defaultOpen = cookieStore.get('sidebar_state')?.value === 'true'

  return (
    <SidebarProvider defaultOpen={defaultOpen}>
      <AppSider menu={menu} />
      <SidebarInset>
        <header className="flex h-14 shrink-0 items-center gap-2">
          <SidebarTrigger className="ml-2" />
        </header>
        {children}
      </SidebarInset>
    </SidebarProvider>
  )
}
