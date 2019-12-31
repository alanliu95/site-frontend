<template>
  <div>
    <h1>选择场地界面</h1>
    <el-select v-model="value" filterable placeholder="选择场地">
      <el-option
        v-for="item in options"
        :key="item.id"
        :label="item.name"
        :value="item.id">
      </el-option>
    </el-select>
    <div>场地id:{{value}}</div>
  </div>
</template>

<script>
  /* eslint-disable */
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
      }
    },
    // mounted: function() {
    //   this.getSites()
    // }
    watch: {
      $route: {
        handler: function(route) {
          console.info('当前route：', route.path)
          this.getSites()
        },
        immediate: true
      }
    }
  }
</script>

<style scoped>

</style>
