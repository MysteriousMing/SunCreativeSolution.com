<template>
  <div class="stella-container white">
    <div class="stella-item animated stella-left-top" :class="bottomUpperBg"></div>
    <div class="stella-item animated stella-right-top" :class="bottomUpperBg"></div>
    <div class="stella-item animated stella-left-bottom" :class="topUpperBg"></div>
    <div class="stella-item animated stella-right-bottom" :class="topUpperBg"></div>
    <div class="stella-upper-item animated stella-left-top " :class="topUpperBg"></div>
    <div class="stella-upper-item animated stella-right-top " :class="topUpperBg"></div>
    <div class="stella-upper-item animated stella-left-bottom " :class="bottomUpperBg"></div>
    <div class="stella-upper-item animated stella-right-bottom " :class="bottomUpperBg"></div>
  </div>
</template>
<script>
export default {
  name: 'logo',
  props: ['topBg', 'bottomBg'],
  data () {
    return {
    }
  },
  mounted () {
    // setTimeout模拟异步数据
    // this.topUpperBg = this.topBg || 'black'
    // this.bottomUpperBg = this.bottomBg || 'white'
    // console.log(this.topUpperBg, this.bottomUpperBg)
  },
  computed: {
    topUpperBg: function () {
      return {
        'black': this.topBg === 'black',
        'white': this.topBg === 'white'
      }
    },
    bottomUpperBg: function () {
      return {
        'black': this.bottomBg === 'black',
        'white': this.bottomBg === 'white'
      }
    }
  },
  methods: {

  }
}
</script>
<style lang="scss">
.stella-container {
  position: relative;
  width: 90px;
  height: 90px;
  .animated {
    transition: all 100ms ease-in;
  }
  &.white {
    background: transparent;
  }
  &.black {
    background: #000000;
  }
  .stella-item, .stella-upper-item {
    width: 45px;
    height: 45px;
    position: absolute;
    box-sizing: border-box;
    &.white {
      background: #ffffff;
    }
    &.black {
      background: #000000;
    }
    &.stella-left-top {
      top: 0;
      left: 0;
    }
    &.stella-right-top {
      top: 0;
      right: 0;
    }
    &.stella-left-bottom {
      bottom: 0;
      left: 0;
    }
    &.stella-right-bottom {
      bottom: 0;
      right: 0;
    }
  }
  .stella-item {
    z-index: 100;
  }
  .stella-upper-item {
    z-index: 300;
    &.stella-left-top {
      border-top-left-radius: 100%;
    }
    &.stella-right-top {
      border-top-right-radius: 100%;
    }
    &.stella-left-bottom {
      border-bottom-left-radius: 100%;
    }
    &.stella-right-bottom {
      border-bottom-right-radius: 100%;
    }
  }
  .stella-item {
    &.white {
      background: #ffffff;
    }
    &.black {
      background: #000000;
    }
  }
}
</style>
