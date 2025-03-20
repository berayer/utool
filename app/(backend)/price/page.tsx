import * as React from 'react'
import { ChevronRight, Fence, MoreHorizontal } from 'lucide-react'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible'
import { Sidebar, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarMenuSub } from '@/components/ui/sidebar'
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '@/components/ui/resizable'
import { Icon } from '@iconify/react'
import { Button } from '@/components/ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { cn } from '@/lib/utils'
import type { UnSort } from '@/app/api/price/sort/route'

export default async function Page({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const request = await fetch('http://localhost:3000/api/price/sort')
  const data = (await request.json()) as UnSort[]
  return (
    <ResizablePanelGroup direction="horizontal">
      <ResizablePanel defaultSize={20} minSize={15}>
        <div className="flex flex-col gap-2 p-4">
          <Button size="sm" variant="outline" className="w-full">
            新建文件夹
          </Button>
          <SidebarMenu>
            {data.map((it) => (
              <SortTree key={it.id} item={it} />
            ))}
          </SidebarMenu>
        </div>
      </ResizablePanel>
      <ResizableHandle />
      <ResizablePanel>右侧面板</ResizablePanel>
    </ResizablePanelGroup>
  )
}

async function deleteSort(item: UnSort) {
  const request = await fetch(`http://localhost:3000/api/price/sort/`, {
    method: 'DELETE',
    body: JSON.stringify({ id: item.id }),
    headers: { 'Content-Type': 'application/json' },
  })
  const result = await request.text()
  if (result === '1') {
    alert('删除成功')
  } else {
    alert(result)
  }
}

export function SortTree({ item }: { item: UnSort }) {
  'use client'
  return (
    <DropdownMenu key={item.id}>
      <Collapsible key={item.id}>
        <SidebarMenuItem>
          <SidebarMenuButton className="group">
            <CollapsibleTrigger asChild>
              <ChevronRight className={cn('transition-transform', !item.children?.length && 'opacity-0')} />
            </CollapsibleTrigger>
            <Icon icon="flat-color-icons:opened-folder" />
            {item.name}
            <DropdownMenuTrigger asChild>
              <MoreHorizontal className="ml-auto opacity-0 group-hover:opacity-100" />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="rounded-lg">
              <DropdownMenuItem>新建子文件夹</DropdownMenuItem>
              <DropdownMenuItem>重命名</DropdownMenuItem>
              <DropdownMenuItem>
                <form action={() => deleteSort(item)}>删除</form>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </SidebarMenuButton>
          {item.children?.length && (
            <CollapsibleContent>
              <SidebarMenuSub className="mr-0 pr-0">
                {item.children.map((subItem) => (
                  <SortTree key={subItem.id} item={subItem} />
                ))}
              </SidebarMenuSub>
            </CollapsibleContent>
          )}
        </SidebarMenuItem>
      </Collapsible>
    </DropdownMenu>
  )
}
