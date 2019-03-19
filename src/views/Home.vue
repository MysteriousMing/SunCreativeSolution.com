<template>
<div class="home-page" v-scroll="onScroll" ref="page">
  <Dashboard></Dashboard>
  <section class="container flud" v-loading="dataLoading">
    <!-- <vue-waterfall-easy :imgsArr="picArray"></vue-waterfall-easy> -->
    <isotope ref="cpt" :options="getOptions()" v-images-loaded:on.progress="layout" :list="picArray">
      <div v-for="element in picArray" :key="element.name"
      class="grid-item grid-sizer" @click="handleClick(element)">
          <!-- {{element.name}} [GROUP: {{element.group+1}}]-->
          <img :src="element.src" alt="Not found">
      </div>
    </isotope>
  </section>
  <AppFooter/>
</div>
</template>



<script>
import { Footer as AppFooter } from '../components/'
import Dashboard from '@/views/Dashboard'
import isotope from 'vueisotope'
import imagesLoaded from 'vue-images-loaded'
import vueWaterfallEasy from 'vue-waterfall-easy'
import bus from '@/router/bus'

export default {
  name: 'home',
  components: {
    AppFooter,
    Dashboard,
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
      geoPosition: {},
      welcome: [
        'Good Morning! Have breakfast?',
        'Good Afternoon! Have Lunch?',
        'Good Night Dubhe~'
      ]
    }
  },
  mounted () {
    console.log('hhhh')
  },
  created () {
    this.getData()
    console.log(this.windowHinnerHeight)
    bus.$emit('header-go-black', 'white')

    bus.$on('home-go-down', isDown => {
      if (isDown && this.$refs.page) {
        this.$refs.page.scrollTop = this.windowHinnerHeight
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
          uuid: row.uuid
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
      this.Http.SimpleGet('sun-create/article/').then(res => {
        console.log(res)
        this.dataLoading = false

        this.picArray = res.results.map(item => {
          return {
            uuid: item.uuid,
            src: item.header_image,
            name: item.title,
            href: '/', // todo: single Article
            group: item.category || parseInt(Math.random() * 3)
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
.container {
  min-height: 100vh;
  padding-bottom: 2rem;
}
.home-page .container {
  max-width: calc(100% - 132px);
}
.flud {
  margin-top: 118px;
  margin-bottom: 118px;
  min-height: calc(100vh - 196px);
}
.grid-item,
.grid-sizer {
  width: calc(50% - 18px); 
}
.grid-item img {
  width: 100%;
  margin-bottom: 36px;
}
</style>