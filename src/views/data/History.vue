<template>
  <div class="app-container">

        <!--工具栏-->
        <div style="float:left">
          <el-form :inline="true" :model="filters" :size="size">
            <el-form-item label="设备名称">
              <el-input v-model="filters.name" placeholder="pi"></el-input>
            </el-form-item>
            <el-form-item label="起始时间">
              <div class="block">
                <!--            <span class="demonstration">默认</span>-->
                <el-date-picker
                  v-model="filters.starting"
                  type="datetime"
                  placeholder="选择日期时间">
                </el-date-picker>
              </div>
            </el-form-item>
            <el-form-item label="结束时间">
              <div class="block">
                <!--            <span class="demonstration">带快捷选项</span>-->
                <el-date-picker
                  v-model="filters.ending"
                  type="datetime"
                  placeholder="选择日期时间"
                  align="right">
                </el-date-picker>
              </div>
            </el-form-item>
            <el-form-item>
              <el-button icon="fa fa-search" label="查找" type="primary" @click="myAlert('未实现')">
                查找
              </el-button>
            </el-form-item>
          </el-form>
        </div>
    <el-row>
      <el-col :span="12">
        <div>
          <!--表格栏-->
          <el-table :data="pageResult.content" :highlight-current-row=true
                    element-loading-text="加载" :border=true :stripe=true
                    :show-overflow-tooltip="showOverflowTooltip" :max-height=500 :size="size"
                    :align="align" style="width:100%;">
            <!--        <el-table-column type="selection" width="40"></el-table-column>-->
            <el-table-column v-for="column in filterColumns" header-align="center" align="center"
                             :prop="column.prop" :label="column.label" :width="column.width"
                             :min-width="column.minWidth"
                             :fixed="column.fixed" :key="column.prop" :type="column.type" :formatter="column.formatter"
                             :sortable="column.sortable==null?true:column.sortable">
            </el-table-column>
            <!--        <el-table-column label="操作" width="150" fixed="right" header-align="center" align="center">-->
            <!--          <template slot-scope="scope">-->
            <!--            <div>-->
            <!--              <el-button icon="fa fa-edit" :size="size">发送邮件</el-button>-->
            <!--            </div>-->
            <!--          </template>-->
            <!--        </el-table-column>-->
          </el-table>
          <!--分页栏-->
          <div class="toolbar" style="padding:10px;">
            <!--        <el-button :size="size" type="danger"-->
            <!--                   disabled="false" style="float:left;">批量删除-->
            <!--        </el-button>-->
            <el-pagination layout="total, prev, pager, next, jumper"
                           :current-page="pageRequest.pageNum" :page-size="pageRequest.pageSize"
                           :total="pageResult.totalSize" style="float:right;">
            </el-pagination>
          </div>
        </div>
      </el-col>
      <el-col :span="12">
<!--        <div :style="{width: '600px', height: '100px'}"></div>-->
        <div id="history-echarts" :style="{width: '600px', height: '500px'}"></div>
      </el-col>
    </el-row>

  </div>
</template>

