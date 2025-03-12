type AppMenu = {
  path: string
  label: string
  id: number
  icon?: string
}

interface FileChunk {
  start: number
  end: number
  index: number
  hash: string
  blob: Blob
}

/**
 * pending 初始状态
 * md5 计算md5
 * check 检查文件是否已上传过
 * upload 上传文件
 * merge 合并文件
 * done 完成
 * error 出现错误
 */
type FileUploadStatus = 'pending' | 'md5' | 'check' | 'upload' | 'merge' | 'done' | 'error'
