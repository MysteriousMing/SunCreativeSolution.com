<template>
<div class="home-page about-page" ref="page">
  <section class="ab-ctn container">
    <h3 class="ab-title">Education</h3>
    <ul>
      <li class="d-flex row"><strong class="ab-time col-12 col-md-auto">2019.09 - </strong><p class="ml-md-4 col-12 col-md-8 ab-exp">MA in Experience Design, Goldsmiths, University of London</p></li>
      <li class="d-flex row"><strong class="ab-time col-12 col-md-auto">2015.09 - 2019.06 </strong><p class="ml-md-4 col-12 col-md-8 ab-exp">BA in Advertising Study, East China Normal University</p></li>
      <li class="d-flex row"><strong class="ab-time col-12 col-md-auto">2017.09 - 2017.12 </strong><p class="ml-md-4 col-12 col-md-8 ab-exp">Exchange Semester, University of Victoria</p></li>
      <li class="d-flex row"><strong class="ab-time col-12 col-md-auto">2015.09 - 2016.06</strong><p class="ml-md-4 col-12 col-md-8 ab-exp">Minor in Art Educaiton, East China Normal University</p></li>
      <li class="d-flex row"><strong class="ab-time col-12 col-md-auto">2014.09 - 2015.06</strong><p class="ml-md-4 col-12 col-md-8 ab-exp">Major in Biology, East China Normal Univerisy</p></li>
    </ul>
    <h3 class="ab-title">Work</h3>
    <ul>
      <li class="d-flex row"><strong class="ab-time col-12 col-md-auto">2016.09 - now</strong><p class="ml-md-4 col-12 col-md-8 ab-exp">Graphic Designer, Part-time</p></li>
      <li class="d-flex row"><strong class="ab-time col-12 col-md-auto">2019.02 - 2019.06</strong><p class="ml-md-4 col-12 col-md-8 ab-exp">CEO Assistant, Intern</p></li>
      <li class="d-flex row"><strong class="ab-time col-12 col-md-auto">2017.09 - 2017.12 </strong><p class="ml-md-4 col-12 col-md-8 ab-exp">Graphic Designer, Intern</p></li>
      <li class="d-flex row"><strong class="ab-time col-12 col-md-auto">2015.09 - 2019.06 </strong><p class="ml-md-4 col-12 col-md-8 ab-exp">Media Analyst, Intern</p></li>
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
    .ab-ctn{
      margin-top:70px;
    }
  }
  @media(min-width:992px){
    .ab-ctn{
      margin-left: 155px;
      margin-top: 70px;
    }
  }
</style>
<style>
  .ab-title{
    margin-left: 38px;
    margin-top: 20px;
  }
  .about-page .row {
    margin-left: 0;
    margin-right: 0;
  }
  .ab-time {
    width: 120px;
  }
  .about-page .ab-time,
  .about-page .ab-exp {
    padding-left: 0 !important;
    padding-right: 0 !important;
  }
</style>