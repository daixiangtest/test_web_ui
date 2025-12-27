export const leftMenu = [
    {
        name: '项目管理',
        icon: new URL('@/assets/icon2/prom.png', import.meta.url).href,
        index: '1',
        children: [
            { 
                name: '项目列表',
                index: '/project/proList', 
                icon_path: new URL('@/assets/icon2/prolist.png', import.meta.url).href
            }
            ]
    },
    {
        name: '项目详情',
        index: '2',
        icon: new URL('@/assets/icon2/project.png', import.meta.url).href,
        children: [
            { 
                name: '功能模块', 
                index: '/project/moduleList',
                icon_path: new URL('@/assets/icon2/dingshirenwu.png', import.meta.url).href
            },
            { 
                name: '测试环境', 
                index: '/env/envList',
                icon_path: new URL('@/assets/icon2/huanjingguanli.png', import.meta.url).href
            }]
    },
    {
        name: '测试管理',
        index: '3',
        icon: new URL('@/assets/icon2/biz-test-o.png', import.meta.url).href,
        children: [
            { 
                name: '测试用例', 
                index: '/cases/caseList',
                icon_path: new URL('@/assets/icon2/test-case-group.png', import.meta.url).href
            },
            { 
                name: '测试套件', 
                index: '/suits/suitList',
                icon_path: new URL('@/assets/icon2/ceshitaojian.png', import.meta.url).href
            }]
    },
    {
        name: '测试计划',
        index: '4',
        icon: new URL('@/assets/icon2/jiaoben.png', import.meta.url).href,
        children: [
            { 
                name: '任务列表', 
                index: '/plan/taskList',
                icon_path: new URL('@/assets/icon2/APIceshi.png', import.meta.url).href
            },
            { 
                name: '定时任务', 
                index: '/plan/cornList',
                icon_path: new URL('@/assets/icon2/liulanqi_1.png', import.meta.url).href
            }]
    },
    {
        name: '测试报表',
        index: '5',
        icon: new URL('@/assets/icon2/report.png', import.meta.url).href,
        children: [
            { 
                name: '执行记录', 
                index: '/record/recordList',
                icon_path: new URL('@/assets/icon2/zhihangjilu.png', import.meta.url).href
            }
           ]
    },
    {
        name: '设备管理',
        index: '6',
        icon: new URL('@/assets/icon2/shebei.png', import.meta.url).href,
        children: [
            { 
                name: '设备列表', 
                index: '/home/device',
                icon_path: new URL('@/assets/icon2/bijiben.png', import.meta.url).href
            }
           ]
    }

]
