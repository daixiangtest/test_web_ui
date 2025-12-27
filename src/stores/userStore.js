import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import uapi from '@/api/modules/userApi.js'
export const useStore = defineStore('user', {
    // 定义全局数据
  state: () => {
    return{
      userInfo: null,
      token: null,
      isAuthenticated: false
    }
  },
  persist: {
        enabled: true,
        // 用户状态信息持久化配置
        strategies: [
            {
                key: 'userStore',
                storage: localStorage
            }
        ]
    },

  actions:{
    // 设置 token（并同步到 localStorage）
    setToken(token) {
      this.token = token;
      if (token) localStorage.setItem('token', token);
      else localStorage.removeItem('token');
    },

    // 清理认证信息（登出或刷新失败时调用）
    clearAuth() {
      this.userInfo = null;
      this.token = null;
      this.isAuthenticated = false;
      this.$reset();
      // 如果你想清空 pinia 的持久化数据，也可以调用 this.$reset()
    },

    // 刷新 token（调用后端 refresh 接口）
    async refreshToken() {
      // 若没有 token，直接抛出
      if (!this.token) {
        throw new Error('no token');
      }
      try {
        // 调用后端刷新接口
        const res = await uapi.refreshToken({ token: this.token }); // 当前请求会携带 Authorization header

        if (res && res.status === 200) {
          // 假设返回体含新的 token 字段 res.data.token
          const newToken = res.data.token;
          if (newToken) {
            this.setToken(newToken);
            return true;
          }
        } 
        else{
          throw new Error('refresh failed');
        }
      } catch (err) {
        this.clearAuth();
        throw err;
      }
    }
  }
})
