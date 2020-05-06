<template>
  <div class="app-container">

    <el-row style="font-size: 18px">

      <el-col :span="12" style="font-size: 18px;padding-right: 5px">
        <el-row style="font-size: 18px;margin-bottom: 10px">树莓派，卡片式电脑，基于ARM架构设计。运行Linux操作系统。项目用作MQTT设备模拟器</el-row>
        <el-row style="font-size: 18px">
          <el-col :span="4">
            <div class="grid-content bg-purple">设备名：</div>
          </el-col>
          <el-col :span="8">
            <div class="grid-content bg-purple-light">{{name}}</div>
          </el-col>
          <el-col :span="4">
            <div class="grid-content bg-purple">状态：</div>
          </el-col>
          <el-col :span="8">
            <div class="grid-content bg-purple-light">{{state?'在线':'离线'}}</div>
          </el-col>
        </el-row>

        <el-row style="font-size: 18px">
          <el-col :span="4">
            <div class="grid-content bg-purple">位置：</div>
          </el-col>
          <el-col :span="8">
            <div class="grid-content bg-purple-light">{{location}}</div>
          </el-col>
          <el-col :span="4">
            <div class="grid-content bg-purple">地理坐标：</div>
          </el-col>
          <el-col :span="8">
            <div class="grid-content bg-purple-light" style="font-size: 16px">{{'东经'+longitude+','+'北纬'+latitude}}</div>
          </el-col>
        </el-row>

        <el-row style="margin-top: 10px">设备连接信息</el-row>
        <el-row style="font-size: 18px">
          <el-col :span="4">
            <div class="grid-content bg-purple">接入协议：</div>
          </el-col>
          <el-col :span="8">
            <div class="grid-content bg-purple-light">MQTT</div>
          </el-col>
          <el-col :span="4">
            <div class="grid-content bg-purple">认证方式：</div>
          </el-col>
          <el-col :span="8">
            <div class="grid-content bg-purple-light">令牌</div>
          </el-col>
        </el-row>

        <el-row style="font-size: 18px">
          <el-col :span="4">
            <div class="grid-content bg-purple">授权方式：</div>
          </el-col>
          <el-col :span="8">
            <div class="grid-content bg-purple-light">ACLs</div>
          </el-col>
          <el-col :span="4">
            <div class="grid-content bg-purple">权限：</div>
          </el-col>
          <el-col :span="8">
            <div class="grid-content bg-purple-light">(/site/data,W)(/site/status,RW)</div>
          </el-col>
        </el-row>
      </el-col>


      <el-col :span="12" >
        <el-row >
          数据源：<el-select v-model="dataSource" placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
        </el-row>

        <div id="status-echarts" :style="{width: '600px', height: '400px'}" ></div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  export default {
    name: "Status",
    data() {
      let obj = {
        dataSource:"温度",
        options: [
          {value: "temp", label: "温度"},
          {value: "cpu", label: "CPU利用率"},
          {value: "mem", label: "内存利用率"}],
        value: '',
        "name": "pi",
        "state": true,
        "token": "pi",
        "devType": "树莓派",
        "location": "实验七楼服务器机柜",
        "longitude": 121.421,
        "latitude": 31.146,
        "info": "树莓派",
        "id": 5,
        "siteId": 1,
        myData: [],
        option: {
          // title: {
          //   text: '实时数据'
          // },
          // tooltip: {
          //   trigger: 'axis',
          //   formatter: function (params) {
          //     params = params[0];
          //     var date = new Date(params.name);
          //     return date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear() + ' : ' + params.value[1];
          //   },
          //   axisPointer: {
          //     animation: false
          //   }
          // },
          xAxis: {
            type: 'category',
            data: ['13:01:20', '13:01:22', '13:01:24', '13:01:26', '13:01:28',
              '13:01:30', '13:01:32', '13:01:34', '13:01:36'],
            // splitLine: {
            //   show: false
            // }
          },
          backgroundColor: '#d3dce6',
          yAxis: [
            {
              type: 'value',
              // name: '数值',
              // min: 10,
              // max: 30,
              // interval: 1,
              // axisLabel: {
              //   formatter: '{value} %'
              // }
            },
          ],
          series: [{
            name: '模拟数据',
            type: 'line',
            data: [20.0, 20.9, 20.4, 20.32, 20.52, 20.72, 20.22, 20.72, 20.32]
            // showSymbol: false,
            // hoverAnimation: false,
            // data: myData
          }]
        },
      }
      return obj
    },
    methods: {

      initEcharts() {

        var myChart2 = this.$echarts.init(document.getElementById('status-echarts'))
        myChart2.setOption(this.option)

      }
    },
    mounted() {
      this.initEcharts()
    }
  }
</script>

<style scoped>
  .el-row {
    margin-bottom: 1px;

  &
  :last-child {
    margin-bottom: 0;
  }

  }
  .el-col {
    border-radius: 4px;
  }

  .bg-purple-dark {
    background: #99a9bf;
  }

  .bg-purple {
    background: #d3dce6;
  }

  .bg-purple-light {
    background: #e5e9f2;
  }

  .grid-content {
    border-radius: 2px;
    min-height: 36px;
  }

  .row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
  }
</style>
