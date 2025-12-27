import request from "../request";

// 用户相关接口
export default{
    // 用户登录
    LoginApi(data){
        return request.post('/api/users/login',data)
    },
    // 用户注册
    RegisterApi(data){
        return request.post('/api/users/register',data)
    },
    //验证token信息
    verifyToken(data){
        return request.post('/api/users/verify',data)
    },
    // 刷新token
    refreshToken(data){
        return request.post('/api/users/refresh',data)
    }
}