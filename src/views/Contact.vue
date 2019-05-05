<template>
<div class="home-page" ref="page">
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
<style>
.main .container-fluid {
  padding: 0;
}
.home-page {
  height: calc(100vh - 66px);
  overflow: auto;
}
.home-page .container {
  min-height: 100vh;
  padding-bottom: 2rem;
}
/* .home-page .container {
} */
.home-page .flud {
  max-width: calc(100% - 132px);
  margin-top: 118px;
  margin-bottom: 118px;
  min-height: calc(100vh - 196px);
}
.home-page .grid-item,
.home-page .grid-sizer {
  width: calc(50% - 18px); 
}
.home-page .grid-item img {
  width: 100%;
}
.home-page .project-item {
  margin-bottom: 36px;
}
@media (max-width: 991px) {
  .home-page .flud {
    max-width: calc(100% - 40px);
    padding-left: 0;
    padding-right: 0;
    margin-top: 48px;
    padding-bottom: 20px;
    margin-bottom: 30px;
  }
}
@media (max-width: 768px) {
  .home-page .flud {
    max-width: 100%;
    padding-left: 0;
    padding-right: 0;
    padding-bottom: 20px;
    margin-bottom: 30px;
  }
  .home-page .grid-item,
  .home-page .grid-sizer {
    width: 100%;
  }
  .home-page .project-item {
    margin-bottom: 22px;
  }
}
</style>
<style lang="scss">
.home-page .project-item {
  position: relative;
  overflow: hidden;
  .hover-show {
    position: absolute;
    top: 100%;
    color: #ffffff;
    background: rgba(115, 115, 115, 0.61);
    transition: all 300ms cubic-bezier(0.23, 0.06, 0, 1.34) 100ms;
    width: 100%;
    height: 100%;
    padding: 10px 14px;

    display: flex;
    overflow: hidden;
    flex-flow: column nowrap;
    justify-content: flex-end;
    align-items: flex-start;

    .item-title {
      font-family: 'Mada SemiBold'
    }
  }

  &:hover .hover-show {
    // display: block;
    top: 0;
  }
}
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
