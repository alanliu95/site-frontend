<template>
  <div class="app-container">
    <!--工具栏-->
    <div style="float:left;padding-top:10px;padding-left:15px;">
      <el-form :inline="true" :model="filters" :size="size">
        <el-form-item label="设备名">
          <el-input v-model="filters.name" placeholder="请输入设备名"></el-input>
        </el-form-item>
        <el-form-item label="起始时间">
          <div class="block">
<!--            <span class="demonstration">默认</span>-->
            <el-date-picker
              v-model="starting"
              type="datetime"
              placeholder="选择日期时间">
            </el-date-picker>
          </div>
        </el-form-item>
        <el-form-item label="结束时间">
          <div class="block">
<!--            <span class="demonstration">带快捷选项</span>-->
            <el-date-picker
              v-model="ending"
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
        <el-table-column label="操作" width="150" fixed="right" header-align="center" align="center">
          <template slot-scope="scope">
            <div>
              <el-button icon="fa fa-edit" :size="size">发送邮件</el-button>
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
    name: 'Warning',
    data() {
      return {
        starting:'',
        ending:'',
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
              "name": "pi",
              "location": "实验七楼服务器机柜",
              "warning":"温度过高",
              "samplingTime": "2020-01-13 14:07:18",
              "temp": 30.53
            },
            {
              "id": 2,
              "name": "pi",
              "location": "实验七楼服务器机柜",
              "warning":"温度过高",
              "samplingTime": "2020-01-14 15:14:18",
              "temp": 31.21
            },
            {
              "id": 3,
              "name": "pi",
              "location": "实验七楼服务器机柜",
              "warning":"温度过高",
              "samplingTime": "2020-01-15 15:54:18",
              "temp": 30.52
            },
            {
              "id": 4,
              "name": "pi",
              "location": "实验七楼服务器机柜",
              "warning":"温度过高",
              "samplingTime": "2020-01-16 15:45:18",
              "temp": 31.25
            },

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
          {prop: "id", label: "事件ID", minWidth: 30},
          {prop: "name", label: "设备名", minWidth: 60},
          {prop: "location", label: "位置", minWidth: 80},
          {prop: "temp", label: "温度", minWidth: 80},
          {prop: "warning", label: "报警信息", minWidth: 80},
          {prop: "samplingTime", label: "采样时间", minWidth: 50},
          // {prop: "latitude", label: "纬度", minWidth: 50},
          // {prop: "info", label: "描述", minWidth: 80},

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
