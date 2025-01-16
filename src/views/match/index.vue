<template>
  <div class="container">
    <div class="types-container">
      <div class="types-wrapper">
        <button 
          class="type-button"
          :class="{ active: type === '' }"
          @click="changeType('')"
        >全部</button>
        <button 
          class="type-button"
          :class="{ active: type === 'web' }"
          @click="changeType('web')"
        >Web</button>
        <button 
          class="type-button"
          :class="{ active: type === 'crypto' }"
          @click="changeType('crypto')"
        >Crypto</button>
        <button 
          class="type-button"
          :class="{ active: type === 'pwn' }"
          @click="changeType('pwn')"
        >Pwn</button>
        <button 
          class="type-button"
          :class="{ active: type === 'iot' }"
          @click="changeType('iot')"
        >IoT</button>
        <button 
          class="type-button"
          :class="{ active: type === 'misc' }"
          @click="changeType('misc')"
        >Misc</button>
        <button 
          class="type-button"
          :class="{ active: type === 'reverse' }"
          @click="changeType('reverse')"
        >Reverse</button>
      </div>
    </div>

    <div>
      <el-empty v-if="challenges.length===0" description="空空如也"></el-empty>
    </div>

    <transition-group 
      name="challenge-list" 
      tag="div" 
      class="challenges"
      v-if="challenges.length>0"
    >
      <div class="challenge" v-for="challenge in challenges" :key="challenge.id">
        <div class="challenge-box" @click="clickDetail(challenge)">
          <img v-if="challenge.is_solved" src="../../assets/奖章.png" class="ban">
          <div class="challenge-title">{{ challenge.name }}</div>
          <div class="score-wrap">
            {{ challenge.score }}<span>pt</span>
          </div>
          <div class="solved-rank">
            <div class="ico-box">
              <img title="第一滴血" src="../../assets/冠军.svg">
              <img title="第二滴血" src="../../assets/亚军.svg">
              <img title="第三滴血" src="../../assets/季军.svg">
            </div>
          </div>
          <div class="challenge-info">
            题目类型：<span>{{ challenge.type }}</span>
          </div>
          <div class="challenge-info">
            解题人数：<span>{{ challenge.solved_cnt }}</span>
          </div>
        </div>
      </div>
    </transition-group>

    <el-dialog 
      v-model="dialogPopVisible" 
      :show-close="false" 
      class="challenge-pop"
      :before-close="handlerClose"
      width="800px"
    >
      <div class="dialog-content">
        <div class="dialog-header">
          <h1>{{ detail.name }}</h1>
          <div class="challenge-status">
            <span class="score">分值：{{ detail.score }}</span>
            <span :class="['status', detail.get_score ? 'solved' : 'unsolved']">
              {{ detail.get_score ? '已解答' : '未解答' }}
            </span>
          </div>
        </div>

        <div class="blood-ranks">
          <div class="blood" v-if="detail.first_blood">
            <span class="rank-blood">
              <img :title="'第一滴血：'+detail.first_blood" src="../../assets/冠军.svg">
              <span>{{ detail.first_blood }}</span>
            </span>
          </div>
          <div class="blood" v-if="detail.second_blood">
            <span class="rank-blood">
              <img :title="'第二滴血：'+ detail.second_blood" src="../../assets/亚军.svg">
              <span>{{ detail.second_blood }}</span>
            </span>
          </div>
          <div class="blood" v-if="detail.thrid_blood">
            <span class="rank-blood">
              <img :title="'第三滴血：'+ detail.thrid_blood" src="../../assets/季军.svg">
              <span>{{ detail.thrid_blood }}</span>
            </span>
          </div>
        </div>

        <div class="challenge-desc">
          <p>{{ detail.desc }}</p>
        </div>

        <div class="attachment-list">
          <a v-for="item in detail.attachment" 
             :key="item.name"
             :href="item.url" 
             target="_blank"
             class="attachment-item"
          >
            <el-tag effect="dark" class="download-tag">
              <i class="el-icon-download"></i>
              {{ item.name }}
            </el-tag>
          </a>
        </div>

        <div class="container-controls" v-if="detail.active_flag">
          <el-progress 
            v-if="detail.container" 
            :text-inside="true" 
            :stroke-width="20" 
            :percentage="percentage"
            :format="format"
            class="container-progress"
          >
            <span class="progress-text">{{ showText }}</span>
          </el-progress>

          <div class="target-links" v-if="detail.container">
            <template v-for="(i,u) in detail.container.urls" :key="u">
              <el-link type="primary" target="_blank" :href="i.url" class="target-link">
                目标{{u+1}}
              </el-link>
            </template>
          </div>

          <div class="action-buttons">
            <el-button 
              v-if="detail.active_flag && detail.container===null"
              type="primary"
              :loading="starting"
              @click="startContainer"
            >
              启动
            </el-button>
            <el-button 
              v-if="detail.active_flag && detail.container != null"
              type="warning"
              @click="delayed"
            >
              延时
            </el-button>
            <el-button 
              v-if="detail.active_flag && detail.container != null"
              type="danger"
              :loading="destroying"
              @click="destroy"
            >
              销毁
            </el-button>
          </div>
        </div>

        <div class="submit-area">
          <el-input 
            v-model="flag" 
            size="large"
            placeholder="请输入flag"
            class="flag-input"
          >
            <template #prefix>
              <Calendar class="calendar-icon" />
            </template>
          </el-input>
          <el-button 
            type="primary" 
            size="large"
            @click="submit"
          >
            提交
          </el-button>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {ref} from "@vue/reactivity";
