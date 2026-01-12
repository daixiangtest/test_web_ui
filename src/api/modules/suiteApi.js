import request from "../request";
export default {
    // 获取测试套件列表
    getSuiteList(pro_id,modules_id,page,size) {
        return request.get(`/api/test/suite`,{params: {project_id: pro_id,modules_id:modules_id,page:page,size:size}});
    },
    // 创建测试套件
    addSuite(data) {
        return request.post(`/api/test/suite`, data);
    },
    // 获取测试套件详情
    getSuiteDetail(suite_id) {
        return request.get(`/api/test/suite/${suite_id}`);
    },
    // 更新测试套件
    updateSuite(suite_id,data) {
        return request.put(`/api/test/suite/${suite_id}`,data);
    },
    // 删除测试套件
    deleteSuite(suite_id) {
        return request.delete(`/api/test/suite/${suite_id}`);
    },
    // 获取测试用例列表
    getCaseList(pro_id,page,size) {
        return request.get(`/api/test/cases`,{params: {project_id: pro_id,page:page,size:size}});
    },
    // 创建测试用例
    addCase(data) {
        return request.post(`/api/test/cases`, data);
    },
    // 获取测试用例详情
    getCaseDetail(case_id) {
        return request.get(`/api/test/cases/${case_id}`);
    },
    // 更新测试用例
    updateCase(case_id,data) {
        return request.put(`/api/test/cases/${case_id}`,data);
    },
    // 删除测试用例
    deleteCase(case_id) {
        return request.delete(`/api/test/cases/${case_id}`);
    },
    // 复制测试用例
    copyCase(case_id) {
        return request.post(`/api/test/cases/${case_id}`);
    }
};