import Vue from 'vue'
import Router from 'vue-router'

// Containers
import Full from '@/containers/Full'
import Construction from '@/containers/Construction'

// Views
import Dashboard from '@/views/Dashboard'
import Home from '@/views/Home'
import Post from '@/views/Post'
import Editor from '@/views/Editor'
import Periodic from '@/views/Periodic'

Vue.use(Router)

export default new Router({
  mode: 'hash',
  linkActiveClass: 'open active',
  scrollBehavior: () => ({ y: 0 }),
  routes: [
    {
      path: '/test/',
      redirect: '/test/home',
      name: 'Admin',
      component: Full,
      children: [
        {
          path: 'dashboard',
          name: 'Dashboard',
          component: Dashboard
        },
        {
          path: 'post',
          name: 'Post',
          component: Post
        },
        {
          path: 'editor',
          name: 'Editor',
          component: Editor
        },
        {
          path: 'home',
          name: 'Home',
          component: Home
        },
        {
          path: 'periodic',
          name: 'Periodic',
          component: Periodic
        }

      ]
    },
    {
      path: '/',
      name: 'Dev',
      component: Construction,
      children: []
    }
  ]
})
