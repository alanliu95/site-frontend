<template>
  <div class="app-container">
    <!--工具栏-->
    <div class="toolbar" style="float:left;padding-top:10px;padding-left:15px;">
      <el-form :inline="true" :model="filters" :size="size">
        <el-form-item>
          <el-input v-model="filters.username" placeholder="用户名"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button icon="fa fa-search" label="查找"  type="primary" @click="myAlert('未实现')">
            查找</el-button>
        </el-form-item>
        <el-form-item>
          <el-button icon="fa fa-plus" @click="dialogVisible=true" type="primary">
            添加</el-button>
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


    <el-dialog title='添加新用户' width="40%" :visible.sync="dialogVisible" :close-on-click-modal="false">
      <el-form :model="dataForm" label-width="80px"  ref="dataForm" :size="size"
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
        <el-button :size="size" type="primary"  >提交</el-button>
      </div>
    </el-dialog>

    <div>
      <!--表格栏-->
      <el-table :data="pageResult.content" :highlight-current-row="highlightCurrentRow"
                element-loading-text="加载" :border="border" :stripe="stripe"
                :show-overflow-tooltip="showOverflowTooltip" :max-height="maxHeight" :height="height" :size="size" :align="align" style="width:100%;" >
        <el-table-column type="selection" width="40" ></el-table-column>
        <el-table-column v-for="column in filterColumns" header-align="center" align="center"
                         :prop="column.prop" :label="column.label" :width="column.width" :min-width="column.minWidth"
                         :fixed="column.fixed" :key="column.prop" :type="column.type" :formatter="column.formatter"
                         :sortable="column.sortable==null?true:column.sortable">
        </el-table-column>
        <el-table-column label="操作" width="185" fixed="right"  header-align="center" align="center">
          <template slot-scope="scope">
            <div>
              <el-button icon="fa fa-edit" :size="size" >编辑</el-button>
              <el-button icon="fa fa-trash" :size="size" type="danger" >删除</el-button>
            </div>
          </template>
        </el-table-column>
      </el-table>
      <!--分页栏-->
      <div class="toolbar" style="padding:10px;">
        <el-button   :size="size" type="danger"
                   disabled="false" style="float:left;">批量删除</el-button>
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
        }, {
          value: '选项2',
          label: '双皮奶'
        }, {
          value: '选项3',
          label: '蚵仔煎'
        }, {
          value: '选项4',
          label: '龙须面'
        }, {
          value: '选项5',
          label: '北京烤鸭'
        }],
        size: 'small',
        filters: {  //接收名字搜索栏的输入内容
          username: ''
        },
        columns: [], //ktable 可显示的所有列
        filterColumns: [],
        pageRequest: {pageNum: 1, pageSize: 2},
        pageResult:  {
            "pageNum": 1,
            "pageSize": 2,
            "totalSize": 8,
            "content": [
              {
                "id": 37,
                "username": "admin",
                "password": "$2a$10$YXZ5Lp0AFqznBzDaFYjJHu52TBeGkZ2YJwI5V2CmTnIkuz9lQ/AAO",
                "phone": "18325781303",
                "email": "684512714@qq.com",
                "created": "2020-03-27T04:15:36",
                "updated": "2020-03-27T04:15:36",
                "avatar": null,
                "organization": "华东理工大学",
                "roleNames":"超级管理员"
              },
              {
                "id": 38,
                "username": "alan",
                "password": "$2a$10$YXZ5Lp0AFqznBzDaFYjJHu52TBeGkZ2YJwI5V2CmTnIkuz9lQ/AAO",
                "phone": "18325781303",
                "email": "684512714@qq.com",
                "created": "2020-03-27T04:15:36",
                "updated": "2020-03-27T04:15:36",
                "avatar": null,
                "organization": "华东理工大学",
                "roleNames":"普通用户"
              }
            ]
          }, //请求结果

        dialogVisible: false, // 新增编辑界面是否显示
        dataForm: {  //弹窗表单数据
          id: 0,
          username: '名字',
          password: '密码',
          organization: "组织",
          email: 'test@qq.com',
          phone: '13889700023',
          roleNames:[]
          // status: 1,
          // userRoles: []
        },
        // selections: [],  // 列表选中列
        // size: { // 尺寸样式
        //   type: String,
        //   default: 'mini'
        // },
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
          username: '名字',
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
          {prop: "username", label: "用户名", minWidth: 80},
          {prop: "organization", label: "机构", minWidth: 120},
          {prop: "roleNames", label: "角色", minWidth: 100},
          {prop: "email", label: "邮箱", minWidth: 100},
          {prop: "phone", label: "手机", minWidth: 100},
          // {prop: "status", label: "状态", minWidth: 70},

          {prop:"created", label:"创建时间", minWidth:120, formatter:this.dateFormat}

          // {prop:"createBy", label:"创建人", minWidth:120},
          // {prop:"lastUpdateBy", label:"更新人", minWidth:100},
          // {prop:"lastUpdateTime", label:"更新时间", minWidth:120, formatter:this.dateFormat}
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
