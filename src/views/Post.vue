<template>
<div class="post-page">
  <div>
    <strong>案例编辑</strong> / 1. 选择分类 2. 输入标题 3. 输入内容 4. Preview 后提交
  </div>
  <b-card 
  v-loading="processLoading"
  class="post-header">
    <el-form ref="form" :model="form" label-width="60px">
      <el-form-item label="标题">
        <el-input v-model="form.title" @change="inputTitle"></el-input>
      </el-form-item>
      <el-form-item label="类型">
        <el-select v-model="form.category" placeholder="请选择类型">
        <el-option v-for="item in categoryConfig" :key="item" :label="item" :value="item"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="简介">
        <el-input type="textarea" v-model="form.explanation"></el-input>
      </el-form-item>
      <el-form-item label="主题色">
        <el-color-picker v-model="form.theme_color"></el-color-picker>
      </el-form-item>

      <el-form-item v-if="this.form.title" label="缩略图">
        <el-upload
          class="avatar-uploader"
          :headers="uploadHeader"
          :action="uploadImage"
          :data="uploadThumbImageData"
          :show-file-list="false"
          :on-progress="uploadProcess"
          :on-error="handleUploadError"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload">
          <img v-if="form.thumbnail" :src="form.thumbnail" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>
      <el-form-item v-if="this.form.title" label="头部图">
        <el-upload
          class="avatar-uploader"
          :headers="uploadHeader"
          :action="uploadImage"
          :data="uploadHeaderImageData"
          :show-file-list="false"
          :on-progress="uploadProcess"
          :on-error="handleUploadError"
          :on-success="handleHeaderSuccess"
          :before-upload="beforeAvatarUpload">
          <img v-if="form.header_image" :src="form.header_image" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>
    </el-form>    
  </b-card>

  <Editor 
  v-loading="processLoading"
  @confirmEditorRichText="confirmText" :form-content="form.content"></Editor>

  <b-card 
  v-loading="processLoading"
  class="post-foot">
    <span class="time-tips">当前: {{lastSaveTime}}</span>
    <button @click="cancelPost" class="btn btn-light" type="clear">{{!articleUuid ? '取消':'返回'}}</button>
    <button @click="beforeConfirmPost" v-if="editStatus.indexOf('edit') >= 0" class="btn btn-primary" type="submit">{{!articleUuid ? '提交':'修改'}}</button>
  </b-card>
</div>
</template>



<script>
import Editor from './Editor'
import categoryConfig from '../config/category'

