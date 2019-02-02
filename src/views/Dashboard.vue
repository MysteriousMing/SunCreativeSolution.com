<template>
  <div class="page-dashboard animated fadeIn">
    <h5 v-if="welcome">{{ welcome[randomIndex] }}</h5>
    <b-card class="three" id="threeExample" ref="threeExample">

    </b-card>
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
export default {
  name: 'dashboard',
  data () {
    return {
      randomIndex: parseInt(Math.random() * 3),
      windowWith: 0,
      windowHeight: 0,
      welcome: [
        'Good Morning! Have breakfast?',
        'Good Afternoon! Have Lunch?',
        'Good Night Dubhe~'
      ]
    }
  },
  mounted () {
    console.log('hhhh')
    this.drawSimpleLine()
  },
  methods: {
    drawSimpleLine () {
      var renderer = new THREE.WebGLRenderer()
      let threeExample = document.querySelector('#threeExample')
      this.windowWith = window.innerWidth
      this.windowHinnerHeight = window.innerHeight
      // 定义某个小模块为容器
      this.container = {
        width: threeExample.clientWidth,
        height: threeExample.clientHeight
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
      geometry.vertices.push(new THREE.Vector3(0, 10, 0))
      geometry.vertices.push(new THREE.Vector3(10, 0, 0))

      var line = new THREE.Line(geometry, material)

      scene.add(line)
      renderer.render(scene, camera)
    }
  }
}
</script>

<style>
.page-dashboard h3 {
  padding-top: 10px !important;
  padding-bottom: 10px !important;
  display: block;
}
.page-dashboard .three {
  display: block;
  width: 100%;
  height: 40rem;
  padding: 0!important;
}
.page-dashboard .card-body {
  padding: 0!important;
}
</style>
