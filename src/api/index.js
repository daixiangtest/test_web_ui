import userApi from './modules/userApi'
import projectApi from './modules/projectApi'
import testApi from "./modules/testApi";
import suiteApi from './modules/suiteApi'
import taskApi from "./modules/taskApi";
import resultApi from "./modules/resultApi";
import deviceApi from './modules/devicesApi'
import runnerApi from './modules/runnerApi'
export default {
  // 用户相关的接口
  user: userApi,
  // 项目相关的接口
  project: projectApi,
  // 用例相关的接口
  testApi: testApi,
  // 套件相关接口
  suiteApi: suiteApi,
  // 任务相关接口
  taskApi: taskApi,
  // 运行记录相关的接口
  resultApi: resultApi,
  //设备相关接口
  deviceApi: deviceApi,
  //运行相关的接口
  runnerApi: runnerApi
}