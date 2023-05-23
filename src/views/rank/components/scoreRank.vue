<template>
    <el-table :data="list" v-loading="loading" style="border-radius: 4px">
      <el-table-column prop="rank" label="排名" width="50"></el-table-column>
      <el-table-column prop="username" label="用户"></el-table-column>
      <el-table-column prop="score" label="积分"></el-table-column>
      <el-table-column prop="cnt" label="解题数"></el-table-column>
      <el-table-column prop="strong" label="强项"></el-table-column>
      <el-table-column prop="last_time" label="最近解题时间"></el-table-column>
    </el-table>
    <div class="pagination-container">
      <el-pagination
          :current-page="listQuery.page"
          :page-size="listQuery.page_size"
          :page-sizes="[10,20,30, 50]"
          :total="total"
          layout="total, prev, pager, next"
          @current-change="handleCurrentChange"
      />
    </div>

</template>

<script>
import {ref} from "@vue/reactivity";
import request from "../../../utils/request";
export default {
  name: "scoreRank",
  setup(){
    const listQuery = ref({
      page:1,
      page_size:20
    })
    const loading = ref(true)
    const list = ref([])
    const total = ref(0)
    return {
      listQuery,
      loading,
      list,
      total,

    }
  },
  created() {
    this.fetchList()

  },
  methods:{
    fetchList(){
      this.loading = true
      request.get("/api/rank/score",{params:this.listQuery}).then(res=>{
        this.list = res.data.data;
        this.total = res.data.total;
        this.loading = false;
      })
    },
    handleCurrentChange(e){
      this.listQuery.page = e;
      this.fetchList()
    },
  }

}
</script>

<style scoped lang="less">
/deep/ .btn-prev{
  background:none!important;
}
/deep/ .btn-next{
  background:none!important;
}
/deep/ .el-pager > .number {
  background: none;
}
/deep/ .el-pagination__total{
  color:#c0c4cc
}


</style>