import request from "@/utils/request";
import {ElMessage} from "element-plus";
import {Calendar} from "@element-plus/icons-vue";

export default {
  name: "index",
  components: {Calendar},
  created() {
    this.fetchList()
  },
  data() {
    const flag = ref('');
    const dialogPopVisible = ref(false);
    const detail = ref({
      id: null,
      name: '123',
      active_flag: null,
      container: null
    })
    const type = ref('')
    const challenges = ref([])
    const duration = ref(0)
    const percentage = ref(0)
    return {
      starting:false,
      destroying:false,
      showText: "题目倒计时",
      percentage,
      duration,
      flag,
      type,
      detail,
      challenges,
      dialogPopVisible
    }
  },
  methods: {
    format(percentage) {
      return `倒计时:${percentage}%`;
    },
    fetchList() {
      request.get('/api/challenge', {params: {subject: this.type}}).then(res => {
        this.challenges = res.data
      })
    },
    handlerClose(done) {
      clearTimeout(this.func)
      done()
    },
    fetchDetail(id) {
      this.percentage = 0
      let that = this
      clearTimeout(that.func)
      request.get(`/api/challenge/${id}`).then(res => {
        this.detail = res.data
        this.dialogPopVisible = true
        if (res.data.container !== null) {
          let {create_time, timeout} = res.data.container
          let start_time = new Date(create_time).getTime()
          that.func = setInterval(() => {
            let now = new Date().getTime()
            let used = parseInt((now - start_time) / 1000)
            this.showText = `剩余${timeout-used}秒`;
            let percentage = used/timeout
            this.percentage = (percentage > 1 ? 1 : percentage) * 100
            if (percentage > 1) {
              clearTimeout(that.func)
              this.fetchDetail(id)
            }
          }, 1000)
        }
      })
    },
    changeType(type) {
      this.type = type
      this.fetchList()
    },
    clickDetail(item) {
      this.fetchDetail(item.id)
    },
    startContainer() {
      clearTimeout(this.func)
      this.percentage = 0;
      let id = this.detail.id;
      this.starting = true
      request.post(`/api/challenge/${id}/start`).then(res => {
        this.starting = false
        this.fetchDetail(id)
      }).catch(err=>{
        this.starting = false
      })
    },
    delayed() {
      let id = this.detail.id;
      request.post(`/api/challenge/${id}/delayed`).then(res => {
        ElMessage({
          type: "success",
          message: "延迟成功！"
        })
        this.fetchDetail(id)
      })
    },
    destroy() {
      let id = this.detail.id
      this.destroying=true
      request.post(`/api/challenge/${id}/destroy`).then(res => {
        this.destroying = false
        this.fetchDetail(id)
        clearTimeout(this.func)
        ElMessage({
          type: "success",
          message: "销毁成功！"
        })
      }).catch(err=>{
        this.destroying = false
      })
    },
    submit() {
      let data = {
        flag: this.flag,
        id: this.detail.id
      }
      request.post('/api/challenge/submit', data).then(res => {
        this.dialogPopVisible = false;
        ElMessage({
          type: 'success',
          message: '提交成功'
        })
        this.flag = ''
        this.fetchList()
      }).catch(err=>{
        this.fetchDetail(this.detail.id)
      })
    }
  }
}
</script>

<style scoped lang="scss">
.container {
  max-width: 1200px;
  margin: 0 auto;
}

.types-container {
  margin: 0 0 2rem 0;
  padding: 10px 20px;
  backdrop-filter: blur(8px);
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.types-wrapper {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  padding: 0.5rem;
  border-radius: 8px;
}

.type-button {
  padding: 0.35rem 0.8rem;
  border-radius: 6px;
  background: rgba(51, 65, 85, 0.4);
  color: rgba(255, 255, 255, 0.8);
  border: 1px solid rgba(255, 255, 255, 0.1);
  cursor: pointer;
  transition: all 0.2s ease;
  font-size: 0.85rem;
  font-weight: 500;
  white-space: nowrap;

  &:hover {
    background: rgba(71, 85, 105, 0.6);
    color: #fff;
    transform: translateY(-1px);
  }

  &.active {
    background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
    color: #fff;
    border-color: rgba(59, 130, 246, 0.5);
    box-shadow: 0 2px 8px rgba(59, 130, 246, 0.3);
  }
}

.challenges {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  gap: 1.25rem;
  padding: 0 20px;
}

.challenge {
  width: 100%;
}

.challenge-box {
  cursor: pointer;
  padding: 1.25rem;
  position: relative;
  background: rgba(17, 24, 39, 0.95);
  border: 1px solid rgba(99, 179, 237, 0.2);
  border-radius: 12px;
  transition: all 0.3s ease;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);

  &:hover {
    transform: translateY(-2px);
    border-color: rgba(99, 179, 237, 0.4);
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
    background: rgba(17, 24, 39, 0.98);
  }
}

