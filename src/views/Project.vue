<template>
  <section class="page-project">
    <!-- image banner -->
    <section class="header">
        <figure class="left-col mb-0 pb-4">
            <img class="align-self-center" height="auto" width="100px" src="/static/images/project/img2.png" alt="Header photos - title">
        </figure>
        <div class="right-col mb-0 d-md-down-none">
            <div class="color-pattern">
            </div>
        </div>
    </section>

    <!-- body -->
    <div class="left-col">
      <article class="proj-content">
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
    <div class="right-col d-md-down-none"></div>

  </section>
</template>
<style scoped>
  section.page-project {
    margin: 0 -30px;
  }
  .left-col {
      width: 80%;
      float: left;
  }
  .right-col {
      width: 20%;
      float: left;
  }
  .header {
      height: 720px;
  }
  .header .left-col, .header .right-col {
      height: 100%;
  }
  figure.left-col {
      background: black;
      display: block;
      line-height: 720px;
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
      margin-left:10%;
  }
</style>
<script>
  import categoryConfig from '../config/category'

  export default {
    name: 'project',
    components: {

    },
    data: function () {
      return {
        categoryConfig: categoryConfig
      }
    },
    created () {
      console.log('Name or Uuid')
      this.getArticleDetail()
    },
    mounted () {

    },
    methods: {
      getArticleDetail () {
        let uuid = this.$router.query.uuid
        console.log(uuid)
      }
    }
  }
</script>
