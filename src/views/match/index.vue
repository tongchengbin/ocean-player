<template>
  <div class="container">
    <div class="types">
      <div class="type_items">
        <div class="type_title">类型</div>
        <ul style="display: inline-block">
          <li @click="changeType('')" class="type" :class="type===''?'active':''"><a>全部</a></li>
          <li @click="changeType('web')" class="type" :class="type==='web'?'active':''"><a>Web</a></li>
          <li @click="changeType('crypto')" class="type" :class="type==='crypto'?'active':''"><a>Crypto</a></li>
          <li @click="changeType('pwn')" class="type" :class="type==='pwn'?'active':''"><a>Pwn</a></li>
          <li @click="changeType('iot')" class="type" :class="type==='iot'?'active':''"><a>Iot</a></li>
          <li @click="changeType('misc')" class="type" :class="type==='misc'?'active':''"><a>Misc</a></li>
        </ul>
      </div>
    </div>
    <div>
      <el-empty v-if="challenges.length===0" description="空空如也"></el-empty>
    </div>
    <div class="challenges" v-if="challenges.length>0">
      <div class="challenge" v-for="challenge in challenges">
        <div class="challenge-box" @click="clickDetail(challenge)">
          <img v-if="challenge.is_solved" src="../../assets/奖章.png" class="ban">
          <div class="challenge-title">
            {{ challenge.name }}
          </div>
          <div class="score-wrap">
            {{ challenge.score }}<span style="font-size: 10px">pt</span>
          </div>
          <div class="solved-rank">
            <div class="ico-box">
              <img title="第一滴血：" src="../../assets/冠军.svg">
              <img title="第二滴血" src="../../assets/亚军.svg">
              <img title="第三滴血" src="../../assets/季军.svg">
            </div>
          </div>

          <div style="font-size: .7em;color: #c8d0df;margin: 10px">
            题目类型：<span style="color: #0080ff">{{ challenge.type }}</span>
          </div>
          <div style="font-size: .7em;color: #c8d0df;margin: 10px">
            解题人数：<span style="color: #0080ff">{{ challenge.solved_cnt }}</span>
          </div>
        </div>
      </div>
    </div>
    <el-dialog v-model="dialogPopVisible" center :show-close="false" custom-class="challenge-pop"
               :before-close="handlerClose">
      <h1 style="margin: auto;text-align: center;color: #0080ff">
        {{ detail.name }}
      </h1>
      <div style="text-align: right">
        <strong class="st" style="color: #fff">分值：{{ detail.score }}</strong>
        <strong v-if="detail.get_score" class="st"><b style="color: green">已解答</b></strong>
        <strong v-else class="st"><b style="color: red">未解答</b></strong>
      </div>
      <div style="text-align: center;">
        <div class="blood" v-if="detail.first_blood">
          <span class="rank-blood">
            <img :title="'第一滴血：'+detail.first_blood" src="../../assets/冠军.svg">&nbsp;{{ detail.first_blood }}
          </span>
        </div>
        <div class="blood" v-if="detail.second_blood">
          <span class="rank-blood">
            <img :title="'第二滴血：'+ detail.second_blood" src="../../assets/亚军.svg">&nbsp;{{ detail.second_blood }}
          </span>
        </div>
        <div class="blood" v-if="detail.thrid_blood">
          <span class="rank-blood">
            <img :title="'第三滴血：'+ detail.thrid_blood" src="../../assets/季军.svg">&nbsp;{{
              detail.thrid_blood
            }}</span>
        </div>
      </div>
      <div class="desc">
        <p>{{ detail.desc }}</p>
      </div>
      <div class="attachment">
        <a v-for="item in detail.attachment" :href="item.url" target="_blank">
          <el-tag effect="dark" size="mini">{{ item.name }}</el-tag>
        </a>
      </div>
      <div class="startContainer" v-if="detail.active_flag">
        <el-progress :text-inside="true" v-if="detail.container" :stroke-width="20" :percentage="percentage"
                     color="#c6e2ff"
                     :duration="0"
                     :format="format" class="process">
          <span style="color: #254070;font-weight: bold">{{ showText }}</span>
        </el-progress>
        <div class="url-box" v-if="detail.container">
          <template v-for="u in detail.container.urls">
            <a target="_blank" :href="u.url">目标站点:{{ u.origin }}</a>
          </template>
        </div>
        <el-button v-if="detail.active_flag && detail.container===null" size="mini" type="primary"
                   @click="startContainer">启动
        </el-button>
        <el-button v-if="detail.active_flag && detail.container != null" size="mini" type="primary" @click="delayed">延时
        </el-button>
        <el-button v-if="detail.active_flag && detail.container != null" size="mini" type="danger" @click="destroy">销毁
        </el-button>
      </div>
      <div class="submit">
        <el-input size="small" v-model="flag">
          <template #prepend><i class="el-icon-s-flag"></i></template>
        </el-input>
        <el-button size="small" type="primary" @click="submit">提交</el-button>
      </div>
    </el-dialog>
  </div>

