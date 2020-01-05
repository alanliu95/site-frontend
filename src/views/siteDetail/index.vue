<template>
  <div class="app-container">
    <!--    <el-button @click="setSite">1222</el-button>-->
    <!--    <div v-if="loaded">-->
    <!--      <div>{{ site.name }}</div>-->
    <!--    </div>-->
<!--    <el-button @click="setSite">1222</el-button>-->
    <h2>{{ site.name }}</h2>
    <div>id：{{ site.id }}</div>
    <div>经度：{{ site.longitude }}</div>
    <div>纬度：{{ site.latitude }}</div>
<!--    <router-link to="/devices/info">设备</router-link>-->
<!--    <router-link to="/location/files">文件</router-link>-->
  </div>
</template>

<script>
export default {
  name: 'SiteDetail',
  data() {
    return {
      // site: {}
    }
  },
  computed: {
    site: function() {
      return this.$store.state.site.site
    }
  },
  methods: {
    // setSite() {
    //   this.site = { id: 1, name: '华理实验七楼', longitude: 121.421, latitude: 31.421 }
    // }
  },
  // mounted() {
  //   alert('siteDetail 视图组件被加载')
  // },
}
</script>

<style scoped>

</style>
