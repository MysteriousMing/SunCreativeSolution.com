<template>
<div class="post-page">
  <b-card class="post-header">
    <div class="row">
       名称: <input class="post-input" type="text" name="title" id="">
    </div>
    <div class="row">
      类型: <b-select class="post-input" aria-placeholder="选择类型">
        <option value="类型 A">类型 A</option>
        <option value="类型 B">类型 B</option>
        <option value="类型 C">类型 C</option>
      </b-select>
    </div>

  </b-card>
  <div>
    <strong>案例编辑</strong> / 1. 选择分类 2. 输入标题 3. 输入内容
  </div>
  <Editor></Editor>
  <b-card class="post-foot">
    <span class="time-tips">当前: {{lastSaveTime}}</span>
    <button class="btn btn-light" type="clear"> 取消</button>
    <button class="btn btn-primary" type="submit"> 提交</button>
  </b-card>
</div>
</template>



<script>
import Editor from './Editor'
export default {
  name: 'dashboard',
  components: {
    Editor
  },
  data: function () {
    return {
      lastSaveTime: new Date().toLocaleDateString() + ' ' + new Date().toLocaleTimeString()
    }
  },
  mounted () {
    setInterval(() => {
      this.loadTime()
    }, 1000)
  },
  methods: {
    loadTime: function (params) {
      this.lastSaveTime = new Date().toLocaleDateString() + ' ' + new Date().toLocaleTimeString()
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
