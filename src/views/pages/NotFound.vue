<template>
  <div class="not-found-page">
    <construction />
    Oppps... page not found.
  </div>
</template>

<script>
import Construction from '../../containers/Construction.vue'
export default {
  components: { Construction },
}
</script>

<style lang="scss" scoped>
.not-found-page {
  font-size: 1.125rem;
  color: #444;
  padding: 24px;
  text-align: center;
}
</style>