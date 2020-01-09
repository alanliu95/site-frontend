<template>
  <div class="app-container">
    <!--    <el-button @click="setSite">1222</el-button>-->
    <!--    <div v-if="loaded">-->
    <!--      <div>{{ site.name }}</div>-->
    <!--    </div>-->
    <!--    <el-button @click="setSite">1222</el-button>-->
    <h2>{{this.$store.getters['site/name']}}</h2>
    <div>siteId：{{ this.$store.getters['site/id']}}</div>
    <div>{{name}}</div>
    <!--    <div>经度：{{ site.longitude }}</div>-->
    <!--    <div>纬度：{{ site.latitude }}</div>-->
    <!--    <router-link to="/device/info">设备</router-link>-->
    <!--    <router-link to="/location/files">文件</router-link>-->
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'

  export default {
    name: 'SiteDetail',
    data() {
      return {}
    },
    computed: {
      ...mapGetters([
        'name'
      ])
    }
  }
</script>

<style scoped>

</style>
