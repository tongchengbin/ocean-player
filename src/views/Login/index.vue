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
  <div class="profile-container" v-if="activeTab === 'profile'">
    <div class="profile-header">
      <div class="avatar-section">
        <div class="avatar">
          <span class="avatar-text">{{ username.charAt(0).toUpperCase() }}</span>
        </div>
        <h2 class="username">{{ username }}</h2>
      </div>
    </div>
    <div class="profile-form">
      <div class="form-group">
        <label class="form-label">当前密码</label>
        <el-input 
          v-model="form.oldPassword" 
          type="password"
          placeholder="请输入当前密码"
          class="form-input"
        />
      </div>
      <div class="form-group">
        <label class="form-label">新密码</label>
        <el-input 
          v-model="form.newPassword" 
          type="password"
          placeholder="请输入新密码"
          class="form-input"
        />
      </div>
      <div class="form-group">
        <label class="form-label">确认密码</label>
        <el-input 
          v-model="form.confirmPassword" 
          type="password"
          placeholder="请再次输入新密码"
          class="form-input"
        />
      </div>
      <div class="form-actions">
        <el-button 
          type="primary" 
          @click="handleSubmit"
          :loading="loading"
          class="submit-btn"
        >
          保存修改
        </el-button>
      </div>
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
      password:"",
      oldPassword:"",
      newPassword:"",
      confirmPassword:""
    })
    const activeTab = ref('login')
    const username = ref('')
    const loading = ref(false)

    return {
      form,
      activeTab,
      username,
      loading
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
    },
    handleSubmit(){
      // todo
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

.profile-container {
  max-width: 600px;
  margin: 40px auto;
  padding: 20px;
  background: rgba(30, 41, 59, 0.8);
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.profile-header {
  margin-bottom: 40px;
  text-align: center;
}

.avatar-section {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
}

.avatar {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: linear-gradient(135deg, #3b82f6, #1d4ed8);
  display: flex;
  align-items: center;
  justify-content: center;
  
  .avatar-text {
    font-size: 32px;
    color: #ffffff;
    font-weight: bold;
  }
}

.username {
  color: #ffffff;
  font-size: 24px;
  margin: 0;
}

.profile-form {
  .form-group {
    margin-bottom: 24px;
  }

  .form-label {
    display: block;
    color: #e5e7eb;
    margin-bottom: 8px;
    font-size: 14px;
  }

  .form-input {
    :deep(.el-input__wrapper) {
      background-color: rgba(255, 255, 255, 0.05);
      border: 1px solid rgba(255, 255, 255, 0.1);
      box-shadow: none;
      
      &:hover, &:focus {
        border-color: #3b82f6;
      }
      
      &.is-focus {
        box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.2);
      }
      
      .el-input__inner {
        color: #ffffff;
        
        &::placeholder {
          color: rgba(255, 255, 255, 0.4);
        }
      }
    }
  }

  .form-actions {
    margin-top: 32px;
    text-align: center;
    
    .submit-btn {
      width: 200px;
      height: 40px;
      background: linear-gradient(135deg, #3b82f6, #1d4ed8);
      border: none;
      font-weight: 500;
      
      &:hover {
        background: linear-gradient(135deg, #2563eb, #1e40af);
      }
      
      &:active {
        transform: translateY(1px);
      }
    }
  }
}
</style>
