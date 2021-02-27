<template>
  <div class="media-page">
    <header class="media-header d-flex align-items-center">
      <h3>素材库</h3>
      <el-input class="form-input ml-1" v-model="params.search" placeholder="输入名称或文件夹查询" size="small" @change="fetchMedias" />

      <div class="ml-auto">
        <el-button type="primary" @click="showUpload">上传</el-button>
      </div>
    </header>

    <section class="list-view">
      <el-row :gutter="20">
        <el-col :span="4" v-for="(item, index) in medias" :key="index">
          <media-item :media="item" />
        </el-col>
      </el-row>

      <el-pagination
      class="mt-4"
      layout='prev, pager, next, jumper, ->, sizes, total'
      :page-sizes="[6, 12, 18, 24]"
      :total="total"
      :page-size="params.size"
      :current-page.sync="params.page"
      @size-change="sizeChange"
      @current-change="fetchMedias"
      />
    </section>

    <upload-dialog
    :visible.sync="isShowUploadDialog"
    @success="handleSuccess"/>
  </div>
</template>

<script>
import mediaItem from './mediaItem.vue'
import UploadDialog from './UploadDialog.vue'
export default {
  components: { mediaItem, UploadDialog },
  name: 'MediaLibrary',
  data() {
    return {
      params: {
        search: null,
        size: 18,
        page: 1
      },
      total: 0,
      medias: [],
      isShowUploadDialog: false
    }
  },
  mounted() {
    this.fetchMedias()
  },
  methods: {
    sizeChange(v) {
      console.log(v)
      this.params.size = v
      this.fetchMedias()
    },
    fetchMedias() {
      this.Http.Get('sun-create/medias/', {
        ...this.params
      }).then((res) => {
        const {list, total} = res
        this.total = total
        this.medias = list
      })
    },
    showUpload() {
      this.isShowUploadDialog = true
    },
    handleSuccess() {
      this.isShowUploadDialog = false
      this.fetchMedias()
    }
  }
}
</script>

<style lang="scss" scoped>
h1, h2, h3, h4, h5 {
  margin: 0;
}
.media-page {
  height: calc(100vh - 62px);
  max-width: 1080px;
  margin: auto;
  .list-view {
    padding: 12px 0;
  }
}
.media-page .media-header {
  /* height: 5rem; */
  margin-top: 1rem;
  .form-input {
    width: 180px;
  }
}
</style>