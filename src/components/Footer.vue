<template>
  <footer class="app-footer">
    <div class="mr-auto my-4">
      <section class="flex-row flex-start">
        <logo class="footer-upper" :topBg="'black'" :bottomBg="'white'"/><p class="ml-4">Something else you can read ...</p>
      </section>
      <div class="mr-auto mt-4">
        <span class="nav-tag-item mr-2">ABOUT ME</span>
        <span class="nav-tag-item mr-2">THOUGHTS</span>
        <span class="nav-tag-item mr-2">CONTACT</span>
      </div>
    </div>
  </footer>
</template>
<script>
import logo from '../components/logo'

export default {
  name: 'footer',
  components: {
    logo
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
</style>
