<template>
  <div>
    <h1>选择场地界面</h1>
    <el-select v-model="value" filterable placeholder="选择场地">
      <el-option
        v-for="item in options"
        :key="item.id"
        :label="item.name"
        :value="JSON.stringify(item)">
      </el-option>
    </el-select>
<!--    <div>场地:{{JSON.parse(value)}}</div>-->
    <el-button type="primary" @click="setSite">确定</el-button>
    <el-button type="primary" @click="resetSite">重置</el-button>
    <div>store:{{JSON.stringify(site)}}</div>
    <el-popconfirm
      confirmButtonText='是'
      cancelButtonText='否'
      icon="el-icon-info"
      iconColor="red"
      title="这是一段内容确定删除吗？"
    >
      <el-button slot="reference">删除</el-button>
    </el-popconfirm>
  </div>
</template>

<script>
/* eslint-disable */
  import { mapGetters } from 'vuex'
  import { getAllSites } from '../../api/site'

  export default {
    name: 'Location',
    data() {
      // var sites=null
      // getAllSites().then(response => {
      //   console.info(response)
      //   this.sites = response
      // }
      return {
        options: [],
        value: ''
      }
    },
    methods: {
      getSites: function() {
        getAllSites().then(response => {
          // console.info('~~~~~~~~~~~~~~~')
          // console.info(response)
          this.options = response.data
        })
      },
      setSite(){
        let siteObj= JSON.parse(this.value)
        this.$store.dispatch('site/setSite',siteObj).then(()=>{
          console.info('向store提交site成功')
          // console.info(store.state.site)
        }).catch(()=>{
          console.info('向store提交site失败')
        })
        // let currSite=JSON.parse(this.value)
        // console.info(JSON.stringify(currSite))
        // alert(currSite)
      },
      resetSite(){
        this.$store.dispatch('site/setSite',{}).then(()=>{
          console.info('重置 store site成功')
          // console.info(store.state.site)
        }).catch(()=>{
          console.info('重置 store site失败')
        })
      }
    },
    computed: {
      // ...mapGetters([
      //   'site'
      // ])
      site(){
        return Object.keys(this.$store.state.site.site).length===0?'选取场地':this.$store.state.site.site
      }
    },
    mounted: function() {
      this.getSites()
    }
    // watch: {
    //   $route: {
    //     handler: function(route) {
    //       console.info('当前route：', route.path)
    //       this.getSites()
    //     },
    //     immediate: true
    //   }
    // }
  }
</script>

<style scoped>

</style>
