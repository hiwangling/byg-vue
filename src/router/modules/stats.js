/** When your routing table is too long, you can split it into small modules **/

import Layout from '@/layout'

const statsRouter = {
  path: '/check',
  component: Layout,
  alwaysShow: true,
  name: 'VueStats',
  meta: { title: '统计分析', icon: 'chart' },
  children: [
    {
      path: '/Stats/arrange',
      name: 'arrange',
      component: () => import('@/views/stats/arrange'),
      meta: {
        title: '悼念厅',
        noCache: true,
        perms: ['get /api/v1/obituary_record/hall_list']
      }
    },
    {
      path: '/Stats/ColdShow',
      name: 'ColdShow',
      component: () => import('@/views/stats/ColdShow'),
      meta: {
        title: '冷藏柜',
        noCache: true,
        perms: ['get /api/v1/obituary_record/cold_list']
      }
    },
    {
      path: '/Stats/server',
      name: 'Vueserver',
      component: () => import('@/views/stats/server'),
      meta: {
        title: '服务统计',
        noCache: true,
        perms: ['post /api/v1/statistics/services']
      }
    },
    {
      path: '/Stats/sends',
      name: 'Vuecarsends',
      component: () => import('@/views/stats/carsend'),
      meta: {
        title: '接运统计',
        noCache: true,
        perms: ['post /api/v1/statistics/carsend', 'post /api/v1/carsend/per']
      }
    },

    {
      path: '/Stats/FireStats',
      name: 'VueFireStats',
      component: () => import('@/views/stats/FireStats'),
      meta: {
        title: '火化统计',
        noCache: true,
        perms: ['post /api/v1/statistics/gather']
      }
    },

    {
      path: '/Stats/unknown',
      name: 'Vueounknown',
      component: () => import('@/views/stats/unknown'),
      meta: {
        title: '无名尸统计',
        noCache: true,
        perms: ['post /api/v1/statistics/unknown']
      }
    },
    {
      path: '/Stats/obituary',
      name: 'Vueobituary',
      component: () => import('@/views/stats/obituary'),
      meta: {
        title: '完结业务统计',
        noCache: true,
        perms: ['post /api/v1/statistics/obituary', 'post /api/v1/obituary/state']
      }
    }

  ]
}
export default statsRouter
