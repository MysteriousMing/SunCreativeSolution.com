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
        <el-button type="primary" class="mr-auto" @click="showAddCarousel()">插入轮播图</el-button>
        <button class="btn btn-secondary" @click="cancel()">Clear</button>
        <button class="btn btn-primary" type="success" @click="confirmText()">PRVIEW</button>
    </div>
    <b-card class="mb-3 animated fadeIn" v-if="result">
      <div class="col-12 col-md-8" v-html="result"></div>
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
  action="https://jsonplaceholder.typicode.com/posts/"
  multiple>
    <i class="el-icon-upload"></i>
    <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
    <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
  </el-upload>
  <el-carousel indicator-position="outside">
    <el-carousel-item v-for="item in carouselData.length" :key="item">
      <img v-if="item.type === 'image'" :src="item.url"/>
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
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

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
      carouselData: [1, 2],
      isShowAddCarousel: false,
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
    addCarouselImage: function (params) {
      let imgItem = {
        type: 'image',
        url: params
      }
      this.carouselData.push(imgItem)
      this.carouselContext = this.buildCarouselCtx()
    },
    removeCarouselImage: function (index) {
      this.carouselData.splice(index, 1)
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
    },
    confirmText: function (params) {
      console.log('CONTENT | ', this.content)
      this.result = this.content
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
      this.content = this.formContent || `<h1 class="ql-align-center">
                          <span class="ql-font-serif" style="background-color: rgb(240, 102, 102); color: rgb(255, 255, 255);"> I am Example 1! </span>
                        </h1>
                        <p><br></p>
                        <p><span class="ql-font-serif">W Can a man still be brave if he's afraid? That is the only time a man can be brave. </span></p>
                        <p><br></p>
                        <p><strong class="ql-font-serif ql-size-large">Courage and folly is </strong><strong class="ql-font-serif ql-size-large" style="color: rgb(230, 0, 0);">always</strong><strong class="ql-font-serif ql-size-large"> just a fine line.</strong></p>
                        <p><br></p>
                        <p><u class="ql-font-serif">There is only one God, and his name is Death. And there is only one thing we say to Death: "Not today."</u></p>
                        <p><br></p>
                        <p><em class="ql-font-serif">Fear cuts deeper than swords.</em></p>
                        <p><br></p>
                        <p><span class="ql-font-serif">Every flight begins with a fall.</span></p>
                        <p><br></p>
                        `
    }, 1300)
  }
}
</script>
<style lang="scss" scoped>
.quill-editor {
  // min-height: 500px;
  .ql-container {
    // min-height: 500px
  }
}
  

</style>
