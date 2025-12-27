import { defineStore } from 'pinia'

export const projectStore = defineStore('project', {
  state: () => {
    return{
        isOpenMenu: true,
        tags:[
          {
          name: '项目列表',
          path: '/project/proList',
          icon_path: new URL('@/assets/icon2/prolist.png', import.meta.url).href
        }
        ],
        isShowMenu: true,
        projectInfo:{},
        projectList:[],
        envList:[]
    }
  },

  actions:{
    addtags(to){
      if (to.meta.name){
          const tes = this.tags.find(item => {
            return item.path === to.path
          });
          if(!tes){
            this.tags.push({
              name: to.meta.name,
              path: to.path,
              icon_path: to.meta.icon_path
            })
          }
        }
      },
      

    delTags(path){
      this.tags=this.tags.filter(item=>{
        return item.path!=path
      })
  }

},
persist: {
        enabled: true,
        // 用户状态信息持久化配置
        strategies: [
            {
                key: 'projectStore',
                storage: sessionStorage
            }
        ]
    }


}
)