.ban {
  position: absolute;
  top: -10px;
  right: -10px;
  height: 36px;
  width: 36px;
  transform: rotate(30deg);
  filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.2));
  z-index: 1;
}

.challenge-title {
  margin: 0.5rem 0 1rem;
  color: rgba(255, 255, 255, 0.95);
  font-size: 1.1rem;
  font-weight: 600;
  line-height: 1.4;
}

.score-wrap {
  margin: 1rem 0;
  text-align: center;
  font-size: 1.5rem;
  font-weight: 700;
  color: #63b3ed;
  text-shadow: 0 2px 4px rgba(99, 179, 237, 0.3);
  
  span {
    font-size: 0.75rem;
    opacity: 0.9;
    margin-left: 2px;
  }
}

.solved-rank {
  margin: 0.75rem 0;
  text-align: center;
}

.ico-box {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  height: 28px;

  img {
    height: 100%;
    transform: rotate(30deg);
    transition: transform 0.3s ease;

    &:hover {
      transform: rotate(30deg) scale(1.1);
    }
  }
}

.challenge-info {
  margin: 0.75rem 0;
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.8);
  display: flex;
  justify-content: space-between;
  align-items: center;

  span {
    color: #63b3ed;
    font-weight: 500;
  }
}

.challenge-pop {
  :deep(.el-dialog) {
    background: rgba(17, 24, 39, 0.95);
    border-radius: 16px;
    border: 1px solid rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(10px);
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4);
  }

  :deep(.el-dialog__body) {
    padding: 0;
  }
}

.dialog-content {
  padding: 2rem;
}

.dialog-header {
  text-align: center;
  margin-bottom: 1.5rem;

  h1 {
    color: #3b82f6;
    font-size: 1.5rem;
    margin-bottom: 1rem;
    font-weight: 600;
  }
}

.challenge-status {
  display: flex;
  justify-content: center;
  gap: 1rem;
  font-weight: 500;

  .score {
    color: #fff;
  }

  .status {
    padding: 0.25rem 0.75rem;
    border-radius: 6px;
    font-size: 0.9rem;

    &.solved {
      background: rgba(34, 197, 94, 0.2);
      color: #22c55e;
    }

    &.unsolved {
      background: rgba(239, 68, 68, 0.2);
      color: #ef4444;
    }
  }
}

.blood-ranks {
  display: flex;
  justify-content: center;
  gap: 2rem;
  margin: 1.5rem 0;
}

.rank-blood {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #3b82f6;
  font-size: 0.9rem;

  img {
    height: 2rem;
    transform: rotate(30deg);
    transition: transform 0.3s ease;

    &:hover {
      transform: rotate(30deg) scale(1.1);
    }
  }
}

.challenge-desc {
  background: rgba(30, 41, 59, 0.5);
  border-radius: 12px;
  padding: 1.5rem;
  margin: 1.5rem 0;
  color: #e2e8f0;
  line-height: 1.6;
}

.attachment-list {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  margin: 1.5rem 0;
}

.download-tag {
  cursor: pointer;
  transition: all 0.3s ease;
  background: rgba(59, 130, 246, 0.2);
  border-color: rgba(59, 130, 246, 0.3);
  color: #3b82f6;
  padding: 0.5rem 1rem;

  &:hover {
    background: rgba(59, 130, 246, 0.3);
    transform: translateY(-1px);
  }
}

.container-controls {
  margin: 2rem 0;
}

.container-progress {
  width: 70%;
  margin: 0 auto;

  :deep(.el-progress-bar__inner) {
    background: linear-gradient(90deg, #3b82f6, #2563eb);
  }

  .progress-text {
    color: #fff;
    font-weight: 500;
  }
}

.target-links {
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin: 1rem 0;

  .target-link {
    font-size: 0.9rem;
  }
}

.action-buttons {
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin: 1rem 0;
}

.submit-area {
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-top: 2rem;

  .flag-input {
    width: 60%;

    :deep(.el-input__wrapper) {
      background: rgba(30, 41, 59, 0.5);
      border-color: rgba(59, 130, 246, 0.3);
      box-shadow: none;

      &:hover, &:focus {
        border-color: #3b82f6;
      }
    }

    :deep(.el-input__inner) {
      color: #fff;
      height: 42px;
    }
  }

  .calendar-icon {
    color: #3b82f6;
    font-size: 1.2rem;
  }

  .el-button {
    height: 42px;
    padding: 0 2rem;
  }
}

// 列表动画
.challenge-list-enter-active,
.challenge-list-leave-active {
  transition: all 0.5s ease;
}

.challenge-list-enter-from {
  opacity: 0;
  transform: translateY(30px);
}

.challenge-list-leave-to {
  opacity: 0;
  transform: translateY(-30px);
}

.challenge-list-move {
  transition: transform 0.5s ease;
}
</style>