export default {
  name: 'dashboard',
  components: {
    Editor
  },
  data: function () {
    return {
      processLoading: false,
      editStatus: 'editing', // saved
      uploadHeaderImageData: {
        identifier: '',
        image_type: 'sun/header'
      },
      headerImageUrl: '',
      uploadThumbImageData: {
        identifier: '',
        image_type: 'sun/thumbnail'
      },
      ThumbImageUrl: '',
      uploadHeader: {
        Authorization: `Token ${window.localStorage.token}`
      },
      articleUuid: null,
      uploadImage: `${this.Http.baseUrl}tools/upload-image/`,
      form: {
        sort_index: 2,
        theme_color: '#409EFF',
        // category: 'art',
        // explanation: 'hhhhh',
        // header_image: 'https://static.dubheee.cn/sun/header-image/正式测试.jpg',
        // thumbnail: 'https://static.dubheee.cn/sun/thumbnail-image/正式测试.jpg',
        title: ''
      },
      categoryConfig: categoryConfig,
      lastSaveTime: new Date().toLocaleDateString() + ' ' + new Date().toLocaleTimeString()
    }
  },
  created () {
    console.log('Created Post Page')
    let uuid = this.$router.history.current.params.uuid
    if (uuid) {
      console.log('uuid - ', uuid)
      this.editStatus = 'editing'
      this.articleUuid = uuid
      this.loadArticleDetail(uuid)
    }
  },
  mounted () {
    setInterval(() => {
      this.loadTime()
    }, 1000)
    console.log(categoryConfig)
  },
  methods: {
    loadArticleDetail: function (uuid) {
      this.processLoading = true
      this.Http.Get(`sun-create/article-admin/${uuid}/`).then(res => {
        this.form = res
        setTimeout(() => {
          // this.formatTitleMenu()
          this.processLoading = false
        }, 1000)
      })
    },
    loadTime: function (params) {
      this.lastSaveTime = new Date().toLocaleDateString() + ' ' + new Date().toLocaleTimeString()
    },
    inputTitle (val) {
      console.log(val)
      this.uploadThumbImageData.identifier = this.form.title.replace(/\s+/g, '')
      this.uploadHeaderImageData.identifier = this.form.title.replace(/\s+/g, '')
    },
    confirmText (data) {
      this.form.content = data
      console.log(this.form)
    },
    handleHeaderSuccess (res, file) {
      console.log(res, file)
      // this.imageUrl = URL.createObjectURL(file.raw)
      this.form.header_image = res
      this.processLoading = false
    },

    handleUploadError (res) {
      console.error(res)
      this.$message.error('上传图片失败')
      this.processLoading = false
    },

    handleAvatarSuccess (res, file) {
      console.log(res, file)
      // this.imageUrl = URL.createObjectURL(file.raw)
      this.form.thumbnail = res
      this.processLoading = false
    },
    uploadProcess () {
      this.processLoading = true
    },
    beforeAvatarUpload (file) {
      const isJPG = file.type === 'image/jpeg' || file.type === 'image/png' || file.type === 'image/gif'
      // const isLt2M = file.size / 1024 / 1024 < 2

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG / PNG / GIF 格式!')
      }
      // if (!isLt2M) {
      //   this.$message.error('上传头像图片大小不能超过 2MB!')
      // }
      return isJPG
    },
    cancelPost () {
      if (this.articleUuid) {
        this.$router.push({
          name: 'Admin'
        })
        return
      }
      this.$alert('取消后将不会保存已编辑内容, 确认返回历史页', '提示', {
        confirmButtonText: '确定',
        callback: action => {
          this.$router.push({
            name: 'Admin'
          })
        }
      })
    },
    beforeConfirmPost () {
      if (this.articleUuid) {
        this.confirmUpdate()
      } else {
        this.confirmPost()
      }
    },
    confirmUpdate () {
      if (!this.form.title) {
        this.$message.error('请填写题目')
        return
      }
      if (!this.form.content) {
        this.$message.error('请编辑内容')
        return
      }
      this.processLoading = true
      this.Http.Patch(`sun-create/article-admin/${this.articleUuid}/`, {}, this.form)
        .then(res => {
          this.$notify({
            title: '成功',
            message: '你已成功修改文字',
            type: 'success'
          })
          this.processLoading = false
          this.editStatus = 'edited'
        })
    },
    confirmPost () {
      if (!this.form.title) {
        this.$message.error('请填写题目')
        return
      }
      if (!this.form.content) {
        this.$message.error('请编辑内容')
        return
      }
      this.processLoading = true

      console.log(this.form)
      this.Http.Post('sun-create/article-admin/', {}, this.form)
        .then(res => {
          this.$notify({
            title: '成功',
            message: '你已成功保存.',
            type: 'success'
          })
          this.processLoading = false
          this.editStatus = 'saved'
        })
        .catch(err => {
          this.processLoading = false
          console.error('Error', err)
          this.$message.error('报错啦')
        })
    }
  }
}
</script>
<style>
.post-page {
  height: calc(100vh - 62px);
}
.post-page .post-header {
  /* height: 5rem; */
  margin-top: 2rem;
  background: #fafafa;
}
.post-page .post-header .row{
  /* height: 5rem; */
  margin-bottom: 10px;
}
.post-page .post-body {
  min-height: 40rem;
}
.post-page .post-foot {
  min-height: 5rem;
  text-align: right;
  background: #fafafa;
}
.post-page .time-tips {
  margin-right: 2rem;
}
.post-page .post-title {
  margin-right: 2rem;
}
.post-page .post-input {
  width: 60%;
  max-width: 100rem;
  margin-left: 10px;
}
.post-page .post-article {
  width: 100%;
  height: 100%;
  display: block;
  margin: auto;
}
.post-page .post-article:focus,
.post-page .post-article:active {
  outline: none;
}
</style>
<style lang="scss" scoped>
.el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
}
.el-upload:hover {
  border-color: #409EFF;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 400px;
  height: 300px;
  line-height: 300px;
  text-align: center;
  background: white;
}
img.avatar { width: 100%; height: auto;max-width: 100%; display: block; }
.avatar {
  display: block;
}
</style>
