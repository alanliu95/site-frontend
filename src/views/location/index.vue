<template>
  <div class="app-container">
    <h3>选择场地界面</h3>
    <el-select v-model="value" filterable placeholder="选择场地">
      <el-option
        v-for="item in options"
        :key="item.id"
        :label="item.name"
        :value="JSON.stringify(item)"
      />
    </el-select>
    <!--    <div>场地:{{JSON.parse(value)}}</div>-->
    <el-button type="primary" @click="setSite">确定</el-button>
    <div>store:{{ siteInfo }}</div>
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
        visible:true,
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
        if(this.value=='') return //未选择任何场地
        let siteObj= JSON.parse(this.value)
        this.$store.dispatch('site/setSite',siteObj).then(()=>{
          console.info('向store提交site成功')
          // console.info(store.state.site)
          this.$notify({
            title: '选取场地',
            message:'操作成功',
            type: 'success',
            position: 'top-right',
            offset: 50
          })
        }).catch(()=>{
          console.info('向store提交site失败')
        })
        // let currSite=JSON.parse(this.value)
        // console.info(JSON.stringify(currSite))
        // alert(currSite)
      },
      open() {
        this.$notify({
          title: '选取场地',
          message:'操作成功',
          type: 'success',
          position: 'bottom-right'
        });
      }
    },
    computed: {
      // ...mapGetters([
      //   'site'
      // ])
      siteInfo(){
        return this.$store.state.site.name==''?'选取场地':this.$store.state.site.name+' siteId'+this.$store.state.site.id
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
