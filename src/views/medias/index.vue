<template>
  <div>
    <header class="d-flex">
      <h3>素材库</h3>

      <div class="mr-auto">
        <el-button type="primary">上传</el-button>
      </div>
    </header>
    <section class="list-view">
      <media-item v-for="(item, index) in medias" :key="index" :media="item" />
    </section>
  </div>
</template>

<script>
import mediaItem from './mediaItem.vue'
export default {
  components: { mediaItem },
  name: 'MediaLibrary',
  data: {
    medias: []
  }
}
</script>

<style lang="scss" scoped>
</style>