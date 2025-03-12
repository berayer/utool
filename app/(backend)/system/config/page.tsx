'use client'

import * as React from 'react'
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table'
import { ArrowUpDown, ChevronDown, MoreHorizontal, Trash2Icon, PlusIcon, CirclePlusIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Input } from '@/components/ui/input'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'

const data: FileResult[] = [
  {
    id: '1',
    fileId: '1899393818751438848',
    hash: 'a6078b49093d0f6607853d9b808861ff',
    fileName: 'Manjaro-s003.vmdk',
    createTime: '2025-03-11 17:35:50.753',
    fileSize: 676921344,
  },
  {
    id: '2',
    fileId: '1899394469346709504',
    hash: 'a6078b4c093d036607853d9b8088ff3a',
    fileName: 'Manjaro-s002.vmdk',
    createTime: '2025-03-11 17:38:25.867',
    fileSize: 512360,
  },
]

export type FileResult = {
  id: string
  fileId: string
  hash: string
  fileName: string
  fileSize: number
  createTime: string
}

export const columns: ColumnDef<FileResult>[] = [
  {
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && 'indeterminate')}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'fileName',
    header: '文件名称',
    cell: ({ row }) => <div className="capitalize">{row.getValue('fileName')}</div>,
  },
  {
    accessorKey: 'fileSize',
    header: '文件大小',
    cell: ({ row }) => (
      <div className="capitalize">{((row.getValue('fileSize') as number) / 1024 / 1024).toFixed(2)} MB</div>
    ),
  },
  {
    accessorKey: 'fileId',
    header: '文件ID',
    cell: ({ row }) => <div className="capitalize">{row.getValue('fileId')}</div>,
  },
  {
    accessorKey: 'hash',
    header: '哈希值',
    cell: ({ row }) => <div className="capitalize">{row.getValue('hash')}</div>,
  },
  {
    accessorKey: 'createTime',
    header: '创建时间',
    cell: ({ row }) => <div className="capitalize">{row.getValue('createTime')}</div>,
  },
  {
    id: 'actions',
    header: '操作',
    cell: ({ row }) => {
      return (
        <div>
          <Button variant="link" size="sm">
            下载
          </Button>
          <Button variant="link" size="sm" className="text-destructive">
            删除
          </Button>
        </div>
      )
    },
  },
]

export default function Page() {
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = React.useState({})

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  })

  return (
    <div className="p-4">
      <div className="w-full rounded-2xl border border-gray-200 p-4 shadow-sm">
        <div className="flex items-center gap-2 py-4">
          <Button size="sm">
            <CirclePlusIcon />
            新增
          </Button>
          <Button variant="destructive" size="sm">
            <Trash2Icon />
            删除
          </Button>
        </div>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => {
                    return (
                      <TableHead key={header.id}>
                        {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                      </TableHead>
                    )
                  })}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow key={row.id} data-state={row.getIsSelected() && 'selected'}>
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={columns.length} className="h-24 text-center">
                    No results.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
        <div className="flex items-center justify-end space-x-2 py-4">
          <div className="flex-1 text-sm text-muted-foreground">
            {table.getFilteredSelectedRowModel().rows.length} of {table.getFilteredRowModel().rows.length} row(s)
            selected.
          </div>
          <div className="space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              Previous
            </Button>
            <Button variant="outline" size="sm" onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>
              Next
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
