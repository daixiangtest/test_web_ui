<script setup>
import { reactive ,computed,ref,onBeforeMount} from 'vue';
import api from '@/api/index.js';
import { ElMessage } from 'element-plus'
import { useRouter } from 'vue-router';
import {useStore} from '@/stores/userStore.js';
// 创建路由对象
var router=useRouter();
// 创建全局对象
var ustore=useStore();
var LoginData=reactive({
  user_name: '',
  password: '',
  status: false,
});

const loginFormRef = ref(null);
//  表单验证规则
const check_data = reactive({
  user_name: [
    { required: true, message: '请输入用户名', trigger: 'blur' },
    { min: 6, max: 20, message: '用户名长度在6到20位', trigger: 'blur' },
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { min: 6, max: 20, message: '密码长度在6到20位', trigger: 'blur' },
  ],

});

// 登录提交
const loginSubmit=(async(loginFormRef)=>{
  await loginFormRef.validate(async(valid) => {
    if (valid) {
      const res=await api.user.LoginApi({
      username:LoginData.user_name,
      password:LoginData.password,
  });
    if(res.status===200){
     ElMessage({
      message: '登录成功',
      type: 'success',
      plain: true,
    })
    // 登录成功跳转首页
    router.push({path:'/home'});
    // 存储用户信息到全局
    ustore.userInfo=res.data.user;
    ustore.token=res.data.token;
    ustore.isAuthenticated=LoginData.status;
  } else if (res.status > 200 && res.status < 500) {
    ElMessage({
    message: res.data.detail,
    type: 'warning',
    plain: true,
  })
  }
  else{
    ElMessage({
    message: '登录失败',
    type: 'error',
    plain: true,
  })
  }
  }});
});
// 开启记住登录时自动登录
onBeforeMount(()=>{
  if(ustore.isAuthenticated && ustore.token){
    ElMessage({
    message: "你已经记住了登录状态，3秒后为你自动登录",
    type: 'warning',
    plain: true,
  })
  setTimeout(()=>{
    router.push({path:'/home'});
  },3000);
    
  }
});
// 登录是否可点击
const isLoginDisabled = computed(() => {
  return !(LoginData.user_name.length >= 6 && LoginData.password.length >= 6)
});

// 跳转注册页面
const rejister_to=()=>{
  router.push({path:'/register'});
};
</script>

<template>
  <div class="main">
      <div class="login_box">
        <div class="login_herad">
          <img src="@/assets/images/tag.png" alt="login_logo" class="logo"/>
          <div class="title">web自动化平台</div>
        </div>
        <div class="login_form">
          <el-form :model="LoginData" :rules="check_data" ref="loginFormRef">
            <el-form-item prop="user_name">
              <el-input v-model="LoginData.user_name" placeholder="请输入用户名" prefix-icon="User"></el-input>
            </el-form-item>
            <el-form-item prop="password">
              <el-input v-model="LoginData.password" type="password" placeholder="请输入密码" prefix-icon="Lock"></el-input>
            </el-form-item>
            <el-form-item >
              <el-switch v-model="LoginData.status" inactive-text="记住登录"/>
            </el-form-item>
            <el-form-item>
              <el-button @click="loginSubmit(loginFormRef)" :disabled="isLoginDisabled" type="primary" style="width: 100%;">点击登录</el-button>
            </el-form-item>
          </el-form>
        </div>
        <div class="rejst" style="margin: 0 30px;">
          <el-text class="mx-1" type="primary" @click="rejister_to">没有账号？ 点击注册</el-text>
        </div>
      </div>
  </div>
  
</template>

<style scoped="lang=scss">
.main {
  width: 100vw;
  height: 100vh;
  background: url("../assets/svg/bj.svg");
  .login_box {
    width: 500px;
    height: 460px;
    background:rgba(255, 255, 255, 0.6);
    position: absolute;
    top: calc(50% - 230px);
    left: calc(50% - 250px);
    box-shadow: 0 0 10px var(--el-color-primary);
    border-radius: 20px;
    background-size: cover;
    .login_herad {
      display: flex;
      justify-content: center;
      align-content: center;
      width: 100%;
      height: 150px;
      text-align: center;
      .logo{
      width: 80px;
      height: 80px;
      margin-right: 30px;
    }
      .title{
        font-size: 30px;
        font-weight: bold;
        margin-top: 15px;
        color: var(--el-color-primary);
      }
    }
    .login_form {
      margin: 0 30px;
    }
  }
}
</style>