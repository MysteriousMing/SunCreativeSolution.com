<template>
  <footer class="app-footer">
    <div class="mr-auto my-4">
      <section class="flex-row flex-start">
        <logo class="footer-upper mr-4" :topBg="'black'" :bottomBg="'white'" />
        <p v-show="showInfo" class="">Something else you can read ...</p>
      </section>
      <div class="mr-auto mt-4 mt-md-0">
        <b-link v-show="showInfo" class="nav-tag-item mr-2" to="/about">ABOUT ME</b-link>
        <b-link v-show="showInfo" class="nav-tag-item mr-2" to="/thoughts">THOUGHTS</b-link>
        <b-link v-show="showInfo" class="nav-tag-item mr-2" to="/contact">CONTACT</b-link>
      </div>
    </div>
  </footer>
</template>
<script>
import logo from '../components/Logo'

export default {
  name: 'foot',
  components: {
    logo
  },
  data() {
    return {
      showInfo: true
    }
  },
  mounted() {
    if (this.$router.history.current.name === 'Project') {
      this.showInfo = false
    }
  }
}
</script>
<style>
.nav-tag-item {
  font-weight: bold;
  font-family: "Mada SemiBold";
  padding: 10px 0;
}
.nav-tag-item {
  color: white;
  cursor: url(https://static.dubheee.cn/sun/static/cursor_pointer.png) 22.8 0,
    pointer;
}
.nav-tag-item:hover {
  color: #fafafa;
  text-decoration: underline;
}
.footer-upper {
  margin-top: -66px;
}
@media (max-width: 991px) {
  .app-footer {
    padding: 0 20px;
  }
  .footer-upper {
    transform: scale(0.6);
  }
}
@media (max-width: 768px) {
  .footer-upper {
    display: none;
  }
  .app-footer {
    padding-left: 70px;
  }
  .mt-md-0 {
    margin-top: 0 !important;
  }
}
</style>
