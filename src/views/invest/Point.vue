<template>
  <div class="app-container">
    <!--工具栏-->
<!--    <div class="toolbar" style="float:left;padding-top:10px;padding-left:15px;">-->
<!--      <el-form :inline="true" :model="filters" :size="size">-->
<!--        <el-form-item>-->
<!--          <el-input v-model="filters.username" placeholder="角色名"></el-input>-->
<!--        </el-form-item>-->
<!--        <el-form-item>-->
<!--          <el-button icon="fa fa-search" label="查找"  type="primary" @click="myAlert('未实现')">-->
<!--            查找</el-button>-->
<!--        </el-form-item>-->
<!--        <el-form-item>-->
<!--          <el-button icon="fa fa-plus" @click="dialogVisible=true" type="primary">-->
<!--            添加</el-button>-->
<!--        </el-form-item>-->
<!--      </el-form>-->
<!--    </div>-->
<!--    <div class="toolbar" style="float:right;padding-top:10px;padding-right:15px;">-->
<!--      <el-form :inline="true" :size="size">-->
<!--        <el-form-item>-->
<!--          <el-button-group>-->
<!--            <el-tooltip content="刷新" placement="top">-->
<!--              <el-button icon="fa fa-refresh" @click="myAlert('未实现')"></el-button>-->
<!--            </el-tooltip>-->
<!--            <el-tooltip content="列显示" placement="top">-->
<!--              <el-button icon="fa fa-filter" @click="myAlert('未实现')"></el-button>-->
<!--            </el-tooltip>-->
<!--            &lt;!&ndash; <el-tooltip content="导出" placement="top">-->
<!--              <el-button icon="fa fa-file-excel-o"></el-button>-->
<!--            </el-tooltip> &ndash;&gt;-->
<!--          </el-button-group>-->
<!--        </el-form-item>-->
<!--      </el-form>-->
<!--      &lt;!&ndash;表格显示列界面&ndash;&gt;-->
<!--      &lt;!&ndash;      <table-column-filter-dialog ref="tableColumnFilterDialog" :columns="columns"&ndash;&gt;-->
<!--      &lt;!&ndash;                                  @handleFilterColumns="handleFilterColumns">&ndash;&gt;-->
<!--      &lt;!&ndash;      </table-column-filter-dialog>&ndash;&gt;-->
<!--    </div>-->
    <div id="amap-container">

    </div>


    <el-dialog title='添加新角色' width="40%" :visible.sync="dialogVisible" :close-on-click-modal="false">
      <el-form :model="dataForm" label-width="80px"  ref="dataForm" :size="'small'"
               label-position="right">
        <el-form-item label="ID" prop="id" v-if="false">
          <el-input v-model="dataForm.id" disabled=true auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="用户名" prop="name">
          <el-input v-model="dataForm.username" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="角色">
          <el-select size="medium" v-model="dataForm.roleNames" multiple placeholder="请选择">
            <el-option
              v-for="item in roleOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="密码" prop="password">
          <el-input v-model="dataForm.password" type="password" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="单位" prop="organization">
          <el-input v-model="dataForm.organization" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="dataForm.email" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="手机" prop="phone">
          <el-input v-model="dataForm.phone" auto-complete="off"></el-input>
        </el-form-item>
        <!--        <el-form-item label="角色" prop="userRoles" v-if="!operation">-->
        <!--          <el-select v-model="dataForm.userRoles" multiple placeholder="请选择"-->
        <!--                     style="width: 100%;">-->
        <!--            <el-option v-for="item in roles" :key="item.id"-->
        <!--                       :label="item.remark" :value="item.id">-->
        <!--            </el-option>-->
        <!--          </el-select>-->
        <!--        </el-form-item>-->
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button :size="'small'" @click.native="dialogVisible = false">取消</el-button>
        <el-button :size="'small'" type="primary"  >提交</el-button>
      </div>
    </el-dialog>

    <div>
      <!--表格栏-->
      <el-table :data="pageResult.content" :highlight-current-row=true
                element-loading-text="加载" :border=true :stripe=true
                :show-overflow-tooltip=true :max-height=500 :height=400 :size="'small'" :align="'left'" style="width:100%;" >
        <el-table-column type="selection" width="40" ></el-table-column>
        <el-table-column v-for="column in filterColumns" header-align="center" align="center"
                         :prop="column.prop" :label="column.label" :width="column.width" :min-width="column.minWidth"
                         :fixed="column.fixed" :key="column.prop" :type="column.type" :formatter="column.formatter"
                         :sortable="column.sortable==null?true:column.sortable">
        </el-table-column>
        <el-table-column label="操作" width="185" fixed="right"  header-align="center" align="center">
          <template slot-scope="scope">
            <div>
              <el-button icon="fa fa-edit" :size="'small'" >编辑</el-button>
              <el-button icon="fa fa-trash" :size="'small'" type="danger" >删除</el-button>
            </div>
          </template>
        </el-table-column>
      </el-table>
      <!--分页栏-->
      <div class="toolbar" style="padding:10px;">
        <el-button size=small icon="fa fa-plus"  type="primary" style="float:left;"  @click="myAlert('未实现')">
          批量添加</el-button>
        <el-button   size=small type="danger"
                     disabled=false style="float:left;">批量删除</el-button>
        <el-pagination layout="total, prev, pager, next, jumper"
                       :current-page="pageRequest.pageNum" :page-size="pageRequest.pageSize" :total="pageResult.totalSize" style="float:right;">
        </el-pagination>
      </div>
    </div>

  </div>
