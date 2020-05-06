<template>
  <div>
    <!--    <el-button @click="setSite">1222</el-button>-->
    <!--    <div v-if="loaded">-->
    <!--      <div>{{ site.name }}</div>-->
    <!--    </div>-->
    <!--    <el-button @click="setSite">1222</el-button>-->


<!--    <h1 style="font-size:40px ">{{this.$store.getters['site/name']}}</h1>-->
<!--    <div>siteId：{{ this.$store.getters['site/id']}}</div>-->
<!--    <div>用户名：{{name}}</div>-->
<!--    <div>描述信息</div>-->

<!--    <div class="columns">-->
<!--      <div class="column is-3">场地名称</div><div class="column is-3">name</div>-->
<!--      <div class="column is-3">状态</div><div class="column is-3">环境调查阶段</div>-->
<!--    </div>-->
<!--    <div class="columns">-->
<!--      <div class="column is-3">地址</div><div class="column is-3">安徽合肥</div>-->
<!--      <div class="column is-3">地理坐标</div><div class="column is-3">经纬度</div>-->
<!--    </div>-->



<div style="font-size: 16px">
  华东理工大学（East China University of Science and Technology）简称”华理“，位于上海市，是中华人民共和国教育部直属的一所具有理工特色，覆盖理、工、农、医、经、管、文、法、艺术、哲学、教育11个学科门类的全国重点大学；国家首批世界一流学科建设高校，国家“211工程”、“985工程优势学科创新平台”重点建设高校，全国16所工科重点大学科技工作研讨会、高水平行业特色大学优质资源共享联盟成员，入选国家建设高水平大学公派研究生项目、“111计划”、卓越工程师教育培养计划、“2011计划”、新工科研究与实践项目、“双万计划”、国家大学生创新性实验计划、国家级大学生创新创业训练计划、全国深化创新创业教育改革示范高校、中国政府奖学金来华留学生接收院校等；
</div>
    <el-row style="font-size: 18px">
      <el-col :span="4"><div class="grid-content bg-purple">场地名称：</div></el-col>
      <el-col :span="8"><div class="grid-content bg-purple-light">{{name}}</div></el-col>
      <el-col :span="4"><div class="grid-content bg-purple">场地状态：</div></el-col>
      <el-col :span="8"><div class="grid-content bg-purple-light">{{state}}</div></el-col>
    </el-row>
    <el-row style="font-size: 20px">
      <el-col :span="4"><div class="grid-content bg-purple">地址：</div></el-col>
      <el-col :span="8"><div class="grid-content bg-purple-light">{{location}}</div></el-col>
      <el-col :span="4"><div class="grid-content bg-purple">地理坐标：</div></el-col>
      <el-col :span="8"><div class="grid-content bg-purple-light" style="font-size: 16px">{{'东经'+longitude+','+'北纬'+latitude}}</div></el-col>
    </el-row>

    <el-row style="font-size: 20px">
      <el-col :span="6"><router-link to="/site/docs"><div ><i class="el-icon-document"></i>图文管理</div></router-link></el-col>
      <el-col :span="6"><router-link to="/site/docs"><div ><i class="el-icon-view"></i>场调数据</div></router-link></el-col>
      <el-col :span="6"><router-link to="/site/docs"><div ><i class="el-icon-cpu"></i>设备管理</div></router-link></el-col>
      <el-col :span="6"><router-link to="/site/docs"><div ><i class="el-icon-s-data"></i>数据分析</div></router-link></el-col>
    </el-row>

<!--    <div class="columns">-->
<!--      <router-link to="/site/docs"><div >图文管理</div></router-link>-->
<!--      <router-link to="/site/docs"><div >环调数据</div></router-link>-->
<!--      <router-link to="/site/docs"><div >设备管理</div></router-link>-->
<!--      <router-link to="/site/docs"><div >实时数据</div></router-link>-->
<!--    </div>-->
    <!--    <div>经度：{{ site.longitude }}</div>-->
    <!--    <div>纬度：{{ site.latitude }}</div>-->
    <!--    <router-link to="/device/info">设备</router-link>-->
    <!--    <router-link to="/location/files">文件</router-link>-->
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import {SiteMap} from './SiteMap'
  export default {
    components:{
      SiteMap
    },
    data() {
      return {
        name:'华理实验七楼',
        state:'使用中',
        location: '上海徐汇区梅陇路',
        longitude:121.431755,
        latitude:31.151036,
        detail:[]
      }
    },
    computed: {
      ...mapGetters([
        'name'
      ])
    }
  }
</script>

<style scoped>
  .el-row {
    margin-bottom: 10px;
  &:last-child {
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
