<template>
  <section v-loading="isDetailLoading" on-scroll="onScroll" ref="project-page" class="page-project">
    <!-- image banner -->
    <section class="header">
        <figure 
        v-bind:style="{ background: articleDetail.theme_color || 'gray'}"
        class="left-col mb-0 pb-4">
            <img class="align-self-center" height="auto" width="100px"
            :src="articleDetail.header_image" alt="Header photos - title">
        </figure>
        <div class="right-col mb-0 d-md-down-none">
            <div class="color-pattern" 
            v-bind:style="{ background: articleDetail.theme_color || 'gray'}">
            </div>
        </div>
    </section>

    <!-- body -->
    <div class="left-col article-content ql-snow">
      <br>
      <article v-if="articleDetail"
      class="proj-content ql-editor"
      ref="content"
      v-html="articleDetail.content"
      v-scroll-spy></article>
    </div>
    <div class="right-col d-md-down-none">
      <div style="height: 300px;"
      class="pt-4 px-2">
        <ul v-scroll-spy-active="{selector: 'li.menu-item', class: 'custom-active'}"
         v-scroll-spy-link="{selector: 'a.title-nav-item'}">
            <li class="menu-item" v-for="(item, index) in titleArray" :key="index">
                <a class="title-nav-item">{{item.title}}</a>
            </li>
        </ul>
      </div>

    </div>

    <section class="clear">
      <AppFooter/>
    </section>
  </section>
</template>
<style lang="scss" scoped>
  $project-header-height: 530px;

  section.page-project {
    margin: 0 -30px;
  }


  .left-col {
      width: calc(100% - 270px);
      float: left;
  }
  .right-col {
      width: 270px;
      float: left;
  }
  .header {
      height: $project-header-height;
  }
  .header .left-col, .header .right-col {
      height: 100%;
  }
  figure.left-col {
      background: black;
      display: block;
      line-height: $project-header-height;
      overflow: hidden;
  }
  .left-col>img {
      min-width: 300px;
      max-width: 1080px;
      margin-left: auto;
      margin-right: auto;
      width: 100%;
      text-align: center;
      vertical-align: middle;
  }
  .right-col>.color-pattern {
      border-left: 15px solid white;
      background: black;
      height: 100%;
      display: block;
      width: 100%;
  }
  .proj-content {
    // position: relative;
  }
  .article-content {
      padding-top: 50px;
      padding-bottom: 150px;
      padding-left:10%;
  }
  .title-nav-item {
    cursor: pointer;
    color: #010000;
    font-size: 0.8125rem;
  }
  .menu-item {


  }
  .custom-active {
    opacity: 0.6;
    .title-nav-item {
      font-size: 1rem;
    }
  }



  @media (max-width: 991px) {
    .left-col {
        width: 100%;
        float: left;
    }
    .header {
      height: 284px;
    }
    figure.left-col {
      background: black;
      display: block;
      line-height: 200px;
      overflow: hidden;
    }
  }

  .clear {
    clear: both;
  }
</style>
<script>
import bus from '@/router/bus'

import { Footer as AppFooter } from '../components/'

import categoryConfig from '../config/category'

import Vue from 'vue'
import Scrollspy, { Easing } from 'vue2-scrollspy'
// use default options
Vue.use(Scrollspy)
const scrollspyOptions = {
  easing: Easing.Cubic.In,
  offset: 120
}
// or custom options
Vue.use(Scrollspy, scrollspyOptions)
export default {
  name: 'project',
  components: {
    AppFooter
  },
  data: function () {
    return {
      position: {},
      isDetailLoading: true,
      titleArray: [],
      activeTitle: 1,
      articleDetail: {
        content: ''
      },
      categoryConfig: categoryConfig
    }
  },
  created () {
    console.log('Name or Uuid')
    bus.$emit('header-go-black', 'white')
    this.getArticleDetail()
  },
  mounted () {
  },
  methods: {
    onScroll: function (e, position) {
      console.log(e, position)
      this.position = position
    },
    getArticleDetail () {
      this.isDetailLoading = true
      let uuid = this.$router.history.current.params.uuid
      this.Http.Get(`sun-create/article/${uuid}/`).then(res => {
        this.articleDetail = res
        this.isDetailLoading = false
        setTimeout(() => {
          this.formatTitleMenu(res.title)
        }, 1000)
      })
    },

    // titleList: this.formatTitleMenu(item.content)

    formatTitleMenu (title) {
      let content = this.$refs.content
      console.log(content)

      console.log(content.childNodes)
      let titleArr = content.querySelectorAll('h1')
      console.log(titleArr)
      this.titleArray = []

      titleArr.forEach((element, index) => {
        element.id = `title-${index}`
        // console.log(element.id)
        // console.log(element.textContent)
        this.titleArray.push({
          id: element.id,
          title: element.textContent
        })
        if (index === 0) {
          element.innerText = title
        }
      })
    },
    gotoTitle (index) {
      this.activeTitle = index + 1
      console.log('2333', this.titleArray[index].id)
    }
  }
}
</script>
