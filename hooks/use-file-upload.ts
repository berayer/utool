import * as React from 'react'
import { fileCheck, fileUpload, fileMerge } from '@/app/v2/file-upload'

const CHUNK_SIZE = 1024 * 1024 * 5 // 分片大小

/**
 *
 * @param file
 * @returns
 */
export async function cutFile(file: File): Promise<FileChunk[]> {
  const THREAD_COUNT = navigator.hardwareConcurrency || 4
  return new Promise((resolve) => {
    const chunkCount = Math.ceil(file.size / CHUNK_SIZE)
    const threadChunkCount = Math.ceil(chunkCount / THREAD_COUNT)
    const result: FileChunk[] = []
    let finishCount = 0
    for (let i = 0; i < THREAD_COUNT; i++) {
      // 开启新线程
      const worker = new Worker(new URL('./fileUploadWorker.ts', import.meta.url), { type: 'module' })
      const start = i * threadChunkCount // 起始分片索引
      const end = Math.min(start + threadChunkCount, chunkCount) // 结束分片索引
      worker.postMessage({
        file,
        start,
        end,
        CHUNK_SIZE,
      })
      worker.onmessage = (e) => {
        worker.terminate()
        result[i] = e.data
        finishCount++
        if (finishCount === THREAD_COUNT) {
          resolve(result.flat())
        }
      }
    }
  })
}

async function uploadFile(
  file: File,
  setProgress: (progress: number) => void,
  setStatus: (status: FileUploadStatus) => void,
  setResult: (result: string | null) => void,
) {
  // 计算文件分片
  setStatus('md5')
  const chunkFiles = await cutFile(file)

  // 检查文件是否已上传过
  setStatus('check')
  const chunkHash = chunkFiles.map((it) => it.hash)
  const check = await fileCheck(chunkHash, file.name)

  // 文件秒传
  if (check.fileId) {
    setResult(check.fileId)
    setStatus('done')
    return
  }

  // 文件上传
  let progress = chunkHash.length - check.chunkHash.length
  const total = chunkHash.length
  setProgress(progress / total)
  setStatus('upload')
  const waitUpload = chunkHash.filter((it) => check.chunkHash.includes(it)) // 等待上传数组
  for (const file of chunkFiles) {
    if (!waitUpload.includes(file.hash)) continue // 跳过已经上传的文件
    await fileUpload(file)
    setProgress(++progress / total)
  }

  // 发起文件合并请求
  setStatus('merge')
  const fileId = await fileMerge(chunkHash, file.name)

  // 完成
  setStatus('done')
  setResult(fileId)
}

export function useFileUpload() {
  // 文件上传的进度
  const [progress, setProgress] = React.useState(0)
  // 文件上传的状态
  const [status, setStatus] = React.useState<FileUploadStatus>('pending')
  const [result, setResult] = React.useState<string | null>(null)

  function upload(file: File) {
    setProgress(0)
    setStatus('pending')
    setResult(null)
    uploadFile(file, setProgress, setStatus, setResult)
  }

  return { progress, status, result, upload }
}
