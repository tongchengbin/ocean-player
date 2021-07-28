<template>
  <div>
    <div class="nav">
      <div class="nav-content">
        <el-row :gutter="20">
          <el-col :span="3">
            <router-link to="/" class="logo-menu">
              <img
                  class="logo"
                  src="../assets/logo.svg"
                  alt="BiaoChenXuYing"
              ><span class="logo-title">Ocean</span>
            </router-link>
          </el-col>
          <el-col :span="16">
            <el-menu
                :router="true"
                active-text-color="#409eff"
                text-color="#c7c7c7"
                background-color="#0E1F3E"
                class="el-menu-demo"
                mode="horizontal"
                @select="handleSelect"
            >
              <el-menuItem
                  :route="l.path"
                  :index="l.index"
                  v-for="l in menuList"
                  :key="l.index"
                  class="menu-item"
              >
                <a class="menu-txt">{{ l.name }}</a>
              </el-menuItem>
            </el-menu>
          </el-col>
          <el-col v-if="userInfo.id" :span="5">
            <div class="nav-right">
              <el-dropdown>
                <div class="drop-title-box">
                  <span class="el-dropdown-link drop-title">{{userInfo.username}}</span>
                </div>
                <template #dropdown>
                  <el-dropdown-menu>
                    <el-dropdown-item>个人中心</el-dropdown-item>
                    <el-dropdown-item>登出</el-dropdown-item>
                  </el-dropdown-menu>
                </template>
              </el-dropdown>
            </div>
          </el-col>
          <el-col
              v-else
              :span="4"
          >
            <div class="nav-right">
              <div>
                <el-button
                    size="small"
                    type="primary"
                    @click="handleClick('login')">登录</el-button>
                <el-button
                    size="small"
                    type="danger"
                    @click="handleClick('register')">注册</el-button>
              </div>
            </div>
          </el-col>
        </el-row>
      </div>
    </div>
    <!--    <RegisterAndLogin-->
    <!--        :visible="state.visible"-->
    <!--        :isMobile="state.isMobile"-->
    <!--        :handleFlag="state.handleFlag"-->
    <!--        @ok="handleOk"-->
    <!--        @cancel="handleCancel"-->
    <!--    ></RegisterAndLogin>-->
  </div>
</template>

<script>


import mapState from "vuex/dist/vuex.mjs";
import { useStore } from "vuex"
export default {
  name: "Nav",
  setup() {
    const store = useStore();

    const userInfo=store.getters.user
    const menuList = [
      {
        index: "1",
        path: "/",
        name: "赛事中心",
      },
      {
        index: "2",
        path: "/notice",
        name: "公告",
      },
      {
        index: "3",
        path: "/rank",
        name: "榜单",
      },
    ]
    return {
      menuList,
      userInfo
    }
  },
  methods: {
    handleLogout(){

    },
    handleSelect(){

    },
    handleClick(path){
      this.$router.push(path)
    }
  }

}
</script>


<style scoped lang="less">
.nav {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000;
  width: 100%;
  border-bottom: 1px solid #04122C ;
  background-color: #0E1F3E;
  .el-menu-demo{
    .el-menu-item:hover{
      background:none!important;
    }
    .el-menu-item{
      .menu-txt{
        padding: 10px 10px;
      }
      .menu-txt:hover{
        background-color: #0081ff;
        border-radius: 5px;
      }
      padding: 0 5px!important;
      height: 50px;
      line-height: 50px;
      font-size: 14px;
      font-weight: 400;
      font-family: "Helvetica Neue",Helvetica,Arial,sans-serif;
    }
  }
  .nav-content {
    width: 1200px;
    margin: 0 auto;
  }
  .logo-menu{
    display: flex;
    align-items: center;
    justify-content: center;
    text-decoration: none;

  }
  .logo-title{
    line-height: 50px;
    font-size: 16px;
    font-weight: 500;
    color: #337ab7;
    display: inline-block;
  }
  .logo {
    height: 30px;
    margin: 0;
    border-radius: 50%;
  }

  .el-menu.el-menu--horizontal {
    border-bottom: none;
  }

  .el-menu--horizontal > .el-menu-item {
    cursor: pointer;
    color: #333;
  }

  .nav-right {
    line-height: 50px;
    position: relative;
    text-align: right;

    .el-dropdown {
      cursor: pointer;
      padding-right: 40px;
    }

    .user-img {
      position: absolute;
      top: -15px;
      right: 0;
      width: 50px;
      border-radius: 50%;
    }
  }
}
.drop-title-box{
  .drop-title{
    color:#c7c7c7;
    padding: 10px 10px;
  }
  .drop-title:hover{
    background-color: #0081ff;
    border-radius: 5px;
  }
}

.enter-slideUp,
.leave-slideDown {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 1010;
}

.enter-slideUp {
  overflow: auto;
  visibility: visible;
  z-index: 1001;
  animation: slideUp 0.3s forwards;
}

.leave-slideDown {
  visibility: visible;
  z-index: 1001;
  animation: slideDown 0.3s forwards;
}

@keyframes slideUp {
  from {
    transform: translate3d(0, 100%, 0);
    opacity: 0.1;
  }
  to {
    transform: translate3d(0, 0, 0);
    opacity: 1;
  }
}

@keyframes slideDown {
  from {
    transform: translate3d(0, 0, 0);
  }
  to {
    transform: translate3d(0, 100%, 0);
    opacity: 0;
  }
}

.mask {
  position: fixed;
  z-index: 100;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #000;
  opacity: 0.5;
}

.mask-fade-out {
  animation: maskFadeOut 0.4s forwards;
}

@keyframes maskFadeOut {
  from {
    opacity: 0.5;
  }
  to {
    opacity: 0;
  }
}
</style>
