import * as React from 'react'
import { ChevronRight, File, Folder, MoreHorizontal } from 'lucide-react'

import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible'
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuAction,
  SidebarRail,
} from '@/components/ui/sidebar'
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '@/components/ui/resizable'
import { Icon } from '@iconify/react'
import { RuleTable } from './table'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { ContextMenu, ContextMenuContent, ContextMenuItem, ContextMenuTrigger } from '@/components/ui/context-menu'
import { cn } from '@/lib/utils'

interface SortType {
  id: number
  name: string
  children?: SortType[]
}

// This is sample data.
const data: SortType[] = [
  {
    id: 1,
    name: '柜体类',
    children: [
      {
        id: 2,
        name: '颗粒板',
      },
      {
        id: 3,
        name: '多层板',
      },
      {
        id: 4,
        name: '奥芯板',
      },
    ],
  },
  {
    id: 5,
    name: '名称类',
  },
  {
    id: 6,
    name: '抽盒',
  },
  {
    id: 7,
    name: '门抽',
    children: [
      {
        id: 8,
        name: 'KM01',
      },
      {
        id: 9,
        name: 'KM49',
      },
      {
        id: 10,
        name: 'KM43&PT80',
        children: [
          {
            id: 11,
            name: 'KM43_1',
          },
          {
            id: 12,
            name: 'KM43A_1',
          },
          {
            id: 13,
            name: 'KM43B_1',
          },
          {
            id: 14,
            name: 'KM43C_1',
          },
        ],
      },
    ],
  },
]

export default function Page({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <ResizablePanelGroup direction="horizontal" className="p-4">
      <ResizablePanel defaultSize={20}>
        <Button size="sm" variant="outline" className="w-full">
          新建文件夹
        </Button>
        <div>查询条件</div>
        <SidebarMenu>
          {data.map((it) => (
            <Tree key={it.id} item={it} />
          ))}
        </SidebarMenu>
      </ResizablePanel>
      <ResizableHandle />
      <ResizablePanel>
        <RuleTable />
      </ResizablePanel>
    </ResizablePanelGroup>
  )
}

function Tree({ item }: { item: SortType }) {
  // if (!item.children || !item.children.length) {
  //   return (
  //     <SidebarMenuItem>
  //       <SidebarMenuButton>
  //         {/* <File /> */}
  //         <ChevronRight className="opacity-0" />
  //         <Icon icon="flat-color-icons:opened-folder" />
  //         {item.name}
  //       </SidebarMenuButton>
  //     </SidebarMenuItem>
  //   )
  // }

  return (
    <DropdownMenu>
      <Collapsible>
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
              <DropdownMenuItem>删除</DropdownMenuItem>
            </DropdownMenuContent>
          </SidebarMenuButton>
          {item.children?.length && (
            <CollapsibleContent>
              <SidebarMenuSub className="mr-0 pr-0">
                {item.children.map((subItem) => (
                  <Tree key={subItem.id} item={subItem} />
                ))}
              </SidebarMenuSub>
            </CollapsibleContent>
          )}
        </SidebarMenuItem>
      </Collapsible>
    </DropdownMenu>
  )
}
