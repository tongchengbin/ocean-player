<template>
<div class="container">
  <div style="margin-top: 30px">
  </div>
  <score-rank style="padding: 20px 0"></score-rank>
</div>
</template>

<script>

import scoreRank from "./components/scoreRank";

export default {
  name: "index",
  components:{
    scoreRank
  }
}
</script>

<style scoped lang="less">
/deep/ .el-table{
  color: #fff;
  background-color: #1b2f53a8;
  thead{
    color: #0081ff;
  }
  tr,th{
    background-color: #1b2f53a8;
    border-bottom-color: #2c3e50;
  }
  td{
    border-bottom-color: #2c3e50;
  }
  th:hover > td{
    background-color: #1b2f53a8;
  }
  tr:hover > td{
    background-color: #1b2f53a8;
  }
}
/deep/ .el-table::before{
  background: none;
}
/deep/ .el-loading-mask{
  background-color:#1b2f53a8
}
</style>