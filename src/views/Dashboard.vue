<template>
  <div class="page-dashboard animated fadeIn">
    <div class="three" id="threeExample" ref="threeExample" @click="clickSimpleLine()" >
    <h5 v-if="welcome" style="margin-bottom: 0px;top: 3rem;position: relative;height: 0;">{{ welcome[hourIndex] }}</h5>
    </div>
  </div>
</template>

<script>
// if (WEBGL.isWebGLAvailable()) {
//     // Initiate function or other initializations here
//     animate()
// } else {
//     var warning = WEBGL.getWebGLErrorMessage()
//     document.getElementById('container').appendChild(warning)
// }
import * as THREE from 'three'
import bus from '@/router/bus'

export default {
  name: 'dashboard',
  data () {
    return {
      hour: new Date().getHours(),
      hourIndex: 0,
      windowWith: 0,
      windowHeight: 0,
      welcome: [
        'Good Morning! Have breakfast?',
        'Good Afternoon! Have Lunch?',
        'Good Evening Dubhe~',
        '还不睡觉, 干啥呢'
      ]
    }
  },
  mounted () {
    console.log('hhhh')
    this.drawSimpleLine()

    if (this.hour < 12 && this.hour >= 6) {
      this.hourIndex = 0
    } else if (this.hour < 18 && this.hour >= 12) {
      this.hourIndex = 1
    } else if (this.hour < 24 && this.hour >= 18) {
      this.hourIndex = 2
    } else if (this.hour < 6) {
      this.hourIndex = 3
    }
  },
  methods: {
    clickSimpleLine () {
      console.log(window.scrollY)
      bus.$emit('home-go-down', true)
    },
    drawSimpleLine () {
      var renderer = new THREE.WebGLRenderer()
      let threeExample = document.querySelector('#threeExample')
      this.windowWith = window.innerWidth
      this.windowHinnerHeight = window.innerHeight
      // 定义某个小模块为容器
      this.container = {
        width: this.windowWith,
        height: this.windowHinnerHeight
      }
      console.log('某个小模块的获取方式', this.$refs.threeExample, threeExample)
      renderer.setSize(this.container.width, this.container.height)

      threeExample.appendChild(renderer.domElement)

      var camera = new THREE.PerspectiveCamera(45, this.container.width / this.container.height, 1, 500)
      camera.position.set(0, 0, 100)
      camera.lookAt(0, 0, 0)

      const scene = new THREE.Scene()
      console.log(scene)

      // create a blue LineBasicMaterial
      var material = new THREE.LineBasicMaterial({ color: 0x0000ff })

      var geometry = new THREE.Geometry()
      geometry.vertices.push(new THREE.Vector3(-10, 0, 0))
      geometry.vertices.push(new THREE.Vector3(0, -10, 0))
      geometry.vertices.push(new THREE.Vector3(10, 0, 0))

      var line = new THREE.Line(geometry, material)

      scene.add(line)
      renderer.render(scene, camera)
    }
  }
}
</script>

<style>
.page-dashboard {
  color: white;
  height: 100vh;
}
.page-dashboard h3 {
  display: block;
}
.page-dashboard .three {
  display: block;
  padding: 0!important;
  cursor: pointer;
}
</style>