</template>

<script>
import {ref} from "@vue/reactivity";
import request from "@/utils/request";
import formatSeconds from "@/utils/tools"
import {ElMessage} from "element-plus";


export default {
  name: "index",
  created() {
    this.fetchList()
  },
  setup() {
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
          // 这里不能用本地时间计算
          let {create_time, timeout} = res.data.container
          let start_time = new Date(create_time).getTime()
          that.func = setInterval(() => {
            // 获取当前时间
            let now = new Date().getTime()
            // 已消耗时间
            let used = (now - start_time) / 1000
            this.showText = `剩余${timeout-used}秒`;
            let percentage = used/timeout
            this.percentage = (percentage > 1 ? 1 : percentage) * 100
            console.log(this.percentage)
            if (percentage > 1) {
              clearTimeout(that.func)
              this.fetchDetail(id)
            }
          }, 1000)
        }
      }).catch(err => {

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
      // 清除定时器
      clearTimeout(this.func)
      this.percentage = 0;
      let id = this.detail.id;
      request.post(`/api/challenge/${id}/start`).then(res => {
        this.fetchDetail(id)
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
      request.post(`/api/challenge/${id}/destroy`).then(res => {
        this.fetchDetail(id)
        clearTimeout(this.func)
      })
    },
    openUrl() {
      let url = this.detail.container.url;
      window.open(url)

    },
    submit() {
      // 提交flag
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
<style scoped lang="less">
.url-box {
  margin: 10px;
  padding: 10px;

  a {
    text-decoration-color: #0080ff;
    color: #fff;
  }
}

.types {
  margin: 20px 10px;

  .type_title {
    display: inline-block;
    color: #fff;
  }

  .type_items {
    text-align: left;
  }

  .active a {
    color: #04122C !important;
    background: #0081ff;
  }

  .type {
    cursor: pointer;
    display: inline-block;
    color: #fff;
    margin: 2px 2px;
    padding: 0 4px;

    a {
      padding: 3px 10px;
      border-radius: 3px;
      color: #cac4b7;
      text-decoration: none
    }
  }
}

.challenges {

  display: flex;
  flex-wrap: wrap;
}

.challenge {
  width: 25%;
}

.challenge-box {
  cursor: pointer;
  padding: 10px;
  position: relative;
  margin: 10px;
  background-color: #1b2f53a8 !important;

  .ban {
    -webkit-transform: rotate(30deg);
    top: -10px;
    right: -10px;
    position: absolute;
    height: 40px;
    width: 40px;
  }

  .challenge-title {
    margin: 3px 4px;
    color: #0080ff;
    font-size: 16px;
    font-weight: 700;
  }

  .score-wrap {
    margin: 12px;
    text-align: center;
    font-size: 20px;
    font-weight: 700;
    color: #0081ff;
    height: 30px;
    line-height: 30px;
  }

  .solved-rank {
    margin: 6px;

    img {
      margin: 0 4px;
    }
  }
}

.challenge-box:hover {
  background-color: #1b2f53a8 !important;
}

.ico-box {
  height: 30px;

  img {
    -webkit-transform: rotate(30deg);
    height: 100%;
  }
}

/deep/ .challenge-pop {
  width: 44em !important;
  background-color: #1b2f53e8;

  .el-dialog__header {
    display: none;
  }

  .el-dialog__body {
    padding-top: 10px;
  }

  h1 {
    color: #fff;
    font-size: 1.3em;
  }

  .st {
    margin-left: 1.2em;
    margin-right: 0;
    width: auto;
    font-weight: 700;
  }

  .blood {
    margin: 10px 10px;
    display: inline-block;
  }

  .rank-blood {
    font-size: 14px;
    display: flex;
    align-items: center;
    justify-content: center;
    text-decoration: none;
    color: #0080ff;

    img {
      height: 30px;
      -webkit-transform: rotate(30deg);
    }
  }

  .desc {
    width: 100%;
    color: #e1e1ff;
    margin-bottom: 10px;
    padding: 10px 20px;
  }

  .attachment {
    margin: 10px;
  }

  .submit {
    text-align: center;

    .el-input {
      width: 50%;
    }

    .el-input__inner {
      color: yellow;
      border: 1px solid #0080ff;;
      background-color: #1b2f53a8;
    }

    .el-input-group__prepend {
      border: 1px solid #0080ff;;
      background-color: #1b2f53a8;
    }

    .el-icon-s-flag {
      color: #0080ff;
    }

    .el-button {
      margin-left: 10px;
    }
  }

  .startContainer {
    text-align: center;
    margin: 20px auto;

    .process {
      width: 60%;
      margin: 16px auto;

    }
  }
}

/deep/ .el-progress-bar__inner {
  background-color: #66b1ff !important;
}

.dialog /deep/ .el-dialog__wrapper {
  background-color: rgba(0, 0, 0, 0.8);
}

/deep/ .el-empty__image {
  polygon, rect, g, path {
    fill: #66b1ff;
  }
}
</style>
