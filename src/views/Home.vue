<template>
<div class="home-page">
  <div id="home" class="container">
  </div>
  <span ref="tips"></span>
</div>
</template>



<script>
import mapboxgl from 'mapbox-gl'
export default {
  name: 'dashboard',
  data () {
    return {
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
    this.getLocation()
  },
  methods: {
    buildGLMap () {
      mapboxgl.accessToken = 'pk.eyJ1IjoiZHViaGUiLCJhIjoiY2l0cmY1aTJ5MDMyZDJ5bXN5aTF5b3h4ayJ9.RPD1mY_4cYtegDf1BSIQ7A'
      let map = new mapboxgl.Map({
        container: 'home',
        style: 'mapbox://styles/mapbox/streets-v9',
        center: [this.geoPosition.longitude, this.geoPosition.latitude], // starting position [lng, lat]
        zoom: 9 // starting zoom
      })
      console.log('Map', map)
    },
    getLocation () {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
          console.log(position)
          this.geoPosition = position.coords
          this.buildGLMap()
        })
      } else {
        this.$refs.tips.innerHTML = 'Geolocation is not supported by this browser.'
      }
    }
  }
}
</script>
<style>
.home-page .container {
  height: calc(100vh - 65px);
  margin: 5px auto;
  position: relative;
  padding: 0!important;
  width: 100%;
  box-sizing: border-box;
  box-shadow: 2px 2px 10px #093e57;
  border-radius: 1rem;
}
.page-dashboard .card-body {
  padding: 0!important;
}
#map { position:absolute; top:0; bottom:0; width:100%; }
</style>
