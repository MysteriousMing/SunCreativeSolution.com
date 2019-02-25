import Vue from 'vue'
import Router from 'vue-router'

// Containers
import Full from '@/containers/Full'
import Admin from '@/containers/Admin'
import Construction from '@/containers/Construction'

// Views
import Home from '@/views/Home'
import Project from '@/views/Project'
import Dashboard from '@/views/Dashboard'
// Admin
import PostRecord from '@/views/PostRecord'
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
      path: '/admin/',
      redirect: '/admin/articles',
      name: 'Admin',
      component: Admin,
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
          path: 'articles',
          name: 'PostRecord',
          component: PostRecord
        },
        {
          path: 'editor',
          name: 'Editor',
          component: Editor
        },
        {
          path: 'periodic',
          name: 'Periodic',
          component: Periodic
        }

      ]
    },
    {
      path: '/index/',
      redirect: '/index/',
      name: 'Product',
      component: Full,
      children: [
        {
          path: '/',
          name: 'Home',
          component: Home
        },
        {
          path: '/project/:uuid/',
          name: 'Project',
          component: Project

        }
        // todo: articleDetail
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
