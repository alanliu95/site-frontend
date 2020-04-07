<template>
  <div class="app-container">
    <div>
      <h1>{{$store.state.site.name}}</h1>
    </div>
    <div style="width: 800px">
      <el-table :data="devices" stripe border style="width: 100%">
        <el-table-column prop="siteId" label="siteId" width="80"></el-table-column>
        <el-table-column prop="id" label="id" width="80"></el-table-column>
        <el-table-column prop="name" label="name" width="180"></el-table-column>
        <el-table-column prop="token" label="令牌"></el-table-column>
        <el-table-column prop="devTypeName" label="设备类型"></el-table-column>
        <el-table-column prop="info" label="info"></el-table-column>
        <el-table-column prop="online" label="online"></el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
  import { getTarSiteDevices, getTarSiteDeviceStatus } from '../../api/device'

  export default {
    name: 'index',
    data() {
      return {
        devices: [],
        temp: {}
      }
    },
    created() {
      this.request(this.$store.getters['site/id'])
      // getTarSiteDevices(this.$store.state.site.id).then(response => { //这里的response是响应请求的body字段
      //   this.temp = response.data
      //   getTarSiteDeviceStatus(this.$store.state.site.id).then(body => {
      //     let status = body.data
      //     let detail = JSON.parse(JSON.stringify(this.temp)) //对象深拷贝
      //     for (let i = 0, len = detail.length; i < len; i++) {
      //       let deviceId = detail[i].id
      //       if (status[deviceId] == undefined) {
      //         detail[i]['online'] = null
      //       } else {
      //         detail[i]['online'] = JSON.stringify(status[deviceId])
      //       }
      //     }
      //     this.devices = detail
      //   }).catch((err) => {
      //     console.error(err)
      //   })
      // }).catch((err) => {
      //   console.error(err)
      // })
    },
    methods: {
      request(siteId) {
        getTarSiteDevices(siteId).then(response => { //这里的response是响应请求的body字段
          this.temp = response.data
          return getTarSiteDeviceStatus(siteId)
        }).then(body => {
          let status = body.data
          let detail = JSON.parse(JSON.stringify(this.temp)) //对象深拷贝
          for (let i = 0, len = detail.length; i < len; i++) {
            let deviceId = detail[i].id
            if (status[deviceId] == undefined) {
              detail[i]['online'] = null
            } else {
              detail[i]['online'] = JSON.stringify(status[deviceId])
            }
          }
          this.devices = detail
        }).catch((err) => {
          console.error(err)
        })
      }
    }
  }

  // {
  //   "id": 1,
  //   "siteId": 1,
  //   "name": "desktop-alan",
  //   "token": "123456",
  //   "devType": 1,
  //   "longitude": 31.146,
  //   "latitude": 121.421,
  //   "info": "windows10工作站"
  // },
</script>

<style scoped>

</style>
