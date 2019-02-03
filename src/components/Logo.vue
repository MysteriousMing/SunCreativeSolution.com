<template>
  <div class="stella-container white">
    <div class="stella-item stella-left-top white"></div>
    <div class="stella-item stella-right-top white"></div>
    <div class="stella-item stella-left-bottom black"></div>
    <div class="stella-item stella-right-bottom black"></div>
    <div class="stella-upper-item stella-left-top black"></div>
    <div class="stella-upper-item stella-right-top black"></div>
    <div class="stella-upper-item stella-left-bottom white"></div>
    <div class="stella-upper-item stella-right-bottom white"></div>
  </div>
</template>
<script>
export default {
  name: 'logo',
  props: ['topBg', 'bottomBg'],
  data () {
    return {
      topUpperBg: this.topBg || 'black',
      bottomUpperBg: this.bottomBg || 'white'
    }
  },
  methods: {

  }
}
</script>
<style lang="scss">
.stella-container {
  position: relative;
  width: 45px;
  height: 45px;

  &.white {
    background: transparent;
  }
  &.black {
    background: #000000;
  }
  .stella-item, .stella-upper-item {
    width: 22.5px;
    height: 22.5px;
    position: absolute;
    box-sizing: border-box;
    &.white {
      background: #D6D8D6;
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
      background: transparent;
    }
    &.black {
      background: #000000;
    }
  }
}
</style>
