<template>
  <div class="animated fadeIn">
    <b-card class="mt-4">
      <div slot="header">
        <strong>案例编辑</strong> / 1. 选择分类 2. 输入标题 3. 输入内容
        <div class="card-actions"><a href="https://github.com/surmon-china/vue-quill-editor" target="_blank">docs</a></div>
      </div>
      <quill-editor v-model="content"
                    ref="myQuillEditor"
                    :options="editorOption"
                    @blur="onEditorBlur($event)"
                    @focus="onEditorFocus($event)"
                    @ready="onEditorReady($event)">
      </quill-editor>
  </b-card>
  <!-- Confirm -->
  <div class="row mb-3 d-flex justify-content-end">
    <div class="col-3">
      <button class="btn btn-secondary" @click="cancel()">CANCEL</button>
      <button class="btn btn-primary" type="success" @click="confirmText()">PRVIEW</button>
      <button class="btn btn-success" type="success" @click="confirmText()">SAVE</button>
    </div>
  </div>
  <b-card class="row mb-3" v-if="result">
    <div slot="header">
      DEMO
    </div>
    <div class="col-12 col-md-8" v-html="result"></div>
  </b-card>
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
  data () {
    return {
      result: '',
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
      console.log('editor blur!', quill)
    },
    onEditorFocus (quill) {
      console.log('editor focus!', quill)
    },
    onEditorReady (quill) {
      console.log('editor ready!', quill)
    },
    onEditorChange ({ quill, html, text }) {
      console.log('editor change!', quill, html, text)
      this.content = html
    },
    confirmText: function (params) {
      console.log('CONTENT | ', this.content)
      this.result = this.content
    },
    cancel: function (params) {
      this.result = ''
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
      this.content = `<h1 class="ql-align-center">
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
<style>

</style>
