<template>
  <div class="app-container">
    <!--工具栏-->
    <div style="float:left;padding-top:10px;padding-left:15px;">
      <el-form :inline="true" :model="filters" :size="size">
        <el-form-item label="设备名">
          <el-input v-model="filters.name" placeholder="请输入设备名"></el-input>
        </el-form-item>
        <el-form-item label="设备类型">
          <el-select v-model="filters.type" placeholder="请选择">
            <el-option label="重金属和无机物" value="重金属和无机物"></el-option>
            <el-option label="多环芳烃" value="多环芳烃"></el-option>
            <el-option label="苯系物" value="苯系物"></el-option>
          </el-select>
        </el-form-item>

<!--        <el-form-item label="采样点编号">-->
<!--          <el-input v-model="filters.ponitid" placeholder="请输入采样点编号"></el-input>-->
<!--        </el-form-item>-->

        <el-form-item>
          <el-button icon="fa fa-search" label="查找" type="primary" @click="myAlert('未实现')">
            查找
          </el-button>
        </el-form-item>
        <el-form-item>
          <el-button icon="fa fa-plus" @click="dialogVisible=true" type="primary">
            添加
          </el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="toolbar" style="float:right;padding-top:10px;padding-right:15px;">
      <el-form :inline="true" :size="size">
        <el-form-item>
          <el-button-group>
            <el-tooltip content="刷新" placement="top">
              <el-button icon="fa fa-refresh" @click="myAlert('未实现')"></el-button>
            </el-tooltip>
            <el-tooltip content="列显示" placement="top">
              <el-button icon="fa fa-filter" @click="myAlert('未实现')"></el-button>
            </el-tooltip>
            <!-- <el-tooltip content="导出" placement="top">
              <el-button icon="fa fa-file-excel-o"></el-button>
            </el-tooltip> -->
          </el-button-group>
        </el-form-item>
      </el-form>
      <!--表格显示列界面-->
      <!--      <table-column-filter-dialog ref="tableColumnFilterDialog" :columns="columns"-->
      <!--                                  @handleFilterColumns="handleFilterColumns">-->
      <!--      </table-column-filter-dialog>-->
    </div>


    <el-dialog title='添加新角色' width="40%" :visible.sync="dialogVisible" :close-on-click-modal="false">
      <el-form :model="dataForm" label-width="80px" ref="dataForm" :size="size"
               label-position="right">
        <el-form-item label="ID" prop="id" v-if="false">
          <el-input v-model="dataForm.id" :disabled="true" auto-complete="off"></el-input>
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
        <el-button :size="size" @click.native="dialogVisible = false">取消</el-button>
        <el-button :size="size" type="primary">提交</el-button>
      </div>
    </el-dialog>

    <div>
      <!--表格栏-->
      <el-table :data="pageResult.content" :highlight-current-row="highlightCurrentRow"
                element-loading-text="加载" :border="border" :stripe="stripe"
                :show-overflow-tooltip="showOverflowTooltip" :max-height="maxHeight" :height="height" :size="size"
                :align="align" style="width:100%;">
        <el-table-column type="selection" width="40"></el-table-column>
        <el-table-column v-for="column in filterColumns" header-align="center" align="center"
                         :prop="column.prop" :label="column.label" :width="column.width" :min-width="column.minWidth"
                         :fixed="column.fixed" :key="column.prop" :type="column.type" :formatter="column.formatter"
                         :sortable="column.sortable==null?true:column.sortable">
        </el-table-column>
        <el-table-column   label="操作" width="300" fixed="right" header-align="center" align="center">
          <template slot-scope="scope">
            <div>
              <el-button icon="el-icon-odometer"  :size="size" >状态</el-button>
              <el-button icon="fa fa-edit" :size="size">编辑</el-button>
              <el-button icon="fa fa-trash" :size="size" type="danger">删除</el-button>
            </div>
          </template>
        </el-table-column>
      </el-table>
      <!--分页栏-->
      <div class="toolbar" style="padding:10px;">
        <el-button :size="size" type="danger"
                   disabled="false" style="float:left;">批量删除
        </el-button>
        <el-pagination layout="total, prev, pager, next, jumper"
                       :current-page="pageRequest.pageNum" :page-size="pageRequest.pageSize"
                       :total="pageResult.totalSize" style="float:right;">
        </el-pagination>
      </div>
    </div>

  </div>
