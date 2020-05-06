<template>
  <div class="app-container">
    <div>场地文档页面</div>
    <div style="margin-bottom: 5px">
      <el-row>
        <el-col :span="2" :offset="22">
          <el-button type="primary" @click="dialogVisible = true">创建</el-button>
        </el-col>
      </el-row>
    </div>
<div style="margin-bottom: 5px">
  <el-row>
    <el-col :span="24">
      <!--        <el-table :data="devices" stripe border style="width: 100%">-->
      <el-table :data="files" stripe border>
        <!--          <el-table-column prop="id" label="id" width="80"></el-table-column>-->
        <el-table-column prop="name" label="name" width="180"></el-table-column>
        <el-table-column prop="type" label="type"></el-table-column>
        <el-table-column prop="datetime" label="datetime"></el-table-column>
        <el-table-column prop="description" label="description"></el-table-column>
        <el-table-column label="path">
          <template slot-scope="scope">
            <el-button @click="handleClick(scope.row.name)" type="text" size="small">下载</el-button>
            <el-button type="text" size="small">编辑</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-col>
  </el-row>
</div>

    <el-dialog
      title="上传文件"
      :visible.sync="dialogVisible"
      width="30%"
      :before-close="handleClose">
      <el-form  ref="form" label-position="right" label-width="80px" :model="form">
        <el-form-item label="文件名称">
          <el-input v-model="form.name" placeholder="请输入内容"></el-input>
        </el-form-item>
        <el-form-item label="文件类型">
          <el-radio-group v-model="form.type">
            <el-radio-button label="文档"></el-radio-button>
            <el-radio-button label="图像"></el-radio-button>
            <el-radio-button label="视频"></el-radio-button>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="文件描述">
          <el-input
            type="textarea"
            :rows="2"
            placeholder="请输入内容"
            v-model="form.description">
          </el-input>
        </el-form-item>
        <el-form-item label="文件选取">
          <el-upload
            action=""
            :limit="1"
            :http-request="handleFile"
            :file-list="form.fileList"
            :multiple="false">
<!--            <i class="el-icon-upload"></i>-->
            <div class="el-upload__text"><em>点击上传</em></div>
<!--            <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>-->
          </el-upload>
<!--          <input type="file" name="fileContent">-->
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit"> 提交</el-button>
        </el-form-item>
      </el-form>

<!--      <span slot="footer" class="dialog-footer">-->
<!--          <el-button @click="dialogVisible = false">取 消</el-button>-->
<!--          <el-button type="primary" @click="dialogVisible = false">确 定</el-button>-->
<!--      </span>-->
    </el-dialog>
  </div>
</template>

<script>
  import {uploadFile} from '@/api/site'
  export default {
    name: 'index',
    data() {
      return {
        files: [
          {
            id: 1,
            name: '调查报告',
            type: '文档',
            datetime: new Date().toUTCString(),
            description: "调查结果",
            path: "/doc/123"
          },
          // {
          //   id: 1,
          //   name: '调查报告',
          //   type: '文档',
          //   datetime: new Date().toUTCString(),
          //   description: "调查结果",
          //   path: "/doc/123"
          // },
          // {
          //   id: 1,
          //   name: '调查报告',
          //   type: '文档',
          //   datetime: new Date().toUTCString(),
          //   description: "调查结果",
          //   path: "/doc/123"
          // },
        ],
        // docName: '',
        // doctype: '',
        // docDescription: '',
        dialogVisible: false,
        form: {
          name: '',
          type: '',
          description: '',
          fileList:[]
        },

      }
    },
    methods: {
      handleFile(){},
      onSubmit(){
        let formData= new FormData()
        formData.append('name',this.form.name)
        formData.append('type',this.form.type)
        formData.append('description',this.form.description)
        formData.append('file',this.form.fileList[0])
        console.debug(formData)
        uploadFile(formData).then(rep=>{
          console.debug(rep)
        })
      },
      handleClick(row) {
        // console.log(row);
        alert(row)
      },
      handleClose(done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            done();
          })
          .catch(_ => {
          });
      }
    },
  }
</script>

<style scoped>

</style>
