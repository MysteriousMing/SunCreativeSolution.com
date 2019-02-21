<template>
  <el-container class="page-post-record pt-2">
    <el-header class="d-flex">
      <h5>Articles History</h5>
      <section class="ml-auto">
        <i class="manage-icon el-icon-menu" :class="[{'active': viewType === 'thumbnail'}]"  @click="handleViewChange('thumbnail')"></i>
        <i class="manage-icon el-icon-tickets" :class="[{'active': viewType === 'list'}]" @click="handleViewChange('list')"></i>
      </section>
    </el-header>
    <el-main v-if="viewType === 'list'">
      <el-table
        :data="articleList"
        border
        stripe
        height="500"
        style="width: 100%">
        <el-table-column
          fixed
          prop="date"
          label="日期"
          width="120">
        </el-table-column>
        <el-table-column
          prop="title"
          label="标题"
          width="140">
        </el-table-column>
        <el-table-column
          prop="explanation"
          label="描述">
        </el-table-column>
        <el-table-column
          prop="category"
          label="分类"
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
      <el-button type="primary" round @click="handlePostNewArticle">发布新文章</el-button>
    </el-main>
    <el-main v-if="viewType === 'thumbnail'">
      <el-row :gutter="20">
        <el-col :span="8" v-for="(item, index) in articleList" :key="item.uuid">
          <el-card :body-style="{ padding: '0px' }">
            <img :src="item.header_image + '?x-oss-process=style/400wh'" class="image thumbnail">
            <div style="padding: 14px;">
              <span>{{index}}.{{item.title}}</span>
              <p>{{item.explanation}}
                <el-tag v-if="item.category === 'art'">art</el-tag>
                <el-tag v-else-if="item.category === 'research'" type="success">research</el-tag>
                <el-tag v-else-if="item.category === 'commercial'" type="danger">commercial</el-tag>
                <el-tag v-else type="info">{{item.category}}</el-tag>
              </p>
              <div class="bottom clearfix">
                <time class="time">{{ item.date }}</time>
                <el-button @click="handleClick(item)" type="text" size="small">查看</el-button>
                <el-button @click="handleClickEdit(item)" type="text" size="small">编辑</el-button>
              </div>
            </div>
          </el-card>
        </el-col>
      </el-row>
      <hr/>
      <el-button type="primary" round @click="handlePostNewArticle">发布新文章</el-button>
    </el-main>
  </el-container>
</template>
<script>
export default {
  name: 'PostRecord',
  data: function () {
    return {
      viewType: 'thumbnail', // list
      articleList: [],
      lastSaveTime: new Date().toLocaleDateString() + ' ' + new Date().toLocaleTimeString()
    }
  },
  mounted () {
    this.loadArtcleList()
  },
  methods: {
    handleViewChange (type) {
      this.viewType = type
    },
    loadArtcleList: function (params) {
      this.Http.Get('sun-create/article-admin/', {}).then(res => {
        console.log(res)
        this.articleList = res.map(item => {
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
      this.$router.push({
        name: 'Post'
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.thumbnail {
  width: 100%;
}
.manage-icon {
  width: 32px;
  height: 32px;

  &.active {
    color: #409EFF
  }
}
</style>
