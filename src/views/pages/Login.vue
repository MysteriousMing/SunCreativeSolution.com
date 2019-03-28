<template>
  <el-container
  class="login-container">
    <el-header>
      <h4 class="mt-2 text-light">Welcome to Sun.</h4>
      <p></p>
    </el-header>
    <el-main class="pt-4">
          <el-card shadow="always"
          class="mx-auto mt-4"
          style="max-width: 400px;width: 90%;">
            <el-form :model="infoForm" status-icon :rules="rules2" ref="infoForm" label-width="100px" class="demo-ruleForm">
              <el-form-item label="用户名" prop="name">
                <el-input v-model="infoForm.name"></el-input>
              </el-form-item>
              <el-form-item label="密码" prop="pass">
                <el-input type="password" v-model="infoForm.pass"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="login">登录</el-button>
              </el-form-item>
            </el-form>
          </el-card>
    </el-main>
  </el-container>
</template>
<script>

export default ({
  name: 'login',
  data () {
    var checkName = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('用户名不能为空'))
      } else {
        callback()
      }
    }
    var validatePass = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('请输入密码'))
      } else if (value.length < 6) {
        return callback(new Error('至少六位密码'))
      } else {
        callback()
      }
    }
    return {
      infoForm: {
        name: '',
        pass: ''
      },
      rules2: {
        name: [
          { validator: checkName, trigger: 'blur' }
        ],
        pass: [
          { validator: validatePass, trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    login () {
      if (!this.infoForm.name || !this.infoForm.pass) return
      this.Http.SimplePost('base/auth-user/', {}, {
        username: this.infoForm.name,
        password: this.infoForm.pass
      }).then(res => {
        if (res.token) {
          window.localStorage.setItem('token', res.token)
          this.$router.push({
            name: 'PostRecord'
          })
        }
      })
    }
  }
})
</script>

<style scoped>
  .login-container {
    background-color: #fafafa;
    position: relative;
  }
  .login-container::after {
    position: absolute;
    content: '';
    width: 100vw;
    height: 100vh;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: #a17c7c;
    background-image: url('https://static.dubheee.cn/sun/header-image/CHEMISTRY.jpg');
    background-size: 140%;
    background-position: center;
    filter: blur(4px);
    z-index: 10;
  }
  .login-container .el-header,
  .login-container .el-card {
    position: relative;
    z-index: 100;
  }
</style>
