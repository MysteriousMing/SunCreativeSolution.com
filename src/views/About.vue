<template>
<div class="home-page about-page" v-scroll="onScroll" ref="page">
  <!-- <Dashboard class="d-md-down-none"></Dashboard> -->
  <!-- <Catograph class="d-md-down-none"></Catograph> -->

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
// import Dashboard from '@/views/Dashboard'
// import Catograph from '@/views/Catograph'
import isotope from 'vueisotope'
import imagesLoaded from 'vue-images-loaded'
import vueWaterfallEasy from 'vue-waterfall-easy'
import bus from '@/router/bus'

export default {
  name: 'home',
  components: {
    AppFooter,
    // Dashboard,
    // Catograph,
    isotope,
    vueWaterfallEasy
  },
  directives: {
    imagesLoaded
  },
  data () {
    return {
      dataLoading: true,
      picArray: [],
      picSaveArray: [],
      position: {},
      windowHinnerHeight: window.innerHeight,
      picNum: 0,
      randomIndex: parseInt(Math.random() * 3),
      windowWith: 0,
      windowHeight: 0,
      geoPosition: {}
    }
  },
  mounted () {
    console.log('hhhh')
    document.body.querySelector('.logo').classList.remove('active')
  },
  created () {
    this.getData()
    console.log(this.windowHinnerHeight)
    bus.$emit('header-go-black', 'white')
    bus.$emit('animate-info', {
      isHome: false,
      isShow: true,
      scrollUp: true,
      headerActive: true
    })

    bus.$on('home-go-down', isDown => {
      if (isDown && this.$refs.page) {
        // this.$refs.page.scrollTop = this.windowHinnerHeight
        this.$refs.page.scrollTo({
          top: this.windowHinnerHeight,
          behavior: 'smooth'
        })
      }
    })
    bus.$on('nav-router', nav => {
      if (this.$refs.page) {
        this.$refs.page.scrollTop = this.windowHinnerHeight
      }
      this.filterData(nav)
    })
  },
  methods: {
    handleClick (row) {
      console.log(row)
      this.$router.push({
        name: 'Project',
        params: {
          uuid: row.url_params
        }
      })
    },
    onScroll: function (e, position) {
      this.position = position
      if (this.position.scrollTop - this.windowHinnerHeight >= 0) {
        this.logoType = 'black'
        // console.log(this.windowHinnerHeight, this.position)
        // 渐变
        bus.$emit('header-go-black', 'black')
      } else {
        this.logoType = 'white'
        bus.$emit('header-go-black', 'white')
      }
    },
    getOptions () {
      return {
        itemSelector: '.grid-item',
        layoutMode: 'masonry',
        masonry: {
          gutter: 36, // 间距
          columnWidth: '.grid-sizer'
        },
        getFilterData: {
          isEven: function (itemElem) {
            return itemElem.id % 2 === 0
          },
          isOdd: function (itemElem) {
            return itemElem.id % 2 !== 0
          },
          filterByText: function (itemElem) {
            return itemElem.name.toLowerCase().includes(this.filterText.toLowerCase())
          }
        },
        getSortData: {
          id: 'group',
          name: function (itemElem) {
            return itemElem.name.toLowerCase()
          }
        }
      }
    },
    layout () {
      this.$refs.cpt.layout('masonry')
    },
    shuffle () {
      this.$refs.cpt.shuffle()
    },
    getData () {
      // dataLoading
      this.dataLoading = true
      this.Http.SimpleGet('sun-create/article/', {
        offset: 0,
        limit: 50
      }).then(res => {
        console.log(res)
        this.dataLoading = false

        this.picArray = res.results.map(item => {
          return {
            ...item,
            uuid: item.uuid,
            src: item.header_image.replace('Http://', 'Https://'),
            name: item.title,
            discribe: item.explanation,
            group: item.category
          }
        })
        this.picSaveArray = this.picArray
      })
    },
    filterData (val) {
      if (val) {
        let selectArray = this.picSaveArray.filter(each => each.group.toLowerCase() === val)
        this.picArray = selectArray
      } else {
        this.picArray = this.picSaveArray
      }
    },
    // buildGLMap () {
    //   mapboxgl.accessToken = 'pk.eyJ1IjoiZHViaGUiLCJhIjoiY2l0cmY1aTJ5MDMyZDJ5bXN5aTF5b3h4ayJ9.RPD1mY_4cYtegDf1BSIQ7A'
    //   let map = new mapboxgl.Map({
    //     container: 'home',
    //     style: 'mapbox://styles/mapbox/streets-v9',
    //     center: [this.geoPosition.longitude, this.geoPosition.latitude], // starting position [lng, lat]
    //     zoom: 9 // starting zoom
    //   })
    //   console.log('Map', map)
    // },
    getLocation () {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
          console.log(position)
          this.geoPosition = position.coords
          // this.buildGLMap()
        })
      } else {
        this.$refs.tips.innerHTML = 'Geolocation is not supported by this browser.'
      }
    }
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