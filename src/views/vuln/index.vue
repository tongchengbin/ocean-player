<template>
  <div class="container">
    <div style="margin-top: 30px"></div>
    <el-row>
      <el-col :span="12">
        <el-input
            class="search"
            v-model="searchInput"
            placeholder="请输入搜索内容"
            :style="{ background: '#04122C', color: '#FFFFFF' }"
        >
          <template #append>
            <el-button @click="getList"><el-icon> <Search /></el-icon></el-button>
          </template>
        </el-input>
      </el-col>
    </el-row>
    <el-table :data="data" class="custom-table"  row-key="id" :row-class-name="getRowClassName">
      <el-table-column label="名称" prop="name"></el-table-column>
      <el-table-column label="组件" prop="name"></el-table-column>
      <el-table-column label="CVE">
        <template #default="scope">
          <el-tag  type="" style="display: inline-block" v-for="i in scope.row.cve" :key="i">{{i}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="#">
        <template #default="scope">
          <el-button round @click="handleDetail(scope.row)" >详情</el-button>
          <el-button v-if="scope.row.runner.id" round type="warning" @click="handleStop(scope.row)">销毁</el-button>
          <el-button v-else round type="primary" @click="handleStart(scope.row)">启动</el-button>
        </template>
      </el-table-column>
      <el-table-column type="expand" >
        <template #default="props">
          <p style="margin-bottom: 0.5rem;">IP:{{props.row.runner.out_ip}}</p>
          <p style="margin-bottom: 0.5rem;">Port:{{props.row.runner.port_info}}</p>
        </template>
      </el-table-column>

    </el-table>


  </div>
</template>

<script>
import request from "@/utils/request";
import {Search} from "@element-plus/icons-vue";
import router from "@/router";
import {ElMessage} from "element-plus";
export default {
  name: "index",
  components: {Search},
  data(){
    return {
      expandKeys:[4,5],
      searchInput:'',
      data:[]
    }
  },
  created() {
    this.getList()
  },
  methods:{
    getRowClassName({row}) {
      return row.runner.id ? '' : 'no-expand';
    },
    handleDetail(row){
      router.push({"name":'vuln.detail',query:{id:row.id}})
    },
    handleStop(row){
      request.post(`/api/vuln/${row.id}/stop`).then(res=>{
        ElMessage.success("删除成功")
        this.getList()
      })
    },
    handleStart(row){
      request.post(`/api/vuln/${row.id}/start`).then(res=>{
        ElMessage.success("启动成功")
        this.getList()
      })
    },
    getList(){
      request.get('/api/vuln',{params:{search:this.searchInput}}).then(res=>{
        this.data = res.data.data

      })
    },

  }
}
</script>

<style scoped>
.search{
  background-color: #04122C;
  border-color: transparent;
}
/deep/ .search >.el-input__inner::placeholder {
  color: rgba(255, 255, 255, 0.5);
}
/deep/ .search >.el-input__inner{
  border-color: #FFFFFF;
  color: #FFFFFF;
  background-color: #04122C;
  box-shadow: 0 0 3px 1px #FFFFFF;
}
/deep/ .search >.el-input__inner:focus{
  border-color: transparent;
  box-shadow: 0 0 3px 1px #FFFFFF;
}
/deep/ .search > .el-input__inner::placeholder {
  color: rgba(255, 255, 255, 0.5);
}

/deep/ .search > .el-input__suffix {
  cursor: pointer;
  color: #FFFFFF;
  border-radius: 0 4px 4px 0;
  padding: 0 10px;
  margin-left: -1px;
  border-left: none;
}


.custom-table {
  background-color: #04122C;
}

/deep/ .el-table th{
  background-color: #04122C!important;
}

/deep/ .el-table tr{
  background-color: #04122C;
}

/deep/ .el-table tr:hover>td,/deep/ .el-table tr:focus{
  background-color: #04122C;
}

/deep/ .custom-table .el-table__header {
  background-color: #1976D2;
  color: #FFFFFF;
}

/deep/ .custom-table .el-table__body {
  color: #FFFFFF;
}

/deep/ .custom-table .el-table__row:hover {
  background-color: #0D47A1;
}
/deep/ .custom-table td {
  border-bottom: 1px solid rgba(235, 238, 245, 0.38);
}
/deep/ .custom-table table {
  border-bottom: 1px solid rgba(235, 238, 245, 0.38);
}
/deep/ .custom-table .el-table__footer-wrapper {
  display: none;
}
/deep/ .no-expand  .el-table__expand-icon{
  display: none;
}
</style>