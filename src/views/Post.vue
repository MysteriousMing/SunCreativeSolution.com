<template>
<div class="post-page" v-loading="processLoading">
  <div>
    <strong>案例编辑</strong> / 1. 选择分类 2. 输入标题 3. 输入内容 4. Preview 后提交
  </div>
  <b-card class="post-header">
    <el-form ref="form" :model="form" label-width="60px">
      <el-form-item label="题目">
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
      <el-form-item v-if="this.form.title" label="缩略图">
        <el-upload
          class="avatar-uploader"
          :headers="uploadHeader"
          :action="uploadImage"
          :data="uploadThumbImageData"
          :show-file-list="false"
          :on-progress="uploadProcess"
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
          :on-success="handleHeaderSuccess"
          :before-upload="beforeAvatarUpload">
          <img v-if="form.header_image" :src="form.header_image" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>
    </el-form>    
  </b-card>

  <Editor @confirmEditorRichText="confirmText"></Editor>

  <b-card class="post-foot">
    <span class="time-tips">当前: {{lastSaveTime}}</span>
    <button @click="cancelPost" class="btn btn-light" type="clear"> 取消</button>
    <button @click="confirmPost" v-if="editStatus === 'editing'" class="btn btn-primary" type="submit"> 提交</button>
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
      uploadImage: `${this.Http.baseUrl}tools/upload-image/`,
      form: {
        sort_index: 2,
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
  mounted () {
    setInterval(() => {
      this.loadTime()
    }, 1000)
    console.log(categoryConfig)
  },
  methods: {
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
      this.$alert('取消后将不会保存内容, 确认返回历史页', '提示', {
        confirmButtonText: '确定',
        callback: action => {
          this.$router.push({
            name: 'Admin'
          })
        }
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
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409EFF;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
