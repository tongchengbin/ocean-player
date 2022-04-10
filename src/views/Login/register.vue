<template>
  <div class="container">
    <div class="login-box">
      <div class="title-wrap">
        <img style="display: flex" src="../../assets/logo.svg" width="30" height="30" type="image/svg+xml">
        <span style="display: flex;margin-left: 5px;font-size: 22px;color: #fff">Ocean CTF 注册</span>
      </div>
      <div class="login-form">
        <el-form>
          <el-form-item>
            <el-input placeholder="用户名" v-model="form.username">
              <template #prepend><i class="el-icon-user-solid"></i></template>
            </el-input>
          </el-form-item>
          <el-form-item>
            <el-input placeholder="密码" v-model="form.password" show-password>
              <template #prepend><i class="el-icon-lock"></i></template>
            </el-input>
          </el-form-item>
          <el-form-item>
            <el-input placeholder="确认密码" v-model="form.confirm_password" show-password>
              <template #prepend><i class="el-icon-lock"></i></template>
            </el-input>
          </el-form-item>
          <el-form-item class="login-btn">
            <el-button size="small" type="primary" @click="login">注册</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
import {ref} from "@vue/reactivity";
import request from "@/utils/request";
import {setToken} from "@/utils/cookie";

export default {
  name: "register",
  setup(){
    const form = ref({
      username:"",
      password:"",
      confirm_password:""
    })
    return {
      form
    }
  },
  methods:{
    login(){
      request.post('/api/register',this.form).then(res=>{
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
.login-form{
  margin: 40px auto;
  width: 80%;
}
.login-form .login-btn >>>  .el-button{
  font-size: 14px;
  font-weight: 500;
  padding: 4px 40px;
}
.login-form >>> .el-input{
  width: 80%;
}
.login-form >>> .el-input-group__prepend{
  background-color: #0E1F3E;
  border: none;
}
.login-form >>> .el-input__inner{
  color: #57a3f3;
  border: none;
  background-color: #0E1F3E;
}
</style>
