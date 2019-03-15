<template>
  <div class="animated fadeIn">
    <quill-editor v-model="content"
                  class="editor-container"
                  ref="myQuillEditor"
                  :options="editorOption"
                  @blur="onEditorBlur($event)"
                  @focus="onEditorFocus($event)"
                  @ready="onEditorReady($event)">
    </quill-editor>
    <!-- Confirm -->
    <div class="my-3 d-flex justify-content-end">
        <!-- <el-button type="primary" class="mr-auto" @click="showAddCarousel()">插入轮播图</el-button> -->
        <el-button type="primary" class="mr-auto" @click="showSplit()">插入分割</el-button>
        <button class="btn btn-secondary" @click="cancel()">Clear</button>
        <button class="btn btn-primary" type="success" @click="confirmText()">PRVIEW</button>
    </div>
    <b-card class="mb-3 animated fadeIn ql-container ql-snow" v-if="result">
      <div ref="resultContent"
      class="col-12 col-md-8 ql-editor" v-html="result"></div>
      <article class="col-12 col-md-8 ql-editor">
        <div v-for="(section, index) of contentArr" :key="index">
          <section v-if="section.styleClass === 'para-section'" class="para-section">
            <div class="section-header-ctn">
              <h1>{{section.header.name}}</h1>
              <h2>{{section.subheader.name}}</h2>
            </div>
            <div>
              <p v-for="(para, p_index) in section.para" :key="p_index" v-html="para.innerHTML"></p>
            </div>
          </section>
          <section v-else-if="section.styleClass === 'images-section'" class="images-section">
            <div v-for="(image, image_index) in section.images" :key="image_index" v-html="image.innerHTML"></div>
          </section>          
        </div>
      </article>
    </b-card>


<el-dialog
  title="轮播图插件"
  :visible.sync="isShowAddCarousel"
  width="80%"
  :before-close="handleClose">
  <span>选择需要插入轮播图的图片们</span>

  <el-upload
  class="upload-demo"
  drag
  :headers="uploadHeader"
  :action="uploadImage"
  :data="uploadImageData"
  :before-upload="handleBeforeUpdate"
  :on-progress="handleUploadProcess"
  :on-error="handleUploadError"
  :on-success="handleImageSuccess"
  multiple>
    <i class="el-icon-upload"></i>
    <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
    <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
  </el-upload>

  <el-carousel v-loading="processLoading"
  indicator-position="outside">
    <el-carousel-item v-for="(item, index) in carouselData" :key="index">
      <img v-if="item.type == 'image'" :src="item.url"/>
      <h3 v-else>{{ item }}</h3>
    </el-carousel-item>
  </el-carousel>
  {{carouselData}}
  <span slot="footer" class="dialog-footer">
    <el-button @click="closeAddCarousel">取 消</el-button>
    <el-button type="primary" @click="confirmCarouselText">确 定</el-button>
  </span>
</el-dialog>
  </div>
</template>


<script>
import Vue from 'vue'
import VueQuillEditor from 'vue-quill-editor'

// mount with global
Vue.use(VueQuillEditor)

