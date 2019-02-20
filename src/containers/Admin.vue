<template>
  <div class="app">
    <AdminHeader/>
    <div class="app-body">
      <Sidebar :navItems="nav"/>
      <main class="main">
        <div class="container-fluid">
          <router-view></router-view>
        </div>
      </main>
    </div>
  </div>
</template>

<script>
import nav from '../_nav'
import AdminHeader from '../components/AdminHeader'
import { Sidebar, Aside as AppAside } from '../components/'

export default {
  name: 'full',
  components: {
    AdminHeader,
    Sidebar,
    AppAside
  },
  data () {
    return {
      nav: nav.items
    }
  },
  computed: {
    name () {
      return this.$route.name
    },
    list () {
      return this.$route.matched
    }
  }
}
</script>
