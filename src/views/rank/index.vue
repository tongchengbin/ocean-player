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

<style lang="scss" scoped>
:deep(.el-table) {
  td {
    border-bottom-color: #2c3e50;
  }
  th:hover > td {
    background-color: #1b2f53a8;
  }
  tr:hover > td {
    background-color: #1b2f53a8;
  }
}

:deep(.el-table::before) {
  background: none;
}

:deep(.el-loading-mask) {
  background-color: #1b2f53a8;
}
</style>