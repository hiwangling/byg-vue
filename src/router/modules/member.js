/** When your routing table is too long, you can split it into small modules **/

import Layout from '@/layout'

const memberRouter = {
  path: '/member',
  component: Layout,
  alwaysShow: true,
  name: 'VueMember',
  meta: { title: '系统设置', icon: 'peoples' },
  children: [
    {
      path: '/group',
      name: 'VueGroup',
      component: () => import('@/views/member/group'),
      meta: {
        title: '角色管理',
        noCache: true,
        perms: ['post /api/v1/branch/list']
      }
    },
    {
      path: '/dept',
      name: 'Vuedept',
      component: () => import('@/views/member/dept'),
      meta: {
        title: '部门管理',
        noCache: true,
        perms: ['post /api/v1/dept/list']
      }
    },
    {
      path: '/manager',
      name: 'VueManager',
      component: () => import('@/views/member/manager'),
      meta: {
        title: '员工管理',
        noCache: true,
        perms: ['get /api/v1/manager/list', 'get /api/v1/manager/del']
      }
    },
    {
      path: '/prems',
      name: 'Vueprems',
      component: () => import('@/views/member/prems'),
      meta: {
        title: '权限管理',
        noCache: true,
        perms: ['post /api/v1/prems/list']
      }
    },
    {
      path: '/password',
      name: 'ChangePassword',
      component: () => import('@/views/member/password'),
      meta: {
        title: '修改密码',
        noCache: true
      }
    }
  ]
}
export default memberRouter
