<template>
  <div class="page-post-record" >
    <h4>文章记录</h4>
    <hr/>
    <el-table
      :data="articleList"
      border
      style="width: 100%">
      <el-table-column
        fixed
        prop="date"
        label="日期"
        width="60">
      </el-table-column>
      <el-table-column
        prop="title"
        label="标题"
        width="140">
      </el-table-column>
      <el-table-column
        prop="explanation"
        label="描述"
        width="140">
      </el-table-column>
      <el-table-column
        fixed="right"
        label="操作"
        width="100">
        <template slot-scope="scope">
          <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
          <el-button @click="handleClickEdit(scope.row)" type="text" size="small">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
    <hr/>
    <el-row>
      <el-col>
        <el-button type="primary" round @click="handlePostNewArticle">发布新文章</el-button>
      </el-col>
    </el-row>
  </div>
</template>
<script>
export default {
  name: 'PostRecord',
  data: function () {
    return {
      articleList: [],
      lastSaveTime: new Date().toLocaleDateString() + ' ' + new Date().toLocaleTimeString()
    }
  },
  mounted () {

  },
  methods: {
    loadArtcleList: function (params) {
      this.Http.Get('sun-create/article/', {}).then(res => {
        console.log(res)
        this.articleList = res.results.map(item => {
          return {
            date: new Date(item.created_at).toDateString(),
            ...item
          }
        })
      })
    },
    handleClick (row) {
      console.log(row)
    },
    handleClickEdit (row) {

    },
    handlePostNewArticle: function (params) {
      // 引入 or 跳转 editor 页面
    }
  }
}
</script>
