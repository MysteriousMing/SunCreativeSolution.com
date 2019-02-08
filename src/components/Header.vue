<template>
  <header class="app-header navbar animated" :class="{'black':bottomUpperBg == 'black'}">
    <b-link class="navbar-brand ml-2" to="#">
      <logo :topBg="topUpperBg" :bottomBg="bottomUpperBg"></logo>
    </b-link>
    <span class="navbar-brand pt-10px d-md-down-none " :class="{'black':bottomUpperBg == 'black'}" to="#">ART</span>
    <span class="navbar-brand pt-10px d-md-down-none " :class="{'black':bottomUpperBg == 'black'}" to="#">RESEARCH</span>
    <span class="navbar-brand pt-10px d-md-down-none " :class="{'black':bottomUpperBg == 'black'}" to="#">COMMERCIAL</span>
    <button class="ml-auto navbar-toggler mobile-sidebar-toggler d-lg-none" type="button" @click="mobileSidebarToggle">&#9776;</button>
  </header>
</template>
<script>
import logo from '../components/logo'
import bus from '@/router/bus'

export default {
  name: 'header',
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
    document.body.classList.toggle('sidebar-hidden')
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
