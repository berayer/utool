export default function NotFound() {
  return (
    <div className="flex h-screen flex-col items-center justify-center bg-gray-100">
      <div className="mb-[15%] flex flex-col items-center gap-6 select-none">
        <img src="/404.svg" alt="404 svg" className="size-40" />
        <span className="text-3xl font-medium">404 资源不存在</span>
      </div>
    </div>
  )
}
