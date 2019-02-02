<template>
<div class="home-page">
  <section class="selector">
    <button type="primary" @click="sliceData(0)">Class 1</button>
    <button type="primary" @click="sliceData(1)">Class 2</button>
    <button type="primary" @click="sliceData(2)">Class 3</button>
    <button type="primary" @click="filterData()">Clear</button>
  </section>
  <section class="container" v-if="picArray.length">
    <vue-waterfall-easy :imgsArr="picArray" @scrollReachBottom="getData"></vue-waterfall-easy>
  </section>
</div>
</template>



<script>

import vueWaterfallEasy from 'vue-waterfall-easy'
export default {
  name: 'dashboard',
  components: {
    vueWaterfallEasy
  },
  data () {
    return {
      picArray: [],
      picSaveArray: [],
      picNum: 1,
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
  },
  methods: {
    getData () {
      console.log('More datas')
      let getNum = 20
      while (getNum) {
        this.picArray.push({
          'src': `http://demo.lanrenzhijia.com/demo/48/4871/demo/_assets/mm${this.picNum}.jpg`,
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
      console.log(this.picSaveArray)
      if (val >= 0) {
        let selectArray = this.picSaveArray.filter(each => each.group === val)
        this.picArray = selectArray
      } else {
        this.picNum = 1
        this.getData()
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
        this.picNum = 1
        this.getData()
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
.container {
  height: 800px;
}
</style>

// 2
// A Vue.js 2.0 directive to detect when images have been loaded, based on imagesLoaded

// This directive allows to get a callback when children images are loaded in a container element.
// Plays nicely with vue.isotope to allow re-layout when images are loaded.