</template>

<script>
  import {getUsersByPage} from "../../api/user";

  export default {
    name: 'index',
    data() {
      return {
        roleOptions: [{
          value: '选项1',
          label: '黄金糕'
        }, {
          value: '选项2',
          label: '双皮奶'
        }],
        size: 'small',
        filters: {  //接收名字搜索栏的输入内容
          // username: ''
        },
        columns: [], //ktable 可显示的所有列
        filterColumns: [],
        pageRequest: {pageNum: 1, pageSize: 8},
        pageResult: {
          "pageNum": 1,
          "pageSize": 8,
          "totalSize": 4,
          "content": [
            {
              "id": 1,
              "siteId": 1,
              "name": "desktop-alan",
              "token": "desktop-alan",
              "devType": "dell工作站",
              "location":"实验七楼服务器机柜",
              "longitude": 121.424055,
              "latitude": 31.143036,
              "info": "windows10工作站"
            },
            {
              "id": 2,
              "siteId": 1,
              "name": "ubuntu_14th",
              "token": "ubuntu_14th",
              "devType": "dell服务器",
              "location":"实验七楼实验桌",
              "longitude": 121.424055,
              "latitude": 31.143036,
              "info": "k8s集群node节点"
            },
            {
              "id": 3,
              "siteId": 1,
              "name": "vm-ubuntu16",
              "token": "vm-ubuntu16",
              "devType": "dell服务器",
              "location":"实验七楼服务器机柜",
              "longitude": 121.424055,
              "latitude": 31.143036,
              "info": "k8s集群master节点"
            },
            {
              "id": 4,
              "siteId": 1,
              "name": "pi",
              "token": "pi",
              "devType": "树莓派",
              "location":"实验七楼服务器机柜",
              "longitude": 121.424055,
              "latitude": 31.143036,
              "info": "树莓派，卡片式电脑，基于ARM架构设计。运行Linux操作系统。项目用作MQTT设备模拟器"
            },
            // {
            //   "id": 6,
            //   "siteId": 1,
            //   "name": "mk60",
            //   "token": "mk60",
            //   "devType": 4,
            //   "longitude": null,
            //   "latitude": null,
            //   "info": null
            // },
            // {
            //   "id": 7,
            //   "siteId": 1,
            //   "name": "stm32",
            //   "token": "stm32",
            //   "devType": 4,
            //   "longitude": null,
            //   "latitude": null,
            //   "info": null
            // }
          ]
        },
        dialogVisible: false, // 新增编辑界面是否显示
        dataForm: {  //弹窗表单数据
          id: 0,
          name: '名字',
          password: '密码',
          organization: "组织",
          email: 'test@qq.com',
          phone: '13889700023',
          roleNames: []
          // status: 1,
          // userRoles: []
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

      findPage: function (data) {
        //若为null 则是刷新请求
        if (data !== null) {
          this.pageRequest = data.pageRequest
        }
        getUsersByPage(this.pageRequest).then(res => {
          this.pageResult = res.data
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

          // "id": 5,
          // "siteId": 1,
          // "name": "pi",
          // "token": "pi",
          // "devType": "dell服务器",
          // "longitude": 31.146,
          // "latitude": 121.421,
          // "info": "树莓派"
        this.columns = [
          {prop: "id", label: "ID", minWidth: 30},
          {prop: "name", label: "设备名", minWidth: 60},
          // {prop: "siteId", label: "场地ID", minWidth: 50},
          {prop: "token", label: "令牌", minWidth: 60},
          {prop: "devType", label: "设备类型", minWidth: 60},
          {prop: "location", label: "位置", minWidth: 80},
          {prop: "longitude", label: "经度", minWidth: 50},
          {prop: "latitude", label: "纬度", minWidth: 50},
          {prop: "info", label: "描述", minWidth: 80},

        ]
        this.filterColumns = JSON.parse(JSON.stringify(this.columns));
      }
    },
    mounted() {
      // this.findDeptTree()
      this.initColumns()
    }
  }
</script>

<style scoped>

</style>
