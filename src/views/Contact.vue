<template>
<div class="contact-page" ref="page">
  <section class="cnt-ctn">
    <ul>
      <li class="d-flex cnt"><strong>yiminminghuan@sina.com </strong></li>
    </ul>
  </section>
  <AppFooter/>
</div>
</template>

<script>
import { Footer as AppFooter } from '../components/'
import bus from '@/router/bus'

export default {
  name: 'home',
  components: {
    AppFooter
  },
  data () {
    return {
    }
  },
  mounted () {
    document.body.querySelector('.logo').classList.remove('active')
  },
  created () {
    bus.$emit('header-go-black', 'white')
    bus.$emit('animate-info', {
      isHome: false,
      isShow: true,
      scrollUp: true,
      headerActive: true
    })
  },
  methods: {
  }
}
</script>
<style lang="scss">
@media (max-width: 991px) {
  .hover-show {
    font-size: 0.8rem;
  }
  .cnt-ctn{
    margin-top:170px;
  }
}
@media(min-width:992px){
  .cnt-ctn{
    margin-left: 170px;
    margin-top: 170px;
}
}
.cnt{
  height: calc(100vh - 342px);
}
</style>
