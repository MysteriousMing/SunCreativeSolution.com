<template>
  <header class="app-header navbar animated"
  :class="{'black':bottomUpperBg == 'black', 'hide': headerAnimate && scrollUp === false, 'show': headerAnimate && scrollUp === true }">
    <b-link class="navbar-brand logo" to="/">
      <logo :topBg="topUpperBg" :bottomBg="bottomUpperBg"></logo>
    </b-link>
    <span class="navbar-brand d-md-down-none" :class="{'black':bottomUpperBg == 'black'}" @click="selectNav('art')">ART</span>
    <span class="navbar-brand d-md-down-none" :class="{'black':bottomUpperBg == 'black'}" @click="selectNav('research')">RESEARCH</span>
    <span class="navbar-brand d-md-down-none" :class="{'black':bottomUpperBg == 'black'}" @click="selectNav('commercial')">COMMERCIAL</span>
    <button class="ml-auto mr-4 navbar-toggler mobile-sidebar-toggler d-lg-none menu-btn" @click="mobileSidebarToggle">
      <span></span>
      <span></span>
      <span></span>
    </button>
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
      // document.body.classList.toggle('sidebar-mobile-show')
      document.body.querySelector('.menu-btn').classList.toggle('open')
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
  line-height: 79px;
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

@media (max-width: 768px) {
  .app-header.navbar {
    padding-top: 70px;
  }
  .app-header .navbar-brand.logo {
    padding-left: 40px !important;
  }
}

.menu-btn {
  width: 40px;
  height: 30px;
  position: relative;
  -webkit-transform: rotate(0deg);
  -moz-transform: rotate(0deg);
  -o-transform: rotate(0deg);
  transform: rotate(0deg);
  -webkit-transition: .5s ease-in-out;
  -moz-transition: .5s ease-in-out;
  -o-transition: .5s ease-in-out;
  transition: .5s ease-in-out;
  cursor: pointer;
}
button.menu-btn:focus {
  outline: none;
}
.menu-btn span {
  display: block;
  position: absolute;
  height: 2px;
  width: 100%;
  background: #ffffff;
  border-radius: 9px;
  opacity: 1;
  left: 0;
  -webkit-transform: rotate(0deg);
  -moz-transform: rotate(0deg);
  -o-transform: rotate(0deg);
  transform: rotate(0deg);
  -webkit-transition: .25s ease-in-out;
  -moz-transition: .25s ease-in-out;
  -o-transition: .25s ease-in-out;
  transition: .25s ease-in-out;
}
.menu-btn span:nth-child(1) {
  top: 0px;
}

.menu-btn span:nth-child(2) {
  top: 15px;
}

.menu-btn span:nth-child(3) {
  top: 30px;
}

.menu-btn.open span:nth-child(1) {
  top: 15px;
  -webkit-transform: rotate(135deg);
  -moz-transform: rotate(135deg);
  -o-transform: rotate(135deg);
  transform: rotate(135deg);
}

.menu-btn.open span:nth-child(2) {
  opacity: 0;
  left: -60px;
}

.menu-btn.open span:nth-child(3) {
  top: 15px;
  -webkit-transform: rotate(-135deg);
  -moz-transform: rotate(-135deg);
  -o-transform: rotate(-135deg);
  transform: rotate(-135deg);
}

</style>
