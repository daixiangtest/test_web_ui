import { createRouter, createWebHistory } from 'vue-router'
import Nprogress from 'nprogress'
import { useStore } from '@/stores/userStore.js';
import { projectStore } from '@/stores/projectStore.js';
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'index',
      redirect: '/login',
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/LoginView.vue'),
    },
    {
      path: '/home',
      name: 'home',
      component: () => import('../views/HomeView.vue'),
      redirect: '/project/proList',
      children: [
        {
          path: '/project/proList',
          name: 'projectList',
          component: () => import('../views/Project/ProjectList.vue'),
          meta: { 
                name: '项目列表',
                icon_path: new URL('@/assets/icon2/prolist.png', import.meta.url).href
            },
        },
        {
          path: '/project/moduleList',
          name: 'ModuleList',
          component: () => import('../views/Project/ModuleList.vue'),
          meta:{ 
                name: '功能模块', 
                icon_path: new URL('@/assets/icon2/dingshirenwu.png', import.meta.url).href
            }
        },
        {
          path: '/env/envList',
          name: 'envList',
          component: () => import('../views/Env/EnvList.vue'),
          meta:{ 
                name: '测试环境', 
                icon_path: new URL('@/assets/icon2/huanjingguanli.png', import.meta.url).href
            }
        },
        {
          path: '/cases/caseList',
          name: 'caseList',
          component: () => import('../views/TestCase/CaseList.vue'),
          meta:{ 
                name: '测试用例', 
                icon_path: new URL('@/assets/icon2/test-case-group.png', import.meta.url).href
            }
        },
        {
          path: '/cases/addCase',
          name: 'addCase',
          component: () => import('../views/TestCase/AddCase.vue'),
          meta:{ 
                name: '添加用例', 
                icon_path: new URL('@/assets/icon2/ceshijihua.png', import.meta.url).href
            }
        },
        {
          path: '/cases/editCase/:case_id',
          name: 'editCase',
          component: () => import('../views/TestCase/EditCase.vue'),
          meta:{ 
                name: '编辑用例', 
                icon_path: new URL('@/assets/icon2/yemian.png', import.meta.url).href
            }
        },
        {
          path: '/suits/suitList',
          name: 'suitList',
          component: () => import('../views/TestSuite/SuiteList.vue'),
          meta:{ 
                name: '测试套件', 
                icon_path: new URL('@/assets/icon2/ceshitaojian.png', import.meta.url).href
            }
        },
        {
          path: '/plan/taskList',
          name: 'taskList',
          component: () => import('../views/Plan/TaskList.vue'),
          meta:{ 
                name: '任务列表', 
                icon_path: new URL('@/assets/icon2/APIceshi.png', import.meta.url).href
            }
        },
        {
          path: '/plan/cornList',
          name: 'cornList',
          component: () => import('../views/Plan/CornList.vue'),
          meta:{ 
                name: '定时任务', 
                icon_path: new URL('@/assets/icon2/liulanqi_1.png', import.meta.url).href
            }
        },
        {
          path: '/record/recordList',
          name: 'recordList',
          component: () => import('../views/TestRecord/RecordList.vue'),
          meta:{ 
                name: '执行记录', 
                icon_path: new URL('@/assets/icon2/zhihangjilu.png', import.meta.url).href
            }
        },
        {
          path: '/home/device',
          name: 'device',
          component: () => import('../views/Home/Device.vue'),
          meta:{ 
                name: '设备列表', 
                icon_path: new URL('@/assets/icon2/bijiben.png', import.meta.url).href
            }
        }
      ]
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('../views/RegisterView.vue'),
    }
  ],
})

// 导航守卫前置
 router.beforeEach(async (to, from) => {
  // 页面跳转进度条开始
  Nprogress.start();
  const ustore = useStore();
  const pstore = projectStore();
  // 保存标签路由信息
  pstore.addtags(to);
  console.log('tags:',pstore.tags);
  var skip=['login','register'];


  
   if (
     // 检查用户是否已登录
     !ustore.token && !skip.includes(to.name)
   ) {
     // 将用户重定向到登录页面
     return { name: 'login' }
   }
 })

//  导航守卫后置
 router.afterEach((to, from) => {
  // 页面跳转进度条结束
  Nprogress.done();
})

export default router
