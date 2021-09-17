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
    <div class="challenges">
        <div class="challenge" v-for="challenge in challenges">
          <div class="challenge-box" @click="clickDetail(challenge)">
            <img v-if="challenge.is_solved" src="../../assets/奖章.png" class="ban">
            <div class="challenge-title">
              {{challenge.name}}
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
              题目类型：<span style="color: #0080ff">Web</span>
            </div>
            <div style="font-size: .7em;color: #c8d0df;margin: 10px">
              解题人数：<span style="color: #0080ff">200</span>
            </div>
          </div>
        </div>
    </div>
    <el-dialog v-model="dialogPopVisible" center :show-close="false" custom-class="challenge-pop">
      <h1 style="margin: auto;text-align: center;color: #0080ff">
        {{detail.name}}
      </h1>
      <div style="text-align: right">
        <strong class="st" style="color: #fff">分值：500</strong>
        <strong class="st"><b style="color: red">未解答</b></strong>
      </div>
      <div style="text-align: center;">
        <div class="blood">
          <span class="rank-blood"><img title="第一滴血：" src="../../assets/冠军.svg">&nbsp;404</span>
        </div>
        <div class="blood">
          <span class="rank-blood"><img title="第一滴血：" src="../../assets/冠军.svg">&nbsp;404</span>
        </div>
        <div class="blood">
          <span class="rank-blood"><img title="第一滴血：" src="../../assets/冠军.svg">&nbsp;404</span>
        </div>
      </div>
      <div class="desc">
        <p>{{detail.desc}}</p>
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
import {ElMessage} from "element-plus";


export default {
  name: "index",
  created() {
    this.fetchList()
  },
  setup() {
    const flag = ref('');
    const dialogPopVisible = ref(false);
    const detail=ref({
      name:'123'
    })
    const type = ref('')
    const challenges = ref([])
    return {
      flag,
      type,
      detail,
      challenges,
      dialogPopVisible
    }
  },

  methods: {
    fetchList() {
      request.get('/api/challenge', {params:{subject: this.type}}).then(res => {
        this.challenges = res.data

      })
    },
    changeType(type) {
      this.type = type
      this.fetchList()

    },
    clickDetail(item){
      console.log("----")
      this.detail = item
      this.dialogPopVisible = true
    },
    submit(){
      // 提交flag
      let data = {
        flag:this.flag,
        id:this.detail.id
      }
      request.post('/api/challenge/submit',data).then(res=>{
        this.dialogPopVisible = false;
        ElMessage({
          type:'success',
          message:'提交成功'
        })
        this.flag = ''
        this.fetchList()
      })
    }
  }
}
</script>
<style scoped lang="less">
.container {
  margin: auto;
  width: 1100px;
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
.challenges{

  display: flex;
  flex-wrap: wrap;
}
.challenge{
  width: 25%;
}
.challenge-box{
  cursor: pointer;
  padding: 10px;
  position: relative;
  margin: 10px;
  background-color: #0E1F3E !important;
  .ban{
    -webkit-transform: rotate(
        30deg
    );
    top: -10px;
    right: -10px;
    position: absolute;
    height: 40px;
    width: 40px;
  }
  .challenge-title{
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
    color: #ffc600;
    height: 30px;
    line-height: 30px;
  }
  .solved-rank{
    margin: 6px;
    img{
      margin: 0 4px;
    }
  }
}

.challenge-box:hover {
  background-color: #0E1F3E !important;
}
.ico-box{
  height: 30px;
  img{
    -webkit-transform: rotate(
        30deg
    );
    height: 100%;
  }
}
/deep/ .challenge-pop{
  width: 44em!important;
  background-color: #0E1F3E;
  .el-dialog__header{
    display: none;
  }
  .el-dialog__body{
    padding-top: 10px;
  }
  h1{
    color: #fff;
    font-size: 1.3em;
  }
  .st{
    margin-left: 1.2em;
    margin-right: 0;
    width: auto;
    font-weight: 700;
  }
  .blood{
    margin: 10px 10px;
    display: inline-block;
  }
  .rank-blood{
    font-size: 14px;
    display: flex;
    align-items: center;
    justify-content: center;
    text-decoration: none;
    color: #0080ff;
    img{
      height: 30px;
      -webkit-transform: rotate(30deg);
    }
  }
  .desc{
    width: 100%;
    color: #e1e1ff;
    margin-bottom: 30px;
    padding: 10px 20px;
  }
  .submit {
    text-align: center;
    .el-input{
      width: 50%;
    }
    .el-input__inner{
      color: yellow;
      border: 1px solid #0080ff;;
      background-color: #0E1F3E;
    }
    .el-input-group__prepend{
      border: 1px solid #0080ff;;
      background-color: #0E1F3E;
    }
    .el-icon-s-flag{
      color: #0080ff;
    }
    .el-button{
      margin-left: 10px;
    }
  }

}
</style>
