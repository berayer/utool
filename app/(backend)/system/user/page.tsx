import { runQuery } from '@/lib/db'

export default async function Page() {
  const data = await runQuery(`select * from un_sort`)

  console.log(data)
  return (
    <div>
      <h1>用户管理</h1>
      <div>{JSON.stringify(data)}</div>
    </div>
  )
}
