<template>
  <el-form :model="form" ref="form_rest"  class="form" label-position="top" :rules="rules">
    <el-form-item label="当前密码" prop="old_password">
      <el-input  v-model="form.old_password" :show-password="true"></el-input>
    </el-form-item>
    <el-form-item label="密 码" prop="password">
      <el-input  v-model="form.password" :show-password="true"></el-input>
    </el-form-item>
    <el-form-item label="确认密码" prop="confirm_password">
      <el-input  v-model="form.confirm_password" :show-password="true"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary"  @click="submit">提交</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import {mapGetters, useStore} from "vuex";
import {ref} from "@vue/reactivity";
import request from "../../../utils/request";
import {ElMessage} from "element-plus";
import store from "../../../store";

export default {
  name: "rest-pass",
  setup() {
    const store = useStore();
    const user = store.getters.user
    const form = ref({
      old_password: null,
      confirm_password: null,
      password: null
    })
    const validatePass2 = (rule, value, callback) => {
      console.log(value,form,form.value.password)
      if (form.value.confirm_password === form.value.password) {
        callback();
      } else {
        callback(new Error("两次输入密码不一致!"));
      }
    };
    return {
      form,
      rules: {
        old_password: [
          { required: true, message: '请属于原密码', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' }
        ],
        confirm_password: [
          { required: true, message: '请再次确认密码', trigger: 'blur' },
          { validator: validatePass2, trigger: "blur" }
        ]
      }
    }
  },
  computed: {
    ...mapGetters([
      'user',
    ])
  },
  methods: {
    submit() {
      this.$refs['form_rest'].validate((valid) => {
        if(valid){
          let data = {
            password: this.form.password,
            old_password: this.form.old_password
          }
          request.post('/api/rest_pass', data).then(res => {
            ElMessage({
              message: "信息更新成功",
              type: "success"
            })
          }).catch()
        }else{
          return false
        }
      })

    }
  }

}
</script>
<style lang="scss" scoped>
.form {
  color: #fff;

  :deep(.el-form-item__label) {
    color: #fff;
  }
  .el-input-group__prepend {
    background-color: rgb(25, 35, 50);
    border: none;
  }

  :deep(.el-input__inner) {
    color: #fff;
    border: none;
  }
}
</style>