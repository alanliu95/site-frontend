<template>
  <div class="app-container">
    <el-row>
      <el-col :span="15" style="margin-left: 2px">
        <el-form :inline="true" :model="filters" :size="size">
          <el-form-item label="污染物名称">
            <el-select v-model="filters.names" placeholder="请选择">
              <el-option label="重金属和无机物" value="重金属和无机物"></el-option>
              <el-option label="多环芳烃" value="多环芳烃"></el-option>
              <el-option label="苯系物" value="苯系物"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="污染物类型">
            <el-select v-model="filters.type" placeholder="请选择">
              <el-option label="重金属和无机物" value="重金属和无机物"></el-option>
              <el-option label="多环芳烃" value="多环芳烃"></el-option>
              <el-option label="苯系物" value="苯系物"></el-option>
            </el-select>
          </el-form-item>

          <el-form-item>
            <el-button icon="fa fa-search" label="查找" type="primary" @click="myAlert('未实现')">
              查找
            </el-button>
          </el-form-item>
        </el-form>
        <el-table :data="pageResult.content" :highlight-current-row="highlightCurrentRow"
                  element-loading-text="加载" :border="border" :stripe="stripe"
                  :show-overflow-tooltip="showOverflowTooltip" :max-height="maxHeight" :height="height" :size="size"
                  :align="align" style="width:100%;">
          <el-table-column v-for="column in filterColumns" header-align="center" align="center"
                           :prop="column.prop" :label="column.label" :width="column.width" :min-width="column.minWidth"
                           :fixed="column.fixed" :key="column.prop" :type="column.type" :formatter="column.formatter"
                           :sortable="column.sortable==null?true:column.sortable">
          </el-table-column>
