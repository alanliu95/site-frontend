<template>
  <div>
    <el-popover
      v-model="visible"
      placement="bottom"
      width="160"
    >
      <p>重新选取场地？</p>
      <div style="text-align: right; margin: 0">
        <el-button size="mini" type="text" @click="visible = false">否</el-button>
        <el-button type="primary" size="mini" @click="reset">是</el-button>
      </div>
      <el-button slot="reference" type="primary" >
        {{ Object.keys(this.$store.state.site.name).length===0?'未选定场地':this.$store.state.site.name }}
<!--        {{ this.$store.state.site.name==''?'未选定场地':this.$store.state.site.name }}-->
      </el-button>
    </el-popover>
  </div>
</template>

<script>
export default {
  name: 'Index',
  data() {
    return {
      visible: false
    }
  },
  methods: {
    reset() {
      this.visible = false
      this.$store.dispatch('site/setSite', {name:'',id:0}).then(() => {
      }).catch(() => {
        console.info('重置 store site obj失败')
      })
      this.$router.push('/select/index')
    }
  }
}
</script>

<style scoped>

</style>
