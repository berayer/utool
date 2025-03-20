import Axios from 'axios'

type Fnc_FileUpload = (file: FileChunk) => Promise<void>
type Fnc_FileMerge = (chunkHash: string[], fileName: string) => Promise<string>
type Fnc_FileCheck = (chunkHash: string[], fileName: string) => Promise<{ fileId: string; chunkHash: string[] }>

export const fileUpload: Fnc_FileUpload = async (file) => {
  return Axios.post('http://localhost:7777/api/file/upload', file, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  }).then((r) => {
    return r.data
  })
}

export const fileMerge: Fnc_FileMerge = async (chunkHash, fileName) => {
  return Axios.post('http://localhost:7777/api/file/merge', {
    chunkHash,
    fileName,
  }).then((r) => {
    return r.data
  })
}

export const fileCheck: Fnc_FileCheck = async (chunkHash, fileName) => {
  return Axios.post('http://localhost:7777/api/file/check', {
    chunkHash,
    fileName,
  }).then((r) => {
    return r.data
  })
}
