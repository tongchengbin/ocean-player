<template>
  <div class="container">
    <div style="margin-top: 30px">
      <el-row :gutter="20">
        <el-col :span="6" :xs="24">
          <el-card>
            <div slot="header" class="clearfix">
              <div style="margin: 12px auto">About me</div>
              <el-avatar v-if="user.avatar" :src="user.avatar"></el-avatar>
              <el-avatar> {{  user.username.slice(0,1).toUpperCase() }}</el-avatar>
              <div style="margin: 12px auto">{{ user.username }}</div>
            </div>
          </el-card>
        </el-col>
        <el-col :span="18" :xs="24">
          <el-card >
            <el-tabs v-model="activeTab" tab-position="left">
              <el-tab-pane label="账户信息" name="account">
                <account  />
              </el-tab-pane>
              <el-tab-pane label="安全" name="sec">
                <rest-pass :user="user" />
              </el-tab-pane>
            </el-tabs>
          </el-card>
        </el-col>
      </el-row>

    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Account from './components/account'
import RestPass from './components/restPass'
import {ref} from "@vue/reactivity";
export default {
  name: 'Profile',
  components: {Account,RestPass},
  setup() {
    const activeTab= ref("account")
    return {
      activeTab
    }
  },
  computed: {
    ...mapGetters([
      'user',
    ])
  },
  created() {
    this.getUser()
  },
  methods: {
    getUser() {

    }
  }
}
</script>
<style lang="scss" scoped>
:deep(.el-card) {
  color: #fff;
  border: none;
  background-color: #1b2f53a8 !important;
}

:deep(.el-tabs) {
  color: #fff;

  .is-active {
    color: #409eff !important;
  }

  .el-tabs__item {
    color: #fff;
  }
}
</style>