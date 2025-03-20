import { NextResponse } from 'next/server'
import { fetchKujiale } from '@/lib/kujiale'

export const GET = async () => {
  const data = await fetchKujiale({
    url: '/v2/account/search/v2',
    method: 'post',
    data: {
      start: 0,
      num: 10,
      email: 'B214V07@HC.COM',
    },
  })
  return NextResponse.json(data.data)
}
