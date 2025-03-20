import type { config } from 'mssql'
import * as sql from 'mssql'

const sqlConfig: config = {
  server: '172.16.60.119',
  database: 'test',
  user: 'tb',
  password: 'imos',
  connectionTimeout: 3000,
  pool: {
    min: 0,
    max: 2,
    idleTimeoutMillis: 30000,
  },
  options: {
    encrypt: false,
    trustServerCertificate: true,
  },
}

export async function runQuery<T = any>(query: string) {
  const pool = await sql.connect(sqlConfig)
  return await pool.query<T>(query)
}
