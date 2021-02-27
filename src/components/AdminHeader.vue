<template>
  <header class="app-header navbar animated white">
    <h4 class="px-4">Sun Creative Solution</h4>
    <el-menu :default-active="activeIndex" class="el-menu-demo ml-auto" mode="horizontal" @select="handleSelect">
      <el-menu-item index="Product">首页</el-menu-item>
      <el-menu-item index="Dev">建设中</el-menu-item>
      <el-menu-item index="Admin">后台管理</el-menu-item>
    </el-menu>
  </header>
</template>
<script>
import logo from '../components/Logo'
import bus from '@/router/bus'

export default {
  name: 'admin-header',
  components: {
    logo
  },
  data() {
    return {
      activeIndex: 'Admin',
      topUpperBg: this.topBg || 'black',
      bottomUpperBg: this.bottomBg || 'white'
    }
  },
  created() {
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
  mounted() {
    console.log('Mounted:', this.topUpperBg, typeof (this.topUpperBg))
  },
  methods: {
    handleSelect(key, keyPath) {
      console.log(key, keyPath)
      this.$router.push({
        name: key
      })
    },
    showName(item) {
      if (item.meta && item.meta.label) {
        item = item.meta && item.meta.label
      }
      if (item.name) {
        item = item.name
      }
      return item
    },
    selectNav(val) {
      bus.$emit('nav-router', val)
    },
    sidebarToggle(e) {
      e.preventDefault()
      document.body.classList.toggle('sidebar-hidden')
    },
    sidebarMinimize(e) {
      e.preventDefault()
      document.body.classList.toggle('sidebar-minimized')
    },
    mobileSidebarToggle(e) {
      e.preventDefault()
      document.body.classList.toggle('sidebar-mobile-show')
    },
    asideToggle(e) {
      e.preventDefault()
      document.body.classList.toggle('aside-menu-hidden')
    }
  }
}
</script>
<style scoped>
.navbar-brand.black {
  color: #ffffff;
}
.app-header {
  border-bottom: solid 1px #e6e6e6;
  box-sizing: border-box;
  height: auto;
  background: #ffffff;
  z-index: 1001;
}
.app-header.black {
  background: #000000;
}
.animated {
  transition: all 100ms ease-in;
}
</style>
