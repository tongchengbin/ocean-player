<template>
  <el-form ref="form_account" :model="form"  class="form" label-position="top" :rules="rules">
    <el-form-item label="用户名" prop="username">
      <el-input v-model="form.username"  ></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submit">提交</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import {mapGetters, useStore} from "vuex";
import {reactive, ref} from "@vue/reactivity";
import request from "../../../utils/request";
import {ElMessage} from "element-plus";
import store from "../../../store";

export default {
  name: "account",
  setup(){
    const store = useStore();
    const user = store.getters.user
    const form = ref({
      username: user.username
    })
    return {
      form,
      rules: {
        username: [
          { required: true, message: '请输入活动名称', trigger: 'blur' },
          { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
        ]
      },
    }
  },
  computed: {
    ...mapGetters([
      'user',
    ])
  },
  methods:{
    submit(){
      this.$refs['form_account'].validate((valid) => {
        if(valid){
          let data = {
            username:this.form.username
          }
          request.post('/api/user',data).then(res=>{
            ElMessage({
              message:"信息更新成功",
              type: "success"
            })
            store.dispatch('getInfo')
          })
        }else{
          console.log("valid error")
          return false
        }
      })
    }
  }
}
</script>

<style scoped lang="less">
.form  {
  color: #fff;
  /deep/ .el-form-item__label{
    color: #fff;
  }
  .el-input-group__prepend{
    background-color: #0E1F3E;
    border: none;
  }
  /deep/ .el-input__inner{
    color: #fff;
    border: none;
    background-color: #0E1F3E;
  }
}
</style>