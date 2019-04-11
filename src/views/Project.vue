<template>
  <section v-scroll="onScroll" ref="projectPage" class="page-project proj-content"
  id="proj-content" :style="'--current-theme-color:' + articleDetail.theme_color">
    <section class="project-progress d-md-none" v-show="showMobileProgress">
      <div class="project-progress-inner" :style="'width: ' + readingProgress +'%'"></div>
    </section>
    <!-- image banner -->
    <section class="header" v-loading="isDetailLoading">
        <figure 
        v-bind:style="{ background: articleDetail.theme_color || 'gray'}"
        class="left-col mb-0">
            <img v-show="articleDetail.header_image" class="align-self-center" height="auto" width="100px"
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
      <article v-if="articleDetail && !articleDetail.contentArr" v-show="false"
      class="ql-editor"
      ref="content"
      v-html="articleDetail.content">
      </article>

      <article v-if="articleDetail"
      class="ql-editor"
      ref="contentNode">
        <div v-for="(section, index) of articleDetail.contentArr" :key="index" :class="section.styleClass">
          <section v-if="section.styleClass === 'para-section'">
            <div class="section-header-ctn">
              <h1 v-if="section && section.header" v-bind:id="section.header.idx">{{section.header.name}}</h1>
              <h2 v-if="section && section.subheader" v-bind:id="section.subheader.idx">{{section.subheader.name}}</h2>
            </div>
            <div>
              <p v-for="(para, p_index) in section.para" :key="p_index" v-html="para.innerHTML"></p>
            </div>
          </section>
          <section v-else-if="section.styleClass === 'image-header-section'">
            <div class="section-header-ctn">
              <h1 v-if="section && section.header" v-bind:id="section.header.idx">{{section.header.name}}</h1>
              <h2 v-if="section && section.subheader" v-bind:id="section.subheader.idx">{{section.subheader.name}}</h2>
            </div>
          </section>
          <section v-else-if="section.styleClass === 'images-section'">
            <!-- v-for="(image, image_index) in section.images" :key="image_index"-->
            <el-carousel v-if="section.images.length > 1"
              :autoplay="section.images.length > 2 ? true : false"
              :loop="section.images.length > 2 ? true : false"
              ref="imageCarousel"
              :height="(parseInt(carouselWidth * section.height / section.width) || 400) + 'px'"
              indicator-position="outside">
              <el-carousel-item v-for="(image, image_index) in section.images" :key="image_index">
                <div class="para-image" v-html="image.innerHTML" ref="imgSize"></div>
              </el-carousel-item>
            </el-carousel>
            <div class="para-image" v-if="section.images.length == 1" v-html="section.images[0].innerHTML"></div>
          </section>          
        </div>
      </article>
    </div>
    <!-- 右侧 TOC 目录 -->
    <div class="right-col d-md-down-none">
      <div style="height: 300px;"
      :style="{ top : menuPositionY + 'px'}"
      class="menu-ctn pt-4 pr-2"
      :class="{fixed: menuPositionY == 70}">
        <b-nav v-b-scrollspy:proj-content.100>
            <b-nav-item class="menu-item title-nav-item"
            :class="{'first-menu-item': item.level === 'first','sub-menu-item': item.level !== 'first','sub-title-nav-item': item.level !== 'first'}"
            v-for="(item, index) in titleArray" :key="index" 
            :href="'#' + item.id"
            @click="jumpTo(item.id, $event)"
            >
            {{item.title}}
            </b-nav-item>
        </b-nav>
      </div>

    </div>

    <section class="clear" ref="bottomFooter" >
      <AppFooter/>
    </section>
  </section>
</template>
<script>
import bus from '@/router/bus'

import { Footer as AppFooter } from '../components/'

import categoryConfig from '../config/category'

import Vue from 'vue'
// import Scrollspy, { Easing } from 'vue2-scrollspy'
// use default options
// Vue.use(Scrollspy)
// const scrollspyOptions = {
//   easing: Easing.Cubic.In,
//   offset: 120
// }
// or custom options
// Vue.use(Scrollspy, scrollspyOptions)

import vBScrollspy from 'bootstrap-vue/es/directives/scrollspy/scrollspy'

