<template>
  <div class="container">
    <div class="login-box">
      <div class="title-wrap">
        <img style="display: flex" src="../../assets/logo.svg" width="30" height="30" type="image/svg+xml">
        <span style="display: flex;margin-left: 5px;font-size: 22px;color: #fff">Ocean CTF 注册</span>
      </div>
      <el-row>
        <el-col :span="16" :offset="4">
          <el-form class="login-form">
            <el-form-item>
              <el-input placeholder="用户名" v-model="form.username">
                <template #prepend>
                  <el-icon><User/></el-icon>
                </template>
              </el-input>
            </el-form-item>
            <el-form-item>
              <el-input placeholder="密码" type="password" v-model="form.password">
                <template #prepend>
                  <el-icon><Lock/></el-icon>
                </template>
              </el-input>
            </el-form-item>
            <el-form-item>
              <el-input placeholder="确认密码" type="password" v-model="form.confirm_password">
                <template #prepend>
                  <el-icon><Lock/></el-icon>
                </template>
              </el-input>
            </el-form-item>
            <el-form-item class="login-btn">
              <el-button type="primary"  @click="login">注册</el-button>
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
import {Clock} from "@element-plus/icons-vue";
import {ElMessage} from "element-plus";
import router from "@/router";

export default {
  name: "register",
  components: {Clock},
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
        ElMessage.success("注册成功")
        router.push({path: '/'});
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
.login-form .login-btn >>>  .el-button{
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
.login-form >>> .el-input__inner{
  color: #57a3f3;
  border: none;
}
</style>
