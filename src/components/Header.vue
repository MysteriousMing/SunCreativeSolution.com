<template>
  <header class="app-header navbar animated"
  :class="{'black':bottomUpperBg == 'black', 'hide': headerAnimate && scrollUp === false, 'show': headerAnimate && scrollUp === true }">
    <b-link class="navbar-brand logo" to="/">
      <logo :topBg="topUpperBg" :bottomBg="bottomUpperBg"></logo>
    </b-link>
    <span class="navbar-brand d-md-down-none" :class="{'black':bottomUpperBg == 'black'}" @click="selectNav('art')">ART</span>
    <span class="navbar-brand d-md-down-none" :class="{'black':bottomUpperBg == 'black'}" @click="selectNav('research')">RESEARCH</span>
    <span class="navbar-brand d-md-down-none" :class="{'black':bottomUpperBg == 'black'}" @click="selectNav('commercial')">COMMERCIAL</span>
    <button class="ml-auto navbar-toggler mobile-sidebar-toggler d-lg-none" type="button" @click="mobileSidebarToggle">&#9776;</button>
  </header>
</template>
<script>
import logo from '../components/logo'
import bus from '@/router/bus'

export default {
  name: 'index-header',
  components: {
    logo
  },
  props: {
    // isAnimate: Boolean,
    animateDirect: String
  },
  watch: {
    scrollInfo (from, to) {
      console.log(from, to)
    }
  },
  data () {
    return {
      topUpperBg: this.topBg || 'black',
      bottomUpperBg: this.bottomBg || 'white',
      headerAnimate: false,
      scrollUp: false
    }
  },
  created () {
    document.body.classList.add('sidebar-hidden')
    bus.$on('header-go-black', isDown => {
      if (isDown === 'black') {
        this.topUpperBg = 'white'
        this.bottomUpperBg = 'black'
      } else {
        this.topUpperBg = 'black'
        this.bottomUpperBg = 'white'
      }
    })
    bus.$on('animate-info', animateInfo => {
      if (animateInfo && animateInfo.isShow) {
        this.headerAnimate = animateInfo.isShow
      }
      this.scrollUp = animateInfo.scrollUp
    })
  },
  mounted () {
    // console.log('Mounted:', this.topUpperBg, typeof (this.topUpperBg))
  },
  methods: {
    selectNav (val) {
      console.log(this.$router)
      if (this.$router.history.current.name === 'Project') {
        this.$router.push({
          name: 'Home'
        })
      }
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
.app-header.navbar .navbar-brand {
  line-height: 75px;
  font-family: 'Mada SemiBold';
}
.navbar-brand.black {
  color: #ffffff;
}
.app-header.black {
  background: #000000;
}
.animated {
  transition: all 100ms ease-in;
}

@keyframes fromTopIn {
    from {
        top: -120px;
    }
    to {
        top: 0;
    }
}

@keyframes toTopIn {
    from {
        top: 0;
    }
    to {
        top: -120px;
    }
}

.app-header.show {
  /* animation: fromTopIn 200ms ease-out; */
  transform: translateY(0);
  transition: transform 200ms ease;
}
.app-header.hide {
  /* animation: toTopIn 200ms ease-out; */
  transform: translateY(-126px);
  transition: transform 200ms ease;
}

@media (max-width: 991px) {
  .app-header.navbar {
    background: #000000;
  }
}
</style>
