// worker
// 用户多线程处理分片文件HASH计算
import { createChunk } from '../lib/utils'

onmessage = async (e) => {
  const { file, start, end, CHUNK_SIZE } = e.data
  const result: Promise<FileChunk>[] = []
  for (let i = start; i < end; i++) {
    const prom = createChunk(file, i, CHUNK_SIZE)
    result.push(prom)
  }
  const chunks = await Promise.all(result)
  postMessage(chunks)
}
