<template>
  <header class="app-header navbar">
    <b-link class="navbar-brand ml-2" to="#">
      <logo></logo>
    </b-link>
    <span class="navbar-brand pt-10px d-md-down-none" to="#">ART</span>
    <span class="navbar-brand pt-10px d-md-down-none" to="#">RESEARCH</span>
    <span class="navbar-brand pt-10px d-md-down-none" to="#">COMMERCIAL</span>
    <button class="ml-auto navbar-toggler mobile-sidebar-toggler d-lg-none" type="button" @click="mobileSidebarToggle">&#9776;</button>
  </header>
</template>
<script>
import logo from '../components/logo'
export default {
  name: 'header',
  components: {
    logo
  },
  created () {
    document.body.classList.toggle('sidebar-hidden')
  },
  methods: {
    sidebarToggle (e) {
      e.preventDefault()
      document.body.classList.toggle('sidebar-hidden')
    },
    sidebarMinimize (e) {
      e.preventDefault()
      document.body.classList.toggle('sidebar-minimized')
    },
    mobileSidebarToggle (e) {
      e.preventDefault()
      document.body.classList.toggle('sidebar-mobile-show')
    },
    asideToggle (e) {
      e.preventDefault()
      document.body.classList.toggle('aside-menu-hidden')
    }
  }
}
</script>
