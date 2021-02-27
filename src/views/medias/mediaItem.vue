<template>
  <div v-if="media" class="media-item">
    <template v-if="media.type === 'image'">
      <el-image class="media-entity"
        :src="media.url"
        :preview-src-list="[media.url]">
      </el-image>
    </template>
    <template v-if="media.type === 'audio'">
      <div class="media-entity audio">
        <audio controls>
          <source :src="media.url" type="audio/ogg">
          <source :src="media.url" type="audio/mpeg">
          Your browser does not support the audio tag.
        </audio>
      </div>
    </template>
    <template v-if="media.type === 'video'">
      <div class="media-entity audio">
        <video controls>
          <source :src="media.url" type="video/mp4">
          Your browser does not support the video tag.
        </video>
      </div>
    </template>
    <hr/>
    <div>
      <strong>{{media.name}}</strong>
      <p class="path">{{media.oss_path}}</p>
      <el-tag size="mini">{{media.type}}</el-tag>
    </div>
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
$size: 140px;
.media-item {
  width: $size;
  p {
    margin: 0;
  }
  .media-entity {
    width: $size;
    height: $size;
    display: block;

    video, audio {
      width: 100%;
      height: 100%;
    }
  }
}
</style>