<template>
  <div class="page-catograph">
    <transition>
      <section class="cat-ctn cat-1">
        <img src="https://static.dubheee.cn/images/cats/1.png" />
      </section>
    </transition>
    <transition>
      <section class="cat-ctn cat-2">
        <img src="https://static.dubheee.cn/images/cats/2.png" />
      </section>
    </transition>
    <transition>
      <section class="cat-ctn cat-3">
        <img src="https://static.dubheee.cn/images/cats/3.png" />
      </section>
    </transition>
    <transition>
      <section class="cat-ctn cat-4">
        <img src="https://static.dubheee.cn/images/cats/4.png" />
      </section>
    </transition>
  </div>
</template>
<script>
export default {
  name: 'dashboard',
  data () {
    return {

    }
  },
  mounted () {
  },
  methods: {
  }
}
</script>

<style lang="scss">
.page-catograph {
  width: 100vw;
  height: 100vh;
  position: relative;
  overflow: hidden;

  background: #141E30;  /* fallback for old browsers */
  background: -webkit-linear-gradient(to right, #243B55, #141E30);  /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(to right, #243B55, #141E30); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
}
.cat-ctn {
  width: 700px;
  background: transparent;
  height: auto;
  position: absolute;

  img {
    width: 100%;
    object-fit: cover;
  }
}
.cat-1 {
  top: calc(60% - 180px);
  left: 0px;
  z-index: 1;
}
.cat-2 {
  top: calc(60% - 220px);
  left: 100px;
  z-index: 0;
}
.cat-3 {
  top: calc(60% - 260px);
  left: 260px;
  z-index: 0;
}
.cat-4 {
  top: calc(60% - 210px);
  right: 80px;
  z-index: 0;
}

</style>