Vue.directive('b-scrollspy', vBScrollspy)
export default {
  name: 'project',
  components: {
    AppFooter
  },
  // props: ['scrollTop'],
  data: function () {
    return {
      showMobileProgress: false,
      totalHeight: 1200,
      readingProgress: 1,
      section: 0,
      scrollTop: 0,
      position: {},
      menuPositionInitY: 600,
      menuPositionY: 600,
      isDetailLoading: true,
      titleArray: [],
      activeTitle: 1,
      articleDetail: {
        content: '',
        theme_color: '#000000'
      },
      categoryConfig: categoryConfig,
      carouselWidth: 0
    }
  },
  created () {
    console.log('Name or Uuid')
    bus.$emit('header-go-black', 'white')
    this.getArticleDetail()
    document.body.classList.add('sidebar-hidden')
  },
  mounted () {
    const that = this
    document.body.querySelector('.logo').classList.add('active')
    window.addEventListener('resize', function () {
      that.setSize()
    }, false)
    this.totalHeight = this.$refs.bottomFooter.offsetTop
  },
  watch: {
    scrollTop (now, prev) {
      if (now < this.menuPositionInitY - 70) {
        this.menuPositionY = this.menuPositionInitY - now
      } else {
        this.menuPositionY = 70
      }
    }
  },
  methods: {
    jumpTo: function (idx, event) {
      // preventDefaul()
      let ele = this.$refs.projectPage.querySelector(`#${idx}`)
      if (ele.offsetTop > 0) {
        // https://developer.mozilla.org/en-US/docs/Web/API/Window/scrollTo
        this.$refs.projectPage.scrollTo({
          top: ele.offsetTop - 100,
          behavior: 'smooth'
        })
      }
      event.preventDefault()
    },
    testJump: function (params) {
      this.$scrollTo(5)
    },
    setSize: function () {
      if (this.$refs.imageCarousel && this.$refs.imageCarousel.length > 0) {
        this.carouselWidth = this.$refs.imageCarousel[0].$el.clientWidth
      }
    },
    onScroll: function (e, position) {
      this.position = position
      this.scrollTop = position.scrollTop
      let distance = this.position.scrollTop - this.previousTop
      if (distance > 20) {
        bus.$emit('animate-info', {
          isShow: true,
          scrollUp: false,
          headerActive: false
        })
      } else if (distance < -80) {
        bus.$emit('animate-info', {
          isShow: true,
          scrollUp: true,
          headerActive: true
        })
      }
      if (this.position.scrollTop < 20) {
        bus.$emit('animate-info', {
          isShow: true,
          scrollUp: true,
          headerActive: true
        })
      }
      let articleTop = document.body.querySelector('.article-content').offsetTop
      this.showMobileProgress = (articleTop - position.scrollTop - 10) < 0
      this.readingProgress = position.scrollTop * 100 / this.totalHeight
      this.previousTop = this.position.scrollTop
    },
    getArticleDetail () {
      this.isDetailLoading = true
      let uuid = this.$router.history.current.params.uuid
      this.Http.SimpleGet(`sun-create/article/${uuid}/`).then(res => {
        this.articleDetail = res
        setTimeout(() => {
          let promiseTitle = this.formatTitleMenu(res.title)
          let promiseContent = this.formatContentNode()
          Promise.all([promiseTitle, promiseContent]).then(res => {
            this.isDetailLoading = false
            this.setSize()
          })
        }, 200)
      })
    },
    formatContentNode () {
      let content = this.$refs.content
      this.articleDetail.contentArr = this.Utils.formatProject(content.childNodes)
      let that = this
      setTimeout(() => {
        that.totalHeight = this.$refs.bottomFooter.offsetTop - window.innerHeight
      }, 1000)
      console.log('contentArr - \n', this.articleDetail.contentArr)
    },
    // titleList: this.formatTitleMenu(item.content)
    formatTitleMenu (title) {
      let content = this.$refs.content

      let titleArr = content.querySelectorAll('h1, h2, h3, h4')
      console.log('titleArr - \n', titleArr)
      this.titleArray = []
      let titleIndex = -1
      let subtitleIndex = -1
      titleArr.forEach((element, index) => {
        element.id = `title-${index}`
        console.log(element, element.tagName)
        // console.log(element.textContent)
        let tagObj = {
          index: element.id,
          title: element.textContent
        }
        switch (element.tagName.toLowerCase()) {
          case 'h1':
            titleIndex++
            subtitleIndex = -1
            tagObj.level = 'first'
            tagObj.id = `title-${titleIndex}`
            break
          case 'h2':
            subtitleIndex++
            tagObj.level = 'second'
            tagObj.id = `title-${titleIndex}-${subtitleIndex}`
            break
          case 'h3':
            titleIndex++
            subtitleIndex = -1
            tagObj.level = 'first'
            tagObj.id = `title-${titleIndex}`
            break
          case 'h4':
            subtitleIndex++
            tagObj.level = 'second'
            tagObj.id = `title-${titleIndex}-${subtitleIndex}`
            break
          default:
            break
        }
        this.titleArray.push(tagObj)

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
<style lang="scss">
  .main .container-fluid {
    padding: 0;
    overflow-x: hidden;
  }
  section.page-project {
    height: 100vh;
    overflow: auto;
    overflow-x: hidden;
  }
  .active-header section.page-project {
    height: calc(100vh - 66px);
  }
</style>

<style lang="scss" scoped>
  $project-header-height: 530px;

  .left-col {
      // width: calc(100% - 270px);
      width: 77%;
      float: left;
  }
  .right-col {
      width: 23%;
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
      overflow: hidden;

      display: flex;
      align-items: center;
      justify-content: center;
  }
  .left-col>img {
      min-width: 300px;
      max-width: 100%;
      margin-left: auto;
      margin-right: auto;
      width: 100%;
      text-align: center;
      vertical-align: middle;
      width: 100%;
      height: 100%;
      object-fit: cover;
  }
  .right-col>.color-pattern {
      border-left: 24px solid white;
      background: black;
      height: 100%;
      display: block;
      width: 100%;
  }
  .proj-content {
    position: relative;
  }
  .article-content {
    min-height: 100vh;
    padding-bottom: 150px;
    padding-left:10%;
  }

  .menu-ctn {
    display: block;
    margin-top: 70px;    
    transition: all 200ms ease;
    margin-left: 30px;
    width: calc(100% - 30px);
    &.fixed {
      position: fixed;
      left: 77%;
      top: 70px;
      width: 20%;
      margin-top: 0;
    }
  }
  @media (max-width: 991px) {
    .left-col {
        width: 100%;
        float: left;
    }
    figure.left-col {
      background: black;
      display: flex;
      align-items: center;
      justify-content: center;
      line-height: 200px;
      overflow: hidden;
    }
    .menu-ctn {
      display: none;
    }
    .article-content {
      padding-left: 5px;
      padding-right: 5px;
      padding-bottom: 30px;
    }
  } 
  @media (max-width: 767px) {
    .header {
      height: 284px;
    }
  }
  .clear {
    clear: both;
  }
</style>
<style lang="scss">
  @import '../style/project.scss';
</style>
<style lang="scss">
  a.nav-link {
    .title-nav-item & {
      color: rgba(1, 0, 0, 0.6);
    }
    .sub-title-nav-item & {
      color: rgba(94, 94, 94, 0.6);
    }

    .title-nav-item &.active {
      color: var(--current-theme-color) !important;
    }

    .title-nav-item &:hover {
      color: var(--current-theme-color) !important;
    }
    .title-nav-item &.active{
      color: var(--current-theme-color) !important;
    }

    .sub-title-nav-item &.active{
      color: var(--current-theme-color) !important;
    }
    .first-menu-item &.active::before {
      background-color: var(--current-theme-color) !important;
    }
  }

  .project-progress {
    width: 100%;
    height: 3px;
    position: fixed;
    top: 0;
    z-index: 1111;
    background-color: white;
  }
  .project-progress-inner {
    border-top-right-radius: 5px;
    border-bottom-right-radius: 5px;
    height: 100%;
    background-color: var(--current-theme-color) !important;
    transition: all 100ms ease;
  }
</style>