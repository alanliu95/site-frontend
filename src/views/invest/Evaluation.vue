<template>
  <div class="app-container">
    <el-row>
      <el-col :span="15" style="margin-left: 2px">
        <el-form :inline="true" :model="filters" :size="size">
          <el-form-item label="污染物名称">
            <el-input v-model="filters.names" placeholder="请输入">
            </el-input>
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
        <div id="myecharts"  :style="{width: '550px', height: '400px'}"></div>
<!--        <div id="myecharts2"  :style="{width: '600px', height: '400px'}"></div>-->
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="15" style="margin-left: 2px">
<!--        <el-form :inline="true" :model="filters" :size="size">-->
<!--          <el-form-item label="污染物名称">-->
<!--            <el-input v-model="filters.names" placeholder="请选择">-->
<!--              <el-option label="重金属和无机物" value="重金属和无机物"></el-option>-->
<!--              <el-option label="多环芳烃" value="多环芳烃"></el-option>-->
<!--              <el-option label="苯系物" value="苯系物"></el-option>-->
<!--            </el-input>-->
<!--          </el-form-item>-->
<!--          <el-form-item>-->
<!--            <el-button icon="fa fa-search" label="查找" type="primary" @click="myAlert('未实现')">-->
<!--              查找-->
<!--            </el-button>-->
<!--          </el-form-item>-->
<!--        </el-form>-->
        <el-table :data="pageResult2.content" :highlight-current-row="highlightCurrentRow"
                  element-loading-text="加载" :border="border" :stripe="stripe"
                  :show-overflow-tooltip="showOverflowTooltip" :max-height="maxHeight" :height="height" :size="size"
                  :align="align" style="width:100%;">
          <el-table-column v-for="column in filterColumns2" header-align="center" align="center"
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
        <div id="myecharts2"  :style="{width: '550px', height: '400px'}"></div>
        <!--        <div id="myecharts2"  :style="{width: '600px', height: '400px'}"></div>-->
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
          type:"苯系物"
        },
        filterColumns: [
          {prop: "name", label: "污染物名称", minWidth: 60},
          {prop: "type", label: "类型", minWidth: 40},
          {prop: "range", label: "浓度范围(mg/kg)", minWidth: 80,sortable:false},
          {prop: "detection_ratio", label: "检出率(%)", minWidth: 70},
          {prop: "exceed_ratio", label: "超标率(%)", minWidth: 70},
          {prop: "max_exceed_multiple", label: "最大超标倍数", minWidth: 80},
        ],
        pageResult: {
          "pageNum": 1,
          "pageSize": 8,
          "totalSize": 60,
          "content": [
            {
              "name": "苯",
              "type": "苯系物",
              "range": "(1.23,4.56)",
              "detection_ratio": 26,
              "exceed_ratio": 20,
              "max_exceed_multiple": 2.0,
            }, {
              "name": "甲苯",
              "type": "苯系物",
              "range": "(1140.23,1233.54)",
              "detection_ratio": 59,
              "exceed_ratio": 49,
              "max_exceed_multiple": 2.2,
            }, {

              "name": "间,对二甲苯",
              "type": "苯系物",
              "range": "(123.14,345.51)",
              "detection_ratio": 90,
              "exceed_ratio": 70,
              "max_exceed_multiple": 3.3,
            }, {
              "name": "乙苯",
              "type": "苯系物",
              "range": "(17.16,28.45)",
              "detection_ratio": 26.4,
              "exceed_ratio": 23.2,
              "max_exceed_multiple": 1.5,
            },
             {
              "name": "氯苯",
              "type": "苯系物",
              "range": "(145.14,320.14)",
              "detection_ratio": 28.7,
              "exceed_ratio": 25.6,
              "max_exceed_multiple": 1.3,
            },
            {
              "name": "苯乙烯",
              "type": "苯系物",
              "range": "(1100.14,4353.56)",
              "detection_ratio": 78.7,
              "exceed_ratio": 76.7,
              "max_exceed_multiple": 4.2,
            },

          ]
        }, //请求结果

        filters2: {
          names:[],
          type:"苯系物"
        },
        filterColumns2: [
          {prop: "name", label: "污染物名称", minWidth: 50},
          {prop: "level1", label: "无污染", minWidth: 50},
          {prop: "level2", label: "轻微", minWidth: 50},
          {prop: "level3", label: "轻度", minWidth: 50},
          {prop: "level4", label: "中度", minWidth: 50},
          {prop: "level5", label: "重度", minWidth: 50},

        ],
        pageResult2: {
          "pageNum": 1,
          "pageSize": 8,
          "totalSize": 60,
          "content": [
            {
              "name": "苯",
              "level1": 114,
              "level2": 52,
              "level3": 21,
              "level4": 13,
              "level5": 0,
            }, {
              "name": "甲苯",
              "level1": 92,
              "level2": 54,
              "level3": 26,
              "level4": 28,
              "level5": 0,
            }, {

              "name": "间,对二甲苯",
              "level1": 42,
              "level2": 94,
              "level3": 38,
              "level4": 22,
              "level5": 0,
            }, {
              "name": "乙苯",
              "level1": 118,
              "level2": 47,
              "level3": 21,
              "level4": 13,
              "level5": 0,
            },
            {
              "name": "氯苯",
              "level1": 125,
              "level2": 41,
              "level3": 21,
              "level4": 13,
              "level5": 0,
            },
            {
              "name": "苯乙烯",
              "level1": 37,
              "level2": 58,
              "level3": 68,
              "level4": 22,
              "level5": 5,
            },

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
          // toolbox: {
          //   feature: {
          //     dataView: {show: true, readOnly: true},
          //     magicType: {show: true, type: ['line', 'bar']},
          //     restore: {show: true},
          //     saveAsImage: {show: true}
          //   }
          // },
          legend: {
            data: ['检出率', '超标率', '最大超标倍数']
          },
          xAxis: [
            {
              type: 'category',
              data: ['苯','甲苯', '间,对二甲苯', '乙苯','氯苯', '苯乙烯'],
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
              name: '检出率',
              type: 'bar',
              data: [26, 59, 90, 26.4, 28.7, 78.7]
            },
            {
              name: '超标率',
              type: 'bar',
              data: [20, 49, 70, 23.2, 25.6, 71.7]
            },
            {
              name: '最大超标倍数',
              type: 'bar',
              yAxisIndex: 1,
              data: [2.0, 2.2, 3.3, 1.5, 1.3, 4.2]
            }
          ],
          backgroundColor: '#eee7e1'
        }
        myChart.setOption(option1)


        // 基于准备好的dom，初始化echarts实例
        var myChart2 = this.$echarts.init(document.getElementById('myecharts2'));
        // 绘制图表
        let option2={
          title: {
            text: '污染评价'
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
          // toolbox: {
          //   feature: {
          //     dataView: {show: true, readOnly: true},
          //     magicType: {show: true, type: ['line', 'bar']},
          //     restore: {show: true},
          //     saveAsImage: {show: true}
          //   }
          // },
          legend: {
            data: ['重度', '中度', '轻度', '轻微','无污染']
          },
          xAxis: [
            {
              type: 'category',
              data: ['苯','甲苯', '间,对二甲苯', '乙苯','氯苯', '苯乙烯'],
              axisPointer: {
                type: 'shadow'
              }
            }
          ],
          yAxis: [
            {
              type: 'value',
              name: '采样点个数',
              // min: 0,
              // max: 100,
              // interval: 10,
              // axisLabel: {
              //   formatter: '{value} %'
              // }
            },
            // {
            //   type: 'value',
            //   name: '百分比',
            //   min: 0,
            //   max: 100,
            //   interval: 10,
            //   axisLabel: {
            //     formatter: '{value} %'
            //   }
            // },
            // {
            //   type: 'value',
            //   name: '倍数',
            //   min: 0,
            //   max: 10,
            //   interval: 1,
            //   axisLabel: {
            //     formatter: '{value}'
            //   }
            // }
          ],
          series: [
            {
              name: '重度',
              type: 'bar',
              data: [0, 0, 0, 0, 0, 5]
            },
            {
              name: '中度',
              type: 'bar',
              data: [13, 28, 22, 13, 13, 22]
            },
            {
              name: '轻度',
              type: 'bar',
              data: [21, 26, 38, 21, 21, 68]
            },
            {
              name: '轻微',
              type: 'bar',
              data: [52, 54, 94, 47, 41, 58]
            },
            {
              name: '无污染',
              type: 'bar',
              data: [114, 92, 42, 114, 125, 37]
            }
          ],
          backgroundColor: '#eee7e1'
        }
        myChart2.setOption(option2)
      }
    },
    mounted() {
      this.echartsTest()
    }
  }
</script>

<style scoped>

</style>
