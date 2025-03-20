import { NextResponse } from 'next/server'

interface ResponseResult {
  c: number
  m: string
  d?: any
}

function ok(): NextResponse<ResponseResult> {
  return NextResponse.json({ c: 1, m: 'ok' })
}

function error(message: string): NextResponse<ResponseResult> {
  return NextResponse.json({ c: -1, m: message })
}

function failed(message: string): NextResponse<ResponseResult> {
  return NextResponse.json({ c: 0, m: message })
}

function data(data: unknown) {
  return NextResponse.json({ c: 0, m: '', d: data })
}

export const Result = { ok, error, failed, data }
