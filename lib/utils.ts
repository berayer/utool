import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'
import MD5 from 'spark-md5'
import { v4 as uuidV4 } from 'uuid'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * 获取指定文件分片
 * @param file 原始文件
 * @param index 分片索引
 * @param chunkSize 分片大小
 * @returns Promise<FileChunk>
 */
export function createChunk(file: File, index: number, chunkSize: number): Promise<FileChunk> {
  return new Promise((resolve) => {
    const start = index * chunkSize
    const end = Math.min(start + chunkSize, file.size)
    const spark = new MD5.ArrayBuffer()
    const fileReader = new FileReader()
    const blob = file.slice(start, end)
    fileReader.onload = function (e) {
      spark.append(e.target?.result as ArrayBuffer)
      resolve({
        start,
        end,
        index,
        hash: spark.end(),
        blob,
      })
    }
    fileReader.readAsArrayBuffer(blob)
  })
}

/** 返回一个全大写的uuid */
export function uuid() {
  return uuidV4().replaceAll('-', '').toUpperCase()
}
