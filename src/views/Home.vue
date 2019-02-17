<template>
<div class="home-page" v-scroll="onScroll" ref="page">
  <Dashboard></Dashboard>
  <section hidden class="selector">
    <button class="btn btn-primary" type="primary" @click="filterData(0)">GROUP 1</button>
    <button class="btn btn-primary" type="primary" @click="filterData(1)">GROUP 2</button>
    <button class="btn btn-primary" type="primary" @click="filterData(2)">GROUP 3</button>
    <button class="btn btn-secondary" type="primary" @click="filterData()">Clear</button>
    <button class="btn btn-warning" type="primary" @click="shuffle()">Shuffle</button>
  </section>
  <section class="container flud" v-if="picArray && picArray.length">
    <!-- <vue-waterfall-easy :imgsArr="picArray"></vue-waterfall-easy> -->
    <isotope ref="cpt" :options="getOptions()" v-images-loaded:on.progress="layout" :list="picArray">
      <div v-for="element in picArray" :key="element.name" 
      class="grid-item grid-sizer" @click="selected=element">
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
    bus.$on('home-go-down', isDown => {
      if (isDown) {
        this.$refs.page.scrollTop = this.windowHinnerHeight
      }
    })
    bus.$on('nav-router', nav => {
      this.filterData(nav)
    })
  },
  methods: {
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
      let getNum = 15
      while (getNum >= 0) {
        this.picArray.push({
          'name': `mm${this.picNum}`,
          'src': `https://static.dubheee.cn/images/cat/${this.picNum}.jpg?x-oss-process=style/720w`,
          'href': '/',
          'group': parseInt(Math.random() * 3)
        })
        this.picNum = this.picNum + 1
        getNum--
      }
      console.log(this.picArray)
      this.picSaveArray = this.picArray
    },
    filterData (val) {
      if (val >= 0) {
        let selectArray = this.picSaveArray.filter(each => each.group === val)
        this.picArray = selectArray
      } else {
        this.picArray = this.picSaveArray
      }
    },
    sliceData (val) {
      if (val >= 0) {
        let isExist = true
        while (isExist) {
          let notIndex = this.picArray.findIndex(item => item.group === val)
          if (notIndex >= 0) {
            console.log('not Index', notIndex)
            setTimeout(() => {
              this.picArray.splice(notIndex, 1)
            //   this.imgsArr.splice(1,1)
            }, 200)
            // this.picArray.splice(notIndex, 1)
            isExist = false
          } else {
            isExist = false
          }
        }
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
  max-width: calc(100% - 232px);
}
.flud {
  margin-top: 118px;
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