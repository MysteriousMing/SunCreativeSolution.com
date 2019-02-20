<template>
  <header class="app-header navbar animated white">
    <h4 class="pl-2">Sun Creative Solution Admin</h4>
  </header>
</template>
<script>
import logo from '../components/logo'
import bus from '@/router/bus'

export default {
  name: 'admin-header',
  components: {
    logo
  },
  data () {
    return {
      topUpperBg: this.topBg || 'black',
      bottomUpperBg: this.bottomBg || 'white'
    }
  },
  created () {
    // document.body.classList.toggle('sidebar-hidden')
    bus.$on('header-go-black', isDown => {
      if (isDown === 'black') {
        this.topUpperBg = 'white'
        this.bottomUpperBg = 'black'
      } else {
        this.topUpperBg = 'black'
        this.bottomUpperBg = 'white'
      }
    })
  },
  mounted () {
    console.log('Mounted:', this.topUpperBg, typeof (this.topUpperBg))
  },
  methods: {
    selectNav (val) {
      bus.$emit('nav-router', val)
    },
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
<style>
.navbar-brand.black {
  color: #ffffff;
}
.app-header.black {
  background: #000000;
}
.animated {
  transition: all 100ms ease-in;
}
</style>
