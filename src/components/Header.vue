<template>
  <header class="app-header navbar animated"
  :class="{'black':bottomUpperBg == 'black', 'hide': headerAnimate && scrollUp === false, 'show': headerAnimate && scrollUp === true }">
    <b-link class="navbar-brand logo-ctn" :class="{'transparent': !(!(bottomUpperBg == 'white' && isOnHome) || !isOnHome)}" to="/">
      <logo :topBg="topUpperBg" :bottomBg="bottomUpperBg" class="logo"></logo>
    </b-link>
    <span class="navbar-brand d-md-down-none" :class="{'black':bottomUpperBg == 'black'}" @click="selectNav('art')">ART</span>
    <span class="navbar-brand d-md-down-none" :class="{'black':bottomUpperBg == 'black'}" @click="selectNav('research')">RESEARCH</span>
    <span class="navbar-brand d-md-down-none" :class="{'black':bottomUpperBg == 'black'}" @click="selectNav('commercial')">COMMERCIAL</span>
    <button class="ml-auto mr-4 navbar-toggler mobile-sidebar-toggler d-lg-none menu-btn" @click="mobileSidebarToggle">
      <span></span>
      <span></span>
      <span></span>
      <span></span>
    </button>
    <section class="mobile-full d-lg-none">
      <span class="mobile-full-item" @click="selectNav('art')">ART</span>
      <span class="mobile-full-item" @click="selectNav('research')">RESEARCH</span>
      <span class="mobile-full-item" @click="selectNav('commercial')">COMMERCIAL</span>
      <span class="mobile-full-item mt-auto" @click="gotoContact()">CONTACT</span>
    </section>
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
      scrollUp: false,
      isOnHome: false
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
      this.isOnHome = animateInfo.isHome || false
      this.scrollUp = animateInfo.scrollUp
    })
  },
  mounted () {
    // console.log('Mounted:', this.topUpperBg, typeof (this.topUpperBg))
    document.body.querySelector('.menu-btn').classList.remove('open')
    document.body.querySelector('.logo').classList.add('active')
  },
  methods: {
    selectNav (val) {
      console.log(this.$router)
      document.body.querySelector('.mobile-full').classList.remove('show')
      document.body.querySelector('.menu-btn').classList.remove('open')
      document.body.querySelector('.logo').classList.remove('active')

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
      document.body.querySelector('.logo').classList.toggle('active')
      document.body.querySelector('.mobile-full').classList.toggle('show')
    },
    asideToggle (e) {
      e.preventDefault()
      document.body.classList.toggle('aside-menu-hidden')
    },
    gotoContact () {
      this.$router.push({
        name: 'Contact'
      })
    }
  }
}
</script>
<style>
.app-header.navbar .navbar-brand {
  line-height: 79px;
  font-family: 'Mada SemiBold';
  width: auto !important;
  background: none !important;
}
.app-header.navbar .navbar-brand.logo-ctn {
  padding-left: 78px;
}
.app-header.navbar .navbar-brand.logo-ctn.transparent {
  opacity: 0;
  padding-left: 0;
  width: 10%!important;
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
  .mobile-full {
    position: fixed;
    top: 66px;
    left: 0;
    right: 0;
    display: flex;
    flex-flow: column;
    color:white;
    background: black;
    transition: all 250ms ease 100ms;
    overflow: hidden;
    height: 0;
    z-index: 10;
  }
  .mobile-full.show {
    height: calc(100vh - 66px);
  }
  .mobile-full-item {
    transition: all 250ms ease-in 200ms;
    font-size: 0.5rem;
    margin-top: 34px;
    padding-left: 0;
    text-align: left;
    opacity: 0;
  }
  .mobile-full-item:hover {
    color: #fafafa;
  }
  .mobile-full.show .mobile-full-item {
    opacity: 1;
    padding-left: 52px;
    font-size: 2.5rem;
  }
  .mobile-full-item:first-child {
    margin-top: 105px;
  }
  .mobile-full-item:last-child {
    margin-bottom: 75px;
  }
  .mobile-full-item:nth-child(1) {
    transition-duration: 200ms;
  }
  .mobile-full-item:nth-child(2) {
    transition-duration: 250ms;
  }
  .mobile-full-item:nth-child(3) {
    transition-duration: 350ms;
  }
  .mobile-full-item:nth-child(4) {
    transition-duration: 450ms;
  }
}

@media (max-width: 768px) {
  .app-header.navbar {
    /* padding-top: 14px; */
  }
  .app-header .navbar-brand.logo-ctn {
    padding-left: 40px !important;
  }
  .logo {
    transition: transform 250ms ease-in-out;
    transform-origin: 0 0;
  }
  .logo.active {
    transform: scale(0.5);
  }
}

.menu-btn {
  width: 45px;
  height: 35px;
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

/* Icon 3 */

.menu-btn span:nth-child(1) {
  top: 0px;
}

.menu-btn span:nth-child(2),.menu-btn span:nth-child(3) {
  top: 18px;
}

.menu-btn span:nth-child(4) {
  top: 36px;
}

.menu-btn.open span:nth-child(1) {
  top: 18px;
  width: 0%;
  left: 50%;
}

.menu-btn.open span:nth-child(2) {
  -webkit-transform: rotate(45deg);
  -moz-transform: rotate(45deg);
  -o-transform: rotate(45deg);
  transform: rotate(45deg);
}

.menu-btn.open span:nth-child(3) {
  -webkit-transform: rotate(-45deg);
  -moz-transform: rotate(-45deg);
  -o-transform: rotate(-45deg);
  transform: rotate(-45deg);
}

.menu-btn.open span:nth-child(4) {
  top: 18px;
  width: 0%;
  left: 50%;
}

</style>
