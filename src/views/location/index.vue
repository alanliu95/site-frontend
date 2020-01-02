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
    <button @click="setSite">确定</button>
    <div>store:{{site}}</div>
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
        this.$store.dispatch('site/setSite',this.value).then(()=>{
          console.info('向store提交site成功')
          // console.info(store.state.site)
        }).catch(()=>{
          console.info('向store提交site失败')
        })
        // let currSite=JSON.parse(this.value)
        // console.info(JSON.stringify(currSite))
        // alert(currSite)
      }
    },
    computed: {
      ...mapGetters([
        'site'
      ])
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
