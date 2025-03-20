import { runQuery } from '@/lib/db'
import { Result } from '@/lib/result'

export interface UnSort {
  id: number
  pid?: number
  name: string
  children?: UnSort[]
}

async function deepFill(sort: UnSort) {
  const children = await runQuery<UnSort>(`select * from un_sort where pid = ${sort.id}`)
  if (children.recordset.length) {
    for (const child of children.recordset) {
      await deepFill(child)
    }
    sort.children = children.recordset
  }
}

/** 树形结构获取所有目录分类 */
export const GET = async () => {
  const data = await runQuery<UnSort>(`select * from un_sort where pid is null`)
  const result = data.recordset
  for (const sort of result) {
    await deepFill(sort)
  }
  return Result.data(result)
}

/** 新增目录 */
export const POST = async (request: Request) => {
  const { pid, name } = await request.json()
  if (!name) return Result.failed('请输入目录名称')
  await runQuery(`insert into un_sort (pid, name) values (${pid || null}, '${name}')`)
  return Result.ok()
}

/** 重命名目录 */
export const PUT = async (request: Request) => {
  const { id, name } = await request.json()
  if (!name || !id) return Result.failed('请输入目录名称和目录ID')
  const data = await runQuery(`update un_sort set name = '${name}' where id = ${id}`)
  return Result.ok()
}

/** 删除目录 */
export const DELETE = async (request: Request) => {
  const { id } = await request.json()
  if (!id) return Result.failed('请输入目录ID')
  const children = await runQuery<UnSort>(`select id from un_sort where pid = ${id}`)
  if (children.recordset.length) {
    return Result.failed('请先删除子目录')
  }
  const data = await runQuery(`delete from un_sort where id = ${id}`)
  const r = data.rowsAffected[0]
  if (r === 1) {
    await runQuery(`update un_rule set sort_id = 0 where sort_id = ${id}`)
  }
  return Result.ok()
}
