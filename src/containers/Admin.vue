<template>
  <div class="app">
    <AdminHeader/>
    <div class="app-body admin-body">
      <Sidebar class="admin-sidebar" :navItems="nav"/>
      <main class="main">
        <div class="container-fluid">
          <router-view></router-view>
        </div>
      </main>
    </div>
  </div>
</template>
<style scoped>
@import '/scss/admin.scss';
.app {
  overflow: hidden;
}
.app-body.admin-body{
  margin-top: 62px;
}
.sidebar-fixed .admin-body .sidebar {
  height: calc(100vh - 62px);
}
</style>

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