<script>
  import {getUsersByPage} from "../../api/user";

  export default {
    name: 'History',
    data() {
      return {

        size: 'small',
        filters: {  //接收名字搜索栏的输入内容
          name:'',
          starting: '',
          ending: '',
        },
        columns: [], //ktable 可显示的所有列
        filterColumns: [],
        pageRequest: {pageNum: 1, pageSize: 8},
        pageResult: {
          "pageNum": 1,
          "pageSize": 8,
          "totalSize": 8,
          "content": [
            {
              "id": 15,
              "name": "pi",
              "temp": 20.25,
              "samplingTime": "2020-01-13 14:07:18",
            },
            {
              "id": 16,
              "name": "pi",
              "temp": 22.35,
              "samplingTime": "2020-01-13 14:07:20",
            },
            {
              "id": 17,
              "name": "pi",
              "temp": 22.75,
              "samplingTime": "2020-01-13 14:07:22",
            },
            {
              "id": 18,
              "name": "pi",
              "temp": 21.95,
              "samplingTime": "2020-01-13 14:07:24",
            },
            {
              "id": 19,
              "name": "pi",
              "temp": 22.34,
              "samplingTime": "2020-01-13 14:07:26",
            },
            {
              "id": 20,
              "name": "pi",
              "temp": 21.78,
              "samplingTime": "2020-01-13 14:07:28",
            },
            {
              "id": 21,
              "name": "pi",
              "temp": 23.12,
              "samplingTime": "2020-01-13 14:07:30",
            },
            {
              "id": 22,
              "name": "pi",
              "temp": 21.15,
              "samplingTime": "2020-01-13 14:07:32",
            },
            {
              "id": 23,
              "name": "pi",
              "temp": 23.04,
              "samplingTime": "2020-01-13 14:07:34",
            },
            {
              "id": 24,
              "name": "pi",
              "temp": 23.12,
              "samplingTime": "2020-01-13 14:07:36",
            },
          ]
        },
        option: {
          title: {
            left: 'center',
            text: '历史曲线',
          },
          dataZoom: [{
            type: 'inside',
            start: 0,
            end: 10
          }, {
            start: 0,
            end: 10,
            handleIcon: 'M10.7,11.9v-1.3H9.3v1.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4v1.3h1.3v-1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7V23h6.6V24.4z M13.3,19.6H6.7v-1.4h6.6V19.6z',
            handleSize: '80%',
            handleStyle: {
              color: '#fff',
              shadowBlur: 3,
              shadowColor: 'rgba(0, 0, 0, 0.6)',
              shadowOffsetX: 2,
              shadowOffsetY: 2
            }
          }],
          xAxis: {
            type: 'category',
            data: ['14:07:18', '14:07:20', '14:07:22', '14:07:24', '14:07:26',
              '14:07:28', '14:07:30', '14:07:32', '14:07:34','14:07:36'],
          },
          backgroundColor: '#eee7e1',
          yAxis: [{
              type: 'value',
            }],
          series: [{
            smooth: true,
            name: '模拟数据',
            type: 'line',
            data: [20.25, 22.35, 22.75, 21.95, 22.34,
              21.78, 23.12,21.15, 23.04, 23.12]
            // showSymbol: false,
            // hoverAnimation: false,
            // data: myData
          }]
        },
        selections: [],  // 列表选中列
        align: {  // 文本对齐方式
          type: String,
          default: 'left'
        },
        maxHeight: {  // 表格最大高度
          type: Number,
          default: 500
        },
        // height: {  // 表格最大高度
        //   type: Number,
        //   default: 250
        // },
        border: {  // 是否显示边框
          type: Boolean,
          default: true
        },
        stripe: {  // 是否显示斑马线
          type: Boolean,
          default: true
        },
        highlightCurrentRow: {  // // 是否高亮当前行
          type: Boolean,
          default: true
        },
        showOverflowTooltip: {  // 是否单行显示
          type: Boolean,
          default: true
        },
        showBatchDelete: {  // 是否显示操作组件
          type: Boolean,
          default: true
        }
      }
    },
    methods: {

      initEcharts() {

        var myChart = this.$echarts.init(document.getElementById('history-echarts'))
        myChart.setOption(this.option)

      },
      myAlert(msg) {
        alert(msg);
      },
      findPage: function (data) {
        //若为null 则是刷新请求
        if (data !== null) {
          this.pageRequest = data.pageRequest
        }
        getUsersByPage(this.pageRequest).then(res => {
          this.pageResult = res.data
        }).then(data != null ? data.callback : '')

      },
      // 处理表格列过滤显示
      initColumns: function () {
        this.columns = [
          {prop: "id", label: "ID", minWidth: 30},
          {prop: "name", label: "设备名", minWidth: 60},
          // {prop: "siteId", label: "场地ID", minWidth: 50},
          {prop: "samplingTime", label: "采样时间", minWidth: 60},
          {prop: "temp", label: "温度", minWidth: 60},
        ]
        this.filterColumns = JSON.parse(JSON.stringify(this.columns));
      }
    },
    mounted() {
      // this.findDeptTree()
      this.initColumns()
      this.initEcharts()
    }
  }
</script>

<style scoped>

</style>
