<template>
  <div v-if="media">
    <template v-if="media.type === 'image'">
      <img :src="media.source" alt="">
    </template>
  </div>
</template>

<script>
export default {
  name: 'MediaItem',
  props: {
    media: Object
  }
}
</script>

<style lang="scss" scoped>
</style>