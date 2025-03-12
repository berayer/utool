# utool

a collection of tools

## used

- nextjs@15
- typescript
- tailwindcss@v4
- shadcn-ui
- iconify-react

## 文件上传

1. 文件分片,并且计算hash值
2. 将hash数组发送到服务器预检, 服务器返回文件是否已经存在, 如果存在则直接返回文件地址, 如果不存在则继续上传
3. 多线程分片上传文件
4. 所有文件上传成功, 发起合并请求
5. 服务器合并文件, 并返回文件地址
