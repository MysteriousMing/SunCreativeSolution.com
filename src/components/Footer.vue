<template>
  <footer class="app-footer">
    <div class="mr-auto my-4">
      <section class="flex-row flex-start">
        <logo class="footer-upper" :topBg="'black'" :bottomBg="'white'"/><p v-show="showInfo" class="ml-4">Something else you can read ...</p>
      </section>
      <div class="mr-auto mt-4">
        <span v-show="showInfo" class="nav-tag-item mr-2">ABOUT ME</span>
        <span v-show="showInfo" class="nav-tag-item mr-2">THOUGHTS</span>
        <span v-show="showInfo" class="nav-tag-item mr-2">CONTACT</span>
      </div>
    </div>
  </footer>
</template>
<script>
import logo from '../components/logo'

export default {
  name: 'foot',
  components: {
    logo
  },
  data () {
    return {
      showInfo: true
    }
  },
  mounted () {
    if (this.$router.history.current.name === 'Project') {
      this.showInfo = false
    }
  }
}
</script>
<style>
.nav-tag-item {
  font-weight: bold;
}
.footer-upper {
  margin-top: -66px;
}
@media (max-width: 991px) {
  .app-footer {
    padding: 0 20px;
  }
  .footer-upper {
    transform: scale(0.6)
  }
}
</style>
