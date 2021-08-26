<template>
  <div class="container">
    <el-timeline style="margin-top: 30px">
      <el-timeline-item v-for="item in list" :timestamp="item.create_time" placement="top" >
        <el-card class="notice-card" style="position: relative">
          <img v-if="item.is_top" src="../../assets/置顶.svg" style="position: absolute;width: 50px;left: 0;top: 0">
          <p>{{ item.content }}</p>
        </el-card>
      </el-timeline-item>
    </el-timeline>
  </div>
</template>

<script>
import request from "../../utils/request";
import {ref} from "@vue/reactivity";

export default {
  name: "index",
  created() {
    this.fetchList()
  },
  setup() {
    const list = ref([])
    return {
      list
    }
  },
  methods: {
    fetchList() {
      request.get('/api/notice').then(res => {
        this.list = res.data;
      })
    }
  }
}
</script>

<style scoped>
.notice-card {
  color: #fff;
  background-color: #1b2f53a8;
  border: 1px solid #409eff;
}

>>> .is-top {
  text-align: left;
}

>>> .el-timeline-item {
  color: #1b2f53a8 !important;
}

>>> .el-timeline-item:after {
  color: #42b983 !important;
}

>>> .el-timeline-item__node {
  background-color: #0081ff;
}

>>> .el-timeline-item__tail {
  border-left-color: #2e56a5;
}

</style>