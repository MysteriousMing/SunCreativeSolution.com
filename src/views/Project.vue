<template>
  <section v-loading="isDetailLoading" class="page-project">
    <!-- image banner -->
    <section class="header">
        <figure class="left-col mb-0 pb-4">
            <img class="align-self-center" height="auto" width="100px"
            :src="articleDetail.header_image" alt="Header photos - title">
        </figure>
        <div class="right-col mb-0 d-md-down-none">
            <div class="color-pattern">
            </div>
        </div>
    </section>

    <!-- body -->
    <div class="left-col article-content">
      <h1>{{ articleDetail.title }}</h1>
      <br>
      <article v-if="articleDetail" 
      class="proj-content"
      ref="content"
      v-html="articleDetail.content"></article>
      <article v-else class="proj-content">
          <h1>ChemIsTry</h1>
          <p>Chemistry is the scientific discipline involved with compounds composed of atoms, i.e. elements, and molecules, i.e.
              combinations of atoms: their composition, structure, properties, behavior and the changes they undergo during a reaction
              with other compounds. Chemistry addresses topics such as how atoms and molecules interact via chemical bonds to form
              new chemical compounds. There are four types of chemical bonds: covalent bonds, in which compounds share one or more
              electron(s); ionic bonds, in which a compound donates one or more electrons to another compound to produce ions (cations
              and anions); hydrogen bonds; and Van der Waals force bonds.</p>
          <figure>
              <img width="100%" src="/static/images/project/img1.png" alt="image 1">
              <figcaption> ... </figcaption>
          </figure>
          <figure>
              <img width="100%" src="/static/images/project/img3.png" alt="image 2">
              <figcaption>pic 2 ...
              </figcaption>
          </figure>
          <p>Chemistry is the scientific discipline involved with compounds composed of atoms, i.e. elements, and molecules, i.e.
              combinations of atoms: their composition, structure, properties, behavior and the changes they undergo during a reaction
              with other compounds. Chemistry addresses topics such as how atoms and molecules interact via chemical bonds to form
              new chemical compounds. There are four types of chemical bonds: covalent bonds, in which compounds share one or more
              electron(s); ionic bonds, in which a compound donates one or more electrons to another compound to produce ions (cations
              and anions); hydrogen bonds; and Van der Waals force bonds.</p>
      </article>
    </div>
    <div class="right-col d-md-down-none">
      <div style="height: 300px;"
      class="pt-4 px-2">
        <el-steps direction="vertical" 
        :active="activeTitle">
          <el-step 
          v-for="(item, index) in titleArray" :key="index"
          :title="item.title" :description="item.subtitle"
          @click="gotoTitle(index)"></el-step>
        </el-steps>
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
  }
  .article-content {
      padding-top: 50px;
      padding-bottom: 150px;
      padding-left:10%;
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

export default {
  name: 'project',
  components: {
    AppFooter
  },
  data: function () {
    return {
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
    getArticleDetail () {
      this.isDetailLoading = true
      let uuid = this.$router.history.current.params.uuid
      this.Http.Get(`sun-create/article/${uuid}/`).then(res => {
        this.articleDetail = res
        this.isDetailLoading = false
        setTimeout(() => {
          this.formatTitleMenu()
        }, 1000)
      })
    },

    // titleList: this.formatTitleMenu(item.content)

    formatTitleMenu (richtext) {
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
      })
    },
    gotoTitle (index) {
      this.activeTitle = index + 1
      console.log('2333', this.titleArray[index].id)
    }
  }
}
</script>
