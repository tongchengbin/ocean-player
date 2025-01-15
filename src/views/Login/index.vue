<template>
<div class="container">
  <div class="login-box">
    <div class="title-wrap">
      <img src="../../assets/logo.svg" width="30" height="30" type="image/svg+xml">
      <span>Ocean CTF 登录</span>
    </div>
    <el-form class="login-form" size="large" @keyup.enter="login">
      <el-form-item>
        <el-input placeholder="请输入用户名" v-model="form.username">
          <template #prepend>
            <el-icon style="width: 100%;height: 100%"><User style="font-size: 20px"/></el-icon>
          </template>
        </el-input>
      </el-form-item>
      <el-form-item>
        <el-input placeholder="请输入密码" type="password" v-model="form.password">
          <template #prepend>
            <el-icon style="width: 100%;height: 100%"><Lock style="font-size: 20px"/></el-icon>
          </template>
        </el-input>
      </el-form-item>
      <el-form-item class="login-btn">
        <el-button type="primary" @click="login">登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</div>
</template>

<script>
import {ref} from "@vue/reactivity";
import request from "@/utils/request";
import {setToken} from "@/utils/cookie";
import { User, Lock } from '@element-plus/icons-vue'

export default {
  name: "index",
  components: {
    User,
    Lock
  },
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
      if (!this.form.username || !this.form.password) {
        return
      }
      request.post('/api/login',this.form).then(res=>{
        let token = res.token
        setToken(token)
        this.$router.replace({path: '/'});
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.container {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;

  .login-box {
    padding-top: 10vh;
    width: 360px;
    .title-wrap {
      display: flex;
      align-items: center;
      justify-content: center;
      margin-bottom: 30px;
      
      img {
        margin-right: 10px;
      }
      
      span {
        font-size: 24px;
        color: #fff;
        font-weight: 500;
      }
    }
    
    .login-form {
      :deep(.el-form-item) {
        margin-bottom: 25px;
        .el-input-group__prepend {
          background-color: transparent;
          color: #fff;
        }
        .el-input__wrapper {
          background-color: rgba(255, 255, 255, 0.05);
          input {
            color: #fff;
            &::placeholder {
              color: #909399;
            }
          }
        }
      }
      
      .login-btn {
        margin-top: 35px;
        :deep(.el-form-item__content) {
          justify-content: center;
          .el-button {
            width: 100%;
            height: 40px;
            font-size: 16px;
            background: #0081ff;
            border: none;
            
            &:hover {
              background: #1890ff;
            }
          }
        }
      }
    }
  }
}
</style>
