
import request from "../request";

// 项目相关接口
export default {
    // 获取项目列表
    getProjectList(page, size) {
        return request.get('/api/pro/projects',{
            params: {
                 page: page,
                size: size
            },
        });
    },
    // 创建项目
    addProject(data) {
        return request.post('/api/pro/projects', data);
    },
    // 编辑项目
    updateProject(pro_id, data) {
        return request.put(`/api/pro/projects/${pro_id}`, data);
    },
    // 删除项目
    deleteProject(pro_id) {
        return request.delete(`/api/pro/projects/${pro_id}`);
    },
    // 获取项目详情
    getProjectDetail(pro_id) {
        return request.get(`/api/pro/projects/${pro_id}`);
    },
    // 创建项目模块
    addProjectModule(data) {
        return request.post(`/api/pro/modules`, data);
    },
    // 获取项目模块列表
    getProjectModuleList(pro_id,page,size) {
        return request.get(`/api/pro/modules`,{params: {project_id: pro_id,page,size}});
    },
    // 获取项目模块详情
    getProjectModuleDetail(pro_id,module_id) {
        return request.get(`/api/pro/modules/${module_id}`,{params: {project_id: pro_id}});
    },
    // 更新项目模块
    updateProjectModule(module_id,data) {
        return request.put(`/api/pro/modules/${module_id}`,data);
    },
    // 删除项目模块
    deleteProjectModule(module_id) {
        return request.delete(`/api/pro/modules/${module_id}`);
    },
    // 创建环境
    addEnvironment(data) {
        return request.post(`/api/pro/envs`, data);
    },
    // 获取环境列表
    getEnvironmentList(pro_id,page,size) {
        return request.get(`/api/pro/envs`,{params: {project_id: pro_id,page:page,size:size}});
    },
    // 获取环境详情
    getEnvironmentDetail(env_id) {
        return request.get(`/api/pro/envs/${env_id}`);
    },
    // 更新环境
    updateEnvironment(env_id,data) {
        return request.put(`/api/pro/envs/${env_id}`,data);
    },
    // 删除环境
    deleteEnvironment(env_id) {
        return request.delete(`/api/pro/envs/${env_id}`);
    }
}