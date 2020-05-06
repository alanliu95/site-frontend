<template>
  <div class="app-container">

    <el-row>

      <el-col :span="12" style="font-size: 18px">
        <el-row style="font-size: 18px;margin-bottom: 10px">树莓派，卡片式电脑，项目用作MQTT设备模拟器</el-row>
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
            <div class="grid-content bg-purple-light">{{'东经'+longitude+','+'北纬'+latitude}}</div>
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
            <div class="grid-content bg-purple">鉴权方式：</div>
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


      <el-col :span="12">
        <div id="status-echarts" :style="{width: '600px', height: '400px'}"></div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  export default {
    name: "Status",
    data() {
      let obj = {
        "name": "pi",
        "state": true,
        "token": "pi",
        "devType": "树莓派",
        "location": "实验七楼实验桌",
        "longitude": 121.421,
        "latitude": 31.146,
        "info": "树莓派",
        "id": 5,
        "siteId": 1,
        myData: [],
        option: {
          title: {
            text: '实时数据'
          },
          tooltip: {
            trigger: 'axis',
            formatter: function (params) {
              params = params[0];
              var date = new Date(params.name);
              return date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear() + ' : ' + params.value[1];
            },
            axisPointer: {
              animation: false
            }
          },
          xAxis: {
            type: 'time',
            splitLine: {
              show: false
            }
          },
          yAxis: [
            {
              type: 'value',
              name: '数值',
              min: 0,
              max: 100,
              interval: 10,
              // axisLabel: {
              //   formatter: '{value} %'
              // }
            },
          ],
          series: [{
            name: '模拟数据',
            type: 'line',
            showSymbol: false,
            hoverAnimation: false,
            // data: myData
          }]
        },

        now: new Date(2019, 12, 3),
        // oneDay: 24 * 3600 * 1000,
         oneDay: 60 * 1000,
        value: Math.random() * 50
      }
      return obj
    },
    methods: {
      randomData() {
        this.now = new Date(+this.now + this.oneDay);
        this.value = this.value + Math.random() * 21 - 10;
        return {
          name: this.now.toString(),
          value: [
            [this.now.getFullYear(), this.now.getMonth() + 1, this.now.getDate()].join('/')
             + " " + this.now.getHours()+":"+this.now.getMinutes()+":"+this.now.getSeconds(),
            // '2016/12/18 6:38:08',
            Math.round(this.value)
          ]
        };
      },
      initEcharts() {
        this.option.series[0].data = this.myData
        var myChart2 = this.$echarts.init(document.getElementById('status-echarts'))
        for (let i = 0; i < 10; i++) {
          this.myData.push(this.randomData());
        }
        myChart2.setOption(this.option)
        var vmPoint = this;
        // setInterval(function() {
        //
        //     for (var i = 0; i < 5; i++) {
        //       vmPoint.myData.shift();
        //       vmPoint.myData.push(vmPoint.randomData());
        //     }
        //
        //     myChart.setOption({
        //       series: [{
        //         data: vmPoint.myData
        //       }]
        //     });
        //   }, 1000
        // )
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
