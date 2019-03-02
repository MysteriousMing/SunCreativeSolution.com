<template>
  <el-container class="page-post-record pt-2">
    <el-header class="d-flex">
      <h5>Articles History</h5>
      <el-select
      class="ml-2"
      v-model="viewCategory" 
      @change="changeSelectCategory"
      clearable
      size="small"
      placeholder="请选择类型">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
      <section class="ml-auto">
        <i class="manage-icon el-icon-menu" :class="[{'active': viewType === 'thumbnail'}]"  @click="handleViewChange('thumbnail')"></i>
        <i class="manage-icon el-icon-tickets" :class="[{'active': viewType === 'list'}]" @click="handleViewChange('list')"></i>
      </section>
    </el-header>
    <el-main v-if="viewType === 'list'" v-loading="recordListLoading">
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
    <el-main v-if="viewType === 'thumbnail'" v-loading="recordListLoading">
      <section class="container masonry-arr">
        <isotope ref="cpt" :options="getOptions()" :list="articleList">
          <div v-for="(item,index) in articleList"
          :key="item.uuid"
          class="grid-item grid-sizer">
            <el-card :body-style="{ padding: '0px' }" style="margin-bottom: 10px">
              <img :src="item.header_image + '?x-oss-process=style/400wh'" class="image thumbnail">
              <div style="border-top: 10px solid"
              :style="{ padding: '14px', borderColor: item.theme_color }">
                <span>{{index+1}}. {{item.title}}</span>
                <p>{{item.explanation}}</p>

                <p class="d-flex">
                  <time class="time mr-auto">{{ item.date }}</time>
                  <el-tag size="small" v-if="item.category === 'art'">art</el-tag>
                  <el-tag size="small" v-else-if="item.category === 'research'" type="success">research</el-tag>
                  <el-tag size="small" v-else-if="item.category === 'commercial'" type="danger">commercial</el-tag>
                  <el-tag size="small" v-else type="info">{{item.category}}</el-tag>
                </p>                
                <div class="bottom clearfix d-flex">
                  <el-button @click="handleClick(item)" type="text" size="small">查看</el-button>
                  <el-button class="ml-auto" @click="handleClickEdit(item)" type="text" size="small">编辑</el-button>
                  <el-button @click="handleClickDelete(item.uuid)" type="text" style="color: #F56C6C" size="small">删除</el-button>
                </div>
              </div>
            </el-card>
          </div>
        </isotope>
      </section>
      <hr/>
      <el-button type="primary" round @click="handlePostNewArticle">发布新文章</el-button>
    </el-main>
  </el-container>
</template>
<script>
import categoryConfig from '../config/category'
import isotope from 'vueisotope'

export default {
  name: 'PostRecord',
  components: {
    isotope
  },
  data: function () {
    return {
      recordListLoading: true,
      viewCategory: '',
      options: [],
      viewType: 'thumbnail', // list
      articleList: [],
      saveArticleList: [],
      lastSaveTime: new Date().toLocaleDateString() + ' ' + new Date().toLocaleTimeString()
    }
  },
  mounted () {
    this.loadCategoryConfig()
    this.loadArtcleList()
  },
  methods: {
    getOptions () {
      return {
        itemSelector: '.grid-item',
        layoutMode: 'masonry',
        masonry: {
          gutter: 10, // 间距
          columnWidth: '.grid-sizer'
        },
        getFilterData: {
          isEven: function (itemElem) {
            return itemElem.id % 2 === 0
          },
          isOdd: function (itemElem) {
            return itemElem.id % 2 !== 0
          },
          filterByText: function (itemElem) {
            return itemElem.title.toLowerCase().includes(this.filterText.toLowerCase())
          }
        },
        getSortData: {
          id: 'group',
          name: function (itemElem) {
            return itemElem.title.toLowerCase()
          }
        }
      }
    },
    changeSelectCategory (val) {
      if (val) {
        this.articleList = this.saveArticleList.filter(item => item.category === val)
      } else {
        this.articleList = this.saveArticleList
      }
    },
    loadCategoryConfig () {
      this.options = [{
        value: 'Default',
        label: 'Default'
      }]
      categoryConfig.forEach(each => {
        this.options.push({
          value: each,
          label: each
        })
      })
    },
    handleViewChange (type) {
      this.viewType = type
    },
    loadArtcleList: function (params) {
      this.recordListLoading = true
      this.Http.Get('sun-create/article-admin/', {}).then(res => {
        this.recordListLoading = false
        this.articleList = res.map(item => {
          return {
            date: new Date(item.created_at).toDateString(),
            ...item
          }
        })
        this.saveArticleList = this.articleList
      })
    },
    handleClick (row) {
      console.log(row)
      this.$router.push({
        name: 'Project',
        params: {
          uuid: row.uuid
        }
      })
    },
    handleClickEdit (row) {
      this.$router.push({
        name: 'Edit',
        params: {
          uuid: row.uuid
        }
      })
    },
    handleClickDelete (uuid) {
      this.recordListLoading = true
      this.Http.Delete(`sun-create/article-admin/${uuid}/`, {}).then(res => {
        this.recordListLoading = false
        this.$notify({
          title: '成功',
          message: '你已成功删除.',
          type: 'success'
        })
        this.loadArtcleList()
      }).catch(_ => {
        this.recordListLoading = false
      })
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
.page-post-record {
  .container {
    min-height: 660px;
    padding-bottom: 2rem;
    // max-width: calc(100% - 132px);
  }
  .masonry-arr>div {
    min-height: 660px;
  }
  .grid-item,
  .grid-sizer {
    width: calc(33.3% - 9px);
  }
  .grid-item img {
    width: 100%;
  }
}

</style>
