import { act } from 'react'

export async function getMenu() {
  console.log('api: ', '获取用户菜单')
  return [
    {
      id: 1,
      path: '/',
      label: '首页',
      icon: 'lucide:home',
    },
    {
      id: 2,
      path: '/system/user',
      label: '用户管理',
      icon: 'lucide:users',
    },
    {
      id: 3,
      path: '/system/config',
      label: '系统配置',
      icon: 'lucide:settings',
    },
  ]
}