</template>

<script>
  import PopupTreeInput from "@/components/PopupTreeInput"
  import KtTable from "@/views/Core/KtTable"
  import KtButton from "@/views/Core/KtButton"
  import TableColumnFilterDialog from "@/views/Core/TableColumnFilterDialog"
  import {format} from "@/utils/datetime"
  import {userFindPage} from "../../api/system";
  import {getUsersByPage} from "../../api/user";
  // import { userFindPage } from '@/api/system'
  export default {
    name:"Point",
    components: {
      PopupTreeInput,
      KtTable,
      KtButton,
      TableColumnFilterDialog
    },
    data() {
      return {
        roleOptions: [{
          value: '选项1',
          label: '黄金糕'
        }],
        size: 'small',
        filters: {  //接收名字搜索栏的输入内容
          username: ''
        },
        columns: [], //ktable 可显示的所有列
        filterColumns: [],
        pageRequest: {pageNum: 1, pageSize: 8},
        pageResult:  {
          "pageNum": 1,
          "pageSize": 8,
          "totalSize": 40,
          "content": [
            {
              "id": 1,
              "latitude": 32.0209,
              "longitude": 114.912,
              "elevation": 0.5,
              "soilType": "黄棕壤",
              "samplingTime": "2018-04-12T05:07:18 ",
              "sn": "S1",
              "region": "甲醇脱硫",
              "siteId": "1"
            },
            {
              "id": 2,
              "latitude": 32.0233,
              "longitude": 114.909,
              "elevation": 0.5,
              "soilType": "黄棕壤",
              "samplingTime": "2018-04-12T05:07:18 ",
              "sn": "S2",
              "region": "锅炉污水池",
              "siteId": "1"
            },
            {
              "id": 3,
              "latitude": 32.0236,
              "longitude": 114.911,
              "elevation": 0.5,
              "soilType": "黄棕壤",
              "samplingTime": "2018-04-12T05:07:18 ",
              "sn": "S3",
              "region": "造气沉灰池",
              "siteId": "1"
            },
            {
              "id": 4,
              "latitude": 32.0227,
              "longitude": 114.914,
              "elevation": 0.5,
              "soilType": "黄棕壤",
              "samplingTime": "2018-04-12T05:07:18 ",
              "sn": "S4",
              "region": "污水站",
              "siteId": "1"
            },
            {
              "id": 5,
              "latitude": 32.0245,
              "longitude": 114.911,
              "elevation": 0.5,
              "soilType": "黄棕壤",
              "samplingTime": "2018-04-12T05:07:18 ",
              "sn": "S5",
              "region": "平流沉淀池",
              "siteId": "1"
            },
            {
              "id": 6,
              "latitude": 32.0234,
              "longitude": 114.911,
              "elevation": 0.5,
              "soilType": "黄棕壤",
              "samplingTime": "2018-04-12T05:07:18",
              "sn": "S6",
              "region": "造气厂房",
              "siteId": "1"
            },
            {
              "id": 7,
              "latitude": 32.0206,
              "longitude": 114.91123,
              "elevation": 0.5,
              "soilType": "黄棕壤",
              "samplingTime": "2018-04-12T05:07:18 ",
              "sn": "S7",
              "region": "甲醇合成",
              "siteId": "1"
            },
            {
              "id": 8,
              "latitude": 32.0232,
              "longitude": 114.914,
              "elevation": 0.5,
              "soilType": "黄棕壤",
              "samplingTime": "2018-04-12T05:07:18 ",
              "sn": "S8",
              "region": "龙山灌渠下游",
              "siteId": "1"
            }
          ]
        }, //请求结果

        dialogVisible: false, // 新增编辑界面是否显示
        dataForm: {  //弹窗表单数据
          id: 0,
          name: '名字',
          password: '密码',
          organization: "组织",
          email: 'test@qq.com',
          phone: '13889700023',
          roleNames:[]
          // status: 1,
          // userRoles: []
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

      findPage: function (data) {
        //若为null 则是刷新请求
        if (data !== null) {
          this.pageRequest = data.pageRequest
        }
        getUsersByPage(this.pageRequest).then(res=>{
          this.pageResult=res.data
        }).then(data != null ? data.callback : '')


      },

      // 批量删除
      handleDelete: function (data) {
        // this.$api.user.batchDelete(data.params).then(data != null ? data.callback : '')
      },

      // 显示新增界面
      handleAdd: function () {
        this.dialogVisible = true
        this.operation = true
        this.dataForm = {
          id: 0,
          name: '名字',
          password: '密码',
          organization: "单位",
          email: 'test@qq.com',
          phone: '13889700023',
          // status: 1,
        }
      },
      // 显示编辑界面
      handleEdit: function (params) {
        this.dialogVisible = true
      },
      // 编辑
      submitForm: function () {
        this.$refs.dataForm.validate((valid) => {
          if (valid) {
            this.$confirm('确认提交吗？', '提示', {}).then(() => {
              // this.editLoading = true
              let params = Object.assign({}, this.dataForm)
              // let userRoles = []
              // for (let i = 0, len = params.userRoles.length; i < len; i++) {
              //   let userRole = {
              //     userId: params.id,
              //     roleId: params.userRoles[i]
              //   }
              //   userRoles.push(userRole)
              // }
              // params.userRoles = userRoles
              this.$api.user.save(params).then((res) => {
                // this.editLoading = false
                if (res.code == 200) {
                  this.$message({message: '操作成功', type: 'success'})
                  this.dialogVisible = false
                  this.$refs['dataForm'].resetFields()
                } else {
                  this.$message({message: '操作失败, ' + res.msg, type: 'error'})
                }
                this.findPage(null)
              })
            })
          }
        })
      },
      // // 获取部门列表
      // findDeptTree: function () {
      //   this.$api.dept.findDeptTree().then((res) => {
      //     this.deptData = res.data
      //   })
      // },
      // // 菜单树选中
      // deptTreeCurrentChangeHandle(data, node) {
      //   this.dataForm.deptId = data.id
      //   this.dataForm.deptName = data.name
      // },
      // 时间格式化
      dateFormat: function (row, column, cellValue, index) {
        return format(row[column.property])
      },

      // 处理表格列过滤显示
      initColumns: function () {
        this.columns = [
          {prop: "id", label: "ID", minWidth: 50},
          {prop: "sn", label: "编号", minWidth: 80},
          {prop: "siteId", label: "场地ID", minWidth: 80},
          {prop: "longitude", label: "经度", minWidth: 80},
          {prop: "latitude", label: "纬度", minWidth: 80},
          {prop: "elevation", label: "高程", minWidth: 80},
          {prop: "soilType", label: "土壤类型", minWidth: 80},
          {prop: "region", label: "采样区域", minWidth: 100},
          {prop: "samplingTime", label: "采样时间", minWidth: 120},
          // {prop:"lastUpdateTime", label:"更新时间", minWidth:120, formatter:this.dateFormat}
        ]
        this.filterColumns = JSON.parse(JSON.stringify(this.columns));
      },
      initMap:function () {
        var map = new AMap.Map('amap-container', {
          // "latitude": 32.0209,
          // "longitude": 114.912,
          //114.912
          center: [114.912, 32.0209],
          layers: [//使用多个图层
            new AMap.TileLayer.Satellite(),
            // new AMap.TileLayer.RoadNet()
          ],
          zooms: [4, 18],//设置地图级别范围
          zoom: 16
        });
        var points=this.pageResult.content
        var points2 = [
          {
            "id": 1,
            "longitude": 116.397428,
            "latitude": 39.90923,
            "elevation": 0.5,
            "soilType": "黄棕壤",
            "samplingTime": "2018-04-12T05:07:18 ",
            "sn": "S1",
            "region": "甲醇脱硫",
            "siteId": "1"
          },
          {
            "id": 2,
            "longitude": 116.397428,
            "latitude": 39.90723,
            "elevation": 0.5,
            "soilType": "黄棕壤",
            "samplingTime": "2018-04-12T05:07:18 ",
            "sn": "S2",
            "region": "锅炉污水池",
            "siteId": "1"
          },]

        //加载SimpleMarker
        AMapUI.loadUI(['overlay/SimpleMarker'], function(SimpleMarker) {

          var iconTheme = 'default';

          //内置的样式
          var iconStyles = SimpleMarker.getBuiltInIconStyles(iconTheme);

          for (var i = 0, len = points.length; i < len; i++) {

            new SimpleMarker({
              iconTheme: iconTheme,
              //使用内置的iconStyle
              iconStyle: 'red',

              //图标文字
              iconLabel: {
                //A,B,C.....
                // innerHTML: String.fromCharCode('A'.charCodeAt(0) + i),
                innerHTML: points[i].sn,
                style: {
                  //颜色, #333, red等等，这里仅作示例，取iconStyle中首尾相对的颜色
                  // color: iconStyles[len - 1 - i]
                  color: 'white'
                }
              },

              //显示定位点
              showPositionPoint:true,

              map: map,
              position: [points[i].longitude,points[i].latitude],

              //Marker的label(见https://lbs.amap.com/api/javascript-api/reference/overlay/#Marker)
              label: {
                // content: iconStyles[i],
                offset: new AMap.Pixel(27, 25)
              }
            });
          }

        });
      }
    },
    mounted() {
      // this.findDeptTree()
      this.initColumns()
      this.initMap()
    }
  }
</script>

<style scoped>
  #amap-container {
    width: 100%;
    height: 400px;
    margin-bottom: 5px;
  }
</style>