export default {
  name: 'text-editors',
  props: {
    formContent: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      result: '',
      contentArr: [],
      carouselData: [],
      isShowAddCarousel: false,
      uploadImage: `${this.Http.baseUrl}tools/upload-image/`,
      uploadImageData: {
        identifier: '',
        image_type: 'sun/carousel'
      },
      uploadHeader: {
        Authorization: `Token ${window.localStorage.token}`
      },
      processLoading: false,
      startTimestamp: new Date(),
      editorOption: {
        modules: {
          toolbar: [
            ['bold', 'italic', 'underline', 'strike'],
            ['blockquote', 'code-block'],
            [{ 'header': 1 }, { 'header': 2 }],
            [{ 'list': 'ordered' }, { 'list': 'bullet' }],
            [{ 'script': 'sub' }, { 'script': 'super' }],
            [{ 'indent': '-1' }, { 'indent': '+1' }],
            [{ 'direction': 'rtl' }],
            [{ 'size': ['small', false, 'large', 'huge'] }],
            [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
            [{ 'font': [] }],
            [{ 'color': [] }, { 'background': [] }],
            [{ 'align': [] }],
            ['clean'],
            ['link', 'image', 'video']
          ]
        }
      },
      content: `<h2 class="ql-align-center"><span class="ql-font-serif">Text content loading..</span></h2>`
    }
  },
  methods: {
    formatContentNode () {
      let content = this.$refs.resultContent
      if (!content || !content.childNodes) return
      this.contentArr = this.Utils.formatProject(content.childNodes)
      console.log('contentArr - \n', this.contentArr)
    },
    showSplit () {
      this.content.push(`<p>!&hr&!</p>`)
    },
    onEditorBlur (quill) {
      // console.log('editor blur!', quill)
    },
    onEditorFocus (quill) {
      // console.log('editor focus!', quill)
    },
    onEditorReady (quill) {
      // console.log('editor ready!', quill)
    },
    onEditorChange ({ quill, html, text }) {
      console.log('editor change!', quill, html, text)
      this.content = html
    },
    showAddCarousel: function (params) {
      this.isShowAddCarousel = true
    },
    closeAddCarousel: function (params) {
      this.carouselData = []
      this.isShowAddCarousel = false
    },
    handleClose (done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          this.carouselData = []
          done()
        })
        .catch(_ => {})
    },
    handleBeforeUpdate () {
      this.uploadImageData.identifier = new Date().getTime()
    },
    handleUploadProcess () {
      this.processLoading = true
    },
    handleUploadError (res) {
      console.warn(res)
      // this.$message.error(res)
      this.processLoading = false
    },
    handleImageSuccess (res, file) {
      console.log(res, file)
      // this.imageUrl = URL.createObjectURL(file.raw)
      this.addCarouselImage(res)
      this.processLoading = false
    },
    addCarouselImage: function (params) {
      let imgItem = {
        type: 'image',
        url: params
      }
      this.carouselData.push(imgItem)
      console.log(this.carouselData)
      this.carouselContext = this.buildCarouselCtx()
    },
    removeCarouselImage: function (index) {
      this.carouselData.splice(index, 1)
      console.log(this.carouselData)
      this.carouselContext = this.buildCarouselCtx()
    },
    buildCarouselCtx: function () {
      let ctx = `<el-carousel indicator-position="outside">`
      this.carouselData.forEach(each => {
        ctx = ctx + `<el-carousel-item>`
        if (each.type === 'image') {
          let itemCtx = `<img style="max-width:100%;max-height:100%;" src="${each.url}" /></el-carousel-item>`
          ctx = ctx + itemCtx
        } else {
          let itemCtx = `<h3>${each}</h3>`
          ctx = ctx + itemCtx
        }
        ctx = ctx + `</el-carousel-item>`
      })
      ctx = ctx + `</el-carousel>`
      return ctx
    },
    confirmCarouselText: function (params) {
      this.content = this.content + '<br/>' + this.carouselContext
      console.log(this.content)
      console.log(this.carouselContext)
      this.closeAddCarousel()
    },
    confirmText: function (params) {
      console.log('CONTENT | ', this.content)
      this.result = this.content
      // this.formatContentNode()
      this.$emit('confirmEditorRichText', this.content)
    },
    cancel: function (params) {
      this.result = ''
      this.content = ''
    }
  },
  computed: {
    editor () {
      return this.$refs.myQuillEditor.quill
    }
  },
  mounted () {
    console.log('this is current quill instance object', this.editor)
    setTimeout(() => {
      this.content = this.formContent || ''
    }, 1300)
  }
}
</script>
<style lang="scss" scoped>
.quill-editor {
  // min-height: 500px;
  .ql-container {
    height: 500px
  }
}
img { width: 100%; height: auto;max-width: 100%; display: block; }
</style>
<style lang="scss">
  @import '../style/project.scss';
</style>