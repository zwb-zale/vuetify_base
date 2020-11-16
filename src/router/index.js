import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'
import Layout from '@/views/layout/Layout'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/test-manage',
      component: Layout,
      alwaysShow: true,
      name: 'DataManage',
      meta: {
        title: 'dashboard',
        icon: 'mdi-view-dashboard'
      },
      children: [
        {
          path: 'testPage',
          name: 'testPage',
          component: () => import('@/views/testPage.vue'),
          meta: {
            title: 'testPage'
          },
        }
      ]
    },
    {
      path: '/data-manage',
      component: Layout,
      alwaysShow: false,
      name: 'DataManage',
      meta: {
        title: 'user',
        icon: 'mdi-account'
      },
      children: [
        {
          path: 'testTwo',
          name: 'testTwo',
          component: () => import('@/views/testTwo.vue'),
          meta: {
            title: 'testPage'
          },
        },
        {
          path: 'testthree',
          name: 'testthree',
          component: () => import('@/views/testthree.vue'),
          meta: {
            title: 'testthree'
          },
        },
      ]
    },
  ]
})
