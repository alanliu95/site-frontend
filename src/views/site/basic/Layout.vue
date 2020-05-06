<template>
  <section class="app-container">
    <!--        <div class="container">-->
<!--    <div class="columns">-->
<!--      &lt;!&ndash; app-left &ndash;&gt;-->
<!--      <div class="column is-12">-->
<!--        <basic-content></basic-content>-->
<!--      </div>-->
<!--      &lt;!&ndash; app-right &ndash;&gt;-->
<!--      <div class="column is-4">-->
<!--        <site-map></site-map>-->
<!--      </div>-->
<!--    </div>-->
    <h1 style="font-size:40px; margin:5px ">{{this.$store.getters['site/name']}}</h1>
      <el-row style="margin-top: 3px ">
        <el-col :span="15" style="margin: 5px"><basic-content></basic-content></el-col>
        <el-col :span="8"><site-map></site-map></el-col>
      </el-row>


    <!--        </div>-->
  </section>
</template>

<script>
  import BasicContent from './Content.vue'
  import SiteMap from './SiteMap.vue'
  export default {
    components: {BasicContent,SiteMap},
    data() {
      return {};
    },
  }
</script>

<style>
  body {
    background-color: #fdfdfd;
    font-family: "Segoe UI", Arial, Helvetica, "Microsoft Jhenghei",
    "Hiragino Sans GB", "WenQuanYi Zen Hei", "Microsoft Yahei",
    SimHei, STHeiti, "WenQuanYi Micro Hei", sans-serif;
  }

  .app-layout {
    padding-top: 1rem;
    padding-bottom: 1rem;
  }
</style>
