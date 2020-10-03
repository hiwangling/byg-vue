/** When your routing table is too long, you can split it into small modules **/

import Layout from '@/layout'

const settingRouter = {
  path: '/setting',
  component: Layout,
  alwaysShow: true,
  name: 'VueSetting',
  meta: { title: '基础配置', icon: 'component' },
  children: [
    {
      path: '/mourn',
      name: 'Vuemourn',
      component: () => import('@/views/setting/mourn'),
      meta: {
        title: '悼念厅配置',
        noCache: true,
        perms: ['post /api/v1/mourn/list']
      }
    },
    {
      path: '/furnace',
      name: 'Vuefurnace',
      component: () => import('@/views/setting/furnace'),
      meta: {
        title: '火化炉配置',
        noCache: true,
        perms: ['post /api/v1/furnace/list']
      }
    },
    {
      path: '/cold',
      name: 'Vuecolds',
      component: () => import('@/views/setting/cold'),
      meta: {
        title: '冷柜配置',
        noCache: true,
        perms: ['post /api/v1/cold/list']
      }
    },
    {
      path: '/car',
      name: 'Vuecar',
      component: () => import('@/views/setting/car'),
      meta: {
        title: '车辆配置',
        noCache: true,
        perms: ['POST /api/v1/manager/list', 'POST /api/v1/manager/add', 'POST /api/v1/manager/edit']
      }
    },
    {
      path: '/services',
      name: 'Vueservices',
      component: () => import('@/views/setting/services'),
      meta: {
        title: '服务配置',
        noCache: true,
        perms: ['post /api/v1/services/list']
      }
    },
    {
      path: '/combo',
      name: 'Vuecombo',
      component: () => import('@/views/setting/combo'),
      meta: {
        title: '套餐配置',
        noCache: true,
        perms: ['POST /api/v1/manager/list', 'POST /api/v1/manager/add', 'POST /api/v1/manager/edit']
      }
    },
    {
      path: '/config',
      name: 'Vueconfig',
      component: () => import('@/views/setting/config'),
      meta: {
        title: '系统配置',
        noCache: true,
        perms: ['post /api/v1/config/list']
      }
    }
  ]
}
export default settingRouter