<!--          <el-table-column label="操作" width="185" fixed="right" header-align="center" align="center">-->
<!--            <template slot-scope="scope">-->
<!--              <div>-->
<!--                <el-button icon="fa fa-edit" :size="size">编辑</el-button>-->
<!--                <el-button icon="fa fa-trash" :size="size" type="danger">删除</el-button>-->
<!--              </div>-->
<!--            </template>-->
<!--          </el-table-column>-->
        </el-table>
      </el-col>
      <el-col :span="8">
        <div id="myecharts"  :style="{width: '600px', height: '400px'}"></div>
        <div id="myecharts2"  :style="{width: '600px', height: '400px'}"></div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  export default {
    name: "Evaluation",
    data() {
      return {
        size: 'small',
        filters: {
          names:[],
          type:""
        },
        filterColumns: [
          {prop: "id", label: "ID", minWidth: 50},
          {prop: "pointid", label: "采样点ID", minWidth: 50},
          {prop: "name", label: "名称", minWidth: 80},
          {prop: "cas", label: "CAS编号", minWidth: 80},
          {prop: "type", label: "类型", minWidth: 80},
          {prop: "concentration", label: "浓度", minWidth: 50},
          {prop: "unit", label: "单位", minWidth: 50},
          {prop: "screeningVal", label: "筛选值", minWidth: 80},
          {prop: "controlVal", label: "管制值", minWidth: 80}
        ],
        pageResult: {
          "pageNum": 1,
          "pageSize": 8,
          "totalSize": 60,
          "content": [
            {
              "id": 1,
              "pointid": 1,
              "name": "砷",
              "cas": "7440-38-2",
              "concentration": 35.0,
              "controlVal": 140.0,
              "screeningVal": 60.0,
              "unit": "mg/kg",
              "type": "重金属和无机物"
            }, {
              "id": 2,
              "pointid": 1,
              "name": "镉",
              "cas": "7440-43-9",
              "concentration": 55.0,
              "controlVal": 172.0,
              "screeningVal": 65.0,
              "unit": "mg/kg",
              "type": "重金属和无机物"
            }, {
              "id": 3,
              "pointid": 1,
              "name": "铬",
              "cas": "18540-29-9",
              "concentration": 6.0,
              "controlVal": 78.0,
              "screeningVal": 5.7,
              "unit": "mg/kg",
              "type": "重金属和无机物"
            }, {
              "id": 4,
              "pointid": 1,
              "name": "铜",
              "cas": "7440-50-8",
              "concentration": 7500.0,
              "controlVal": 36000.0,
              "screeningVal": 18000.0,
              "unit": "mg/kg",
              "type": "重金属和无机物"
            }, {
              "id": 5,
              "pointid": 1,
              "name": "甲苯",
              "cas": "108-88-3",
              "concentration": 1300.0,
              "controlVal": 1200.0,
              "screeningVal": 1200.0,
              "unit": "mg/kg",
              "type": "苯系物"
            }, {
              "id": 6,
              "pointid": 1,
              "name": "间二甲苯",
              "cas": "108-38-3",
              "concentration": 600.0,
              "controlVal": 570.0,
              "screeningVal": 570.0,
              "unit": "mg/kg",
              "type": "苯系物"
            }, {
              "id": 7,
              "pointid": 1,
              "name": "对二甲苯",
              "cas": "106-42-3",
              "concentration": 475.0,
              "controlVal": 570.0,
              "screeningVal": 570.0,
              "unit": "mg/kg",
              "type": "苯系物"
            }, {
              "id": 8,
              "pointid": 1,
              "name": "乙苯",
              "cas": "100-41-4",
              "concentration": 30.0,
              "controlVal": 280.0,
              "screeningVal": 28.0,
              "unit": "mg/kg",
              "type": "苯系物"
            },
            // {
            //   "id": 9,
            //   "pointid": 1,
            //   "name": "萘",
            //   "cas": "91-20-3",
            //   "concentration": 75.0,
            //   "controlVal": 700.0,
            //   "screeningVal": 70.0,
            //   "unit": "mg/kg",
            //   "type": "多环芳烃"
            // }, {
            //   "id": 10,
            //   "pointid": 1,
            //   "name": "䓛",
            //   "cas": "91-20-3",
            //   "concentration": 1250.0,
            //   "controlVal": 12900.0,
            //   "screeningVal": 1293.0,
            //   "unit": "mg/kg",
            //   "type": "多环芳烃"
            // }
          ]
        }, //请求结果
        align: {  // 文本对齐方式
          type: String,
          default: 'left'
        },
        maxHeight: {  // 表格最大高度
          type: Number,
          default: 500
        },
        height: {  // 表格最大高度
          type: Number,
          default: 250
        },
        // showOperation: {  // 是否显示操作组件
        //   type: Boolean,
        //   default: true
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
      myAlert(msg) {
        alert(msg);
      },
      echartsTest() {
        // 基于准备好的dom，初始化echarts实例
        var myChart = this.$echarts.init(document.getElementById('myecharts'));
        // 绘制图表
        let option1={
          title: {
            text: '污染物浓度统计'
          },
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'cross',
              crossStyle: {
                color: '#999'
              }
            }
          },
          toolbox: {
            feature: {
              dataView: {show: true, readOnly: true},
              magicType: {show: true, type: ['line', 'bar']},
              restore: {show: true},
              saveAsImage: {show: true}
            }
          },
          legend: {
            data: ['检出率', '超标率', '最大超标倍数']
          },
          xAxis: [
            {
              type: 'category',
              data: ['萘', '䓛', '甲苯', '乙苯','苯并[a]蒽', '苯并[a]芘'],
              axisPointer: {
                type: 'shadow'
              }
            }
          ],
          yAxis: [
            {
              type: 'value',
              name: '百分比',
              min: 0,
              max: 100,
              interval: 10,
              axisLabel: {
                formatter: '{value} %'
              }
            },
            {
              type: 'value',
              name: '倍数',
              min: 0,
              max: 10,
              interval: 1,
              axisLabel: {
                formatter: '{value}'
              }
            }
          ],
          series: [
            {
              name: '超标率',
              type: 'bar',
              data: [2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 35.6, 62.2, 32.6, 20.0, 6.4, 3.3]
            },
            {
              name: '检出率',
              type: 'bar',
              data: [2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 75.6, 82.2, 48.7, 18.8, 6.0, 2.3]
            },
            {
              name: '最大超标倍数',
              type: 'bar',
              yAxisIndex: 1,
              data: [2.0, 2.2, 3.3, 4.5, 6.3, 1.2, 2.3, 3.4, 3.0, 6.5, 2.0, 6.2]
            }
          ],
          backgroundColor: '#eee7e1'
        }
        myChart.setOption(option1)


        // 基于准备好的dom，初始化echarts实例
        //var myChart2 = this.$echarts.init(document.getElementById('myecharts2'));
        // 绘制图表
        let option2={
          title: {
            text: '污染物浓度统计'
          },
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'cross',
              crossStyle: {
                color: '#999'
              }
            }
          },
          toolbox: {
            feature: {
              dataView: {show: true, readOnly: true},
              magicType: {show: true, type: ['line', 'bar']},
              restore: {show: true},
              saveAsImage: {show: true}
            }
          },
          legend: {
            data: ['检出率', '超标率', '最大超标倍数']
          },
          xAxis: [
            {
              type: 'category',
              data: ['萘', '䓛', '甲苯', '乙苯','苯并[a]蒽', '苯并[a]芘'],
              axisPointer: {
                type: 'shadow'
              }
            }
          ],
          yAxis: [
            {
              type: 'value',
              name: '百分比',
              min: 0,
              max: 100,
              interval: 10,
              axisLabel: {
                formatter: '{value} %'
              }
            },
            {
              type: 'value',
              name: '倍数',
              min: 0,
              max: 10,
              interval: 1,
              axisLabel: {
                formatter: '{value}'
              }
            }
          ],
          series: [
            {
              name: '超标率',
              type: 'bar',
              data: [2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 35.6, 62.2, 32.6, 20.0, 6.4, 3.3]
            },
            {
              name: '检出率',
              type: 'bar',
              data: [2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 75.6, 82.2, 48.7, 18.8, 6.0, 2.3]
            },
            {
              name: '最大超标倍数',
              type: 'bar',
              yAxisIndex: 1,
              data: [2.0, 2.2, 3.3, 4.5, 6.3, 1.2, 2.3, 3.4, 3.0, 6.5, 2.0, 6.2]
            }
          ],
          backgroundColor: '#eee7e1'
        }
        //myChart2.setOption(option2)
      }
    },
    mounted() {
      this.echartsTest()
    }
  }
</script>

<style scoped>

</style>
