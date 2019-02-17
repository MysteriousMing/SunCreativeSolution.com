<template>
  <div class="page-post-record" >
    <h4>文章记录</h4>
    <hr/>

  </div>
</template>
<script>
export default {
  name: 'PostRecord',
  data: function () {
    return {
      lastSaveTime: new Date().toLocaleDateString() + ' ' + new Date().toLocaleTimeString()
    }
  },
  mounted () {

  },
  methods: {
    loadArtcleList: function (params) {
      this.Http.Get(ApiUrl.artcles).then(res => {

      })
    }
  }
}
</script>
