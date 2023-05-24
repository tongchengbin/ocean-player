<template>
<div class="container">
  <div class="login-box">
    <div class="title-wrap">
      <img style="display: flex" src="../../assets/logo.svg" width="30" height="30" type="image/svg+xml">
      <span style="display: flex;margin-left: 5px;font-size: 22px;color: #fff">Ocean CTF 登录</span>
    </div>
    <el-row>
      <el-col :span="16" :offset="4">
          <el-form class="login-form" style="margin: 20px;">
            <el-form-item style="margin: 20px 4px;">
              <el-input placeholder="请输入用户名" v-model="form.username">
                <template #prepend>
                  <el-icon><User/></el-icon>
                </template>
              </el-input>
            </el-form-item>
            <el-form-item style="margin: 20px 4px;">
              <el-input placeholder="请输入密码" type="password" v-model="form.password">
                <template #prepend>
                  <el-icon><Lock/></el-icon>
                </template>
              </el-input>
            </el-form-item>
            <el-form-item class="login-btn" style="margin: 20px 4px;">
              <el-button type="primary" @click="login">登录</el-button>
            </el-form-item>
          </el-form>
      </el-col>
    </el-row>

  </div>
</div>
</template>

<script>
import {ref} from "@vue/reactivity";
import request from "@/utils/request";
import {setToken} from "@/utils/cookie";

export default {
name: "index",
  setup(){
  const form = ref({
    username:"",
    password:""
  })
  return {
    form
  }
  },
  methods:{
    login(){
      request.post('/api/login',this.form).then(res=>{
        let token = res.data.token
        setToken(token)
        this.$router.replace({path: '/'});
      })

    }
  }
}
</script>

<style scoped >
.login-box {
  padding-top: 10%;
  margin: auto;
  width: 500px;
}
.title-wrap{
  display: flex;
  margin: 20px auto;
  justify-content: center;
  justify-items: center;
  align-items: center;
}

.login-btn >>>  .el-button{
  font-size: 14px;
  font-weight: 500;
  padding: 4px 40px;
}
.login-btn >>>  .el-form-item__content{
  justify-content: center;
}
.login-form >>> .el-input-group__prepend{
  background-color: #0E1F3E;
  border: none;
}
.login-form >>> .el-input-group__prepend{
  background-color: #0E1F3E;
  border: none;
}
</style>
