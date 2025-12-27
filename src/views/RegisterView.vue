<script setup>
import { reactive ,ref} from 'vue';
import api from '@/api/index.js';
import { ElMessage } from 'element-plus'
import { useRouter } from 'vue-router';
// 创建路由对象
var router=useRouter();
// 创建全局对象
var RegisterData=reactive({
  username: '',
  password: '',
  password_confirm: '',
  email: '',
  mobile: '',
  nickname: '',
});

const registerFormRef = ref(null);
//  表单验证规则
const check_data = reactive({
  username: [
    { required: true, message: '请输入用户名', trigger: 'blur' },
    { min: 6, max: 20, message: '用户名长度在6到20位', trigger: 'blur' },
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { min: 6, max: 20, message: '密码长度在6到20位', trigger: 'blur' },
  ],
  email: [
    { type: 'email', message: '请输入正确的邮箱格式', trigger: 'blur' }
  ],
  mobile: [
    { pattern: /^1[3-9]\d{9}$/, message: '请输入正确的手机号格式', trigger: 'blur' }
  ],
  password_confirm: [
    { required: true, message: '请确认密码', trigger: 'blur' },
    { min: 6, max: 20, message: '密码长度在6到20位', trigger: 'blur' },
    {
      // 自定义校验器：确认密码必须与 password 相同
      validator: (rule, value) => {
        if (value !== RegisterData.password) {
          return Promise.reject(new Error('两次输入的密码不一致'));
        }
        return Promise.resolve();
      },
      trigger: 'blur'
    }
  ],

});

// 登录提交
const registerSubmit=(async(registerFormRef)=>{
  await registerFormRef.validate(async(valid) => {
    if (valid) {
      const res=await api.user.RegisterApi(RegisterData);
    if(res.status===200){
     ElMessage({
      message: '注册成功3秒后 跳转至登录页面',
      type: 'success',
      plain: true,
    })
    // 注册成功跳转登录页面
    setTimeout(() => {
      router.push({path:'/login'});
    }, 3000);
  } 
  else{
    ElMessage({
    message: '注册失败',
    type: 'error',
    plain: true,
  })
  }
  }});
});

// 跳转登录页面
const login_to=()=>{
  router.push({path:'/login'});
};
</script>

<template>
  <div class="main">
      <div class="login_box">
        <div class="login_herad">
          <img src="@/assets/images/tag.png" alt="login_logo" class="logo"/>
          <div class="title">注册用户信息</div>
        </div>
        <div class="login_form">
          <el-form :model="RegisterData" :rules="check_data" ref="registerFormRef">
            <el-form-item prop="username">
              <el-input v-model="RegisterData.username" placeholder="请输入用户名" prefix-icon="UserFilled"></el-input>
            </el-form-item>
            <el-form-item prop="password">
              <el-input v-model="RegisterData.password" type="password" placeholder="请输入密码" prefix-icon="Lock" show-password></el-input>
            </el-form-item>
             <el-form-item prop="password_confirm">
              <el-input v-model="RegisterData.password_confirm" type="password" placeholder="请再次确认密码" prefix-icon="Lock" show-password></el-input>
            </el-form-item>
           <el-form-item prop="email">
              <el-input v-model="RegisterData.email" placeholder="请输入邮箱" prefix-icon="Message"></el-input>
            </el-form-item>
             <el-form-item prop="mobile">
              <el-input v-model="RegisterData.mobile" placeholder="请输入手机号" prefix-icon="Iphone"></el-input>
            </el-form-item>
            <el-form-item prop="nickname">
              <el-input v-model="RegisterData.nickname" placeholder="请输入用户昵称" prefix-icon="Avatar"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button @click="registerSubmit(registerFormRef)" type="warning" style="width: 100%;">点击注册</el-button>
            </el-form-item>
          </el-form>
        </div>
        <div class="rejst" style="margin: 0 30px;">
          <el-text class="mx-1" type="warning" @click="login_to">已有账号？ 点击登录</el-text>
        </div>
      </div>
  </div>
  
</template>

<style scoped="lang=scss">
.main {
  width: 100vw;
  height: 100vh;
  background: url("../assets/images/register_bj.png");
  .login_box {
    width: 500px;
    height: 660px;
    background:rgba(255, 255, 255, 0.6);
    position: absolute;
    top: calc(50% - 330px);
    left: calc(50% - 250px);
    box-shadow: 0 0 10px var(--el-color-warning);
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
        color: var(--el-color-warning);
      }
    }
    .login_form {
      margin: 0 30px;
    }
  }
}
</style>