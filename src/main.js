import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import piniaPluginPersist from 'pinia-plugin-persist'
import 'nprogress/nprogress.css'
import App from './App.vue'
import router from './router'

// elenmentplus的位置
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import { useStore as useUserStore } from '@/stores/userStore.js';
const app = createApp(App)

app.use(ElementPlus, {
    locale: zhCn,
})

// 全局注册图标
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}

// 使用pinia持久化插件
const pinia = createPinia()
pinia.use(piniaPluginPersist)
app.use(pinia)
app.use(router)
// 启动 token 定期刷新任务
const startTokenRefreshTask = () => {
  const user = useUserStore();

  // 刷新封装：出现异常跳转登录
  const tryRefresh = async () => {
    try {
      // 若没有 token，直接跳转登录（按需）
      if (!user.token) {
        // 如果你希望在未登录时不自动跳转，可以把下面注释掉
        router.push({ name: 'login' });
        return;
      }
      await user.refreshToken();
      // 可选：控制台日志
      console.log('token refreshed at', new Date().toLocaleString());
    } catch (err) {
      console.warn('token refresh failed, redirect to login', err);
      // 跳回登录页
      router.push({ name: 'login' });
    }
  };

  // 立即执行一次
  tryRefresh();

  // 每 30 分钟执行一次（30*60*1000 ms）
  const intervalMs = 30 * 60 * 1000;
  setInterval(tryRefresh, intervalMs);
};

startTokenRefreshTask();
app.mount('#app')
