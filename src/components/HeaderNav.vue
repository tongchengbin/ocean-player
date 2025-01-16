<template>
  <div class="nav-container">
    <div class="nav-content">
      <div class="nav-left">
        <router-link to="/" class="nav-logo">
          <img src="../assets/logo.svg" alt="Ocean" />
          <span>Ocean</span>
        </router-link>
        <nav class="nav-menu">
          <router-link to="/competition" class="nav-menu-item" :class="{ active: isActive('/competition') }">
            赛事中心
          </router-link>
          <router-link to="/notice" class="nav-menu-item" :class="{ active: isActive('/notice') }">
            公告
          </router-link>
          <router-link to="/rank" class="nav-menu-item" :class="{ active: isActive('/rank') }">
            榜单
          </router-link>
          <router-link to="/vulnerability" class="nav-menu-item" :class="{ active: isActive('/vulnerability') }">
            漏洞复现
          </router-link>
        </nav>
      </div>
      <div class="nav-right">
        <router-link v-if="!token" to="/login" class="nav-menu-item">
          登录
        </router-link>
        <div v-else class="nav-user">
          <div class="nav-user-avatar">
            {{ username.charAt(0).toUpperCase() }}
          </div>
          <span>{{ username }}</span>
          <el-dropdown @command="handleCommand">
            <span class="el-dropdown-link">
              <el-icon class="el-icon--right">
                <arrow-down />
              </el-icon>
            </span>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item command="profile">个人中心</el-dropdown-item>
                <el-dropdown-item command="logout" divided>退出登录</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { ElMessageBox } from 'element-plus'
import { ArrowDown } from '@element-plus/icons-vue'
import { getToken, removeToken } from '@/utils/cookie'

export default {
  name: 'HeaderNav',
  components: {
    ArrowDown
  },
  setup() {
    const router = useRouter()
    const route = useRoute()
    const token = ref(getToken())
    const username = ref('test') // 这里应该从用户状态获取

    const isActive = (path) => {
      if (path === '/') {
        return route.path === '/'
      }
      return route.path.startsWith(path)
    }

    const handleCommand = (command) => {
      if (command === 'logout') {
        ElMessageBox.confirm('确认退出登录吗？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          removeToken()
          router.push('/login')
        })
      } else if (command === 'profile') {
        router.push('/profile')
      }
    }

    return {
      token,
      username,
      isActive,
      handleCommand
    }
  }
}
</script>

<style scoped>
/* 样式已经在全局 CSS 中定义 */
</style>
