import axios from "axios";
import { useStore } from '@/stores/userStore.js';

//  关联axios 对象的初始文件
// 创建一个axios请求对象
const request = axios.create({
	// baseurl地址
	baseURL: "http://127.0.0.1:8000",
	timeout: 10000,
	// 全局请求头
	headers: {
		'Content-Type': "application/json"
	},
	// 设置请求成功的状态码范围
	validateStatus: function(status) {
		return true
	},
	// 允许发送跨域请求
	crossDomain: true,
	// `withCredentials` 表示跨域请求时是否需要使用凭证
	withCredentials: false, // defaultK
})

// 设置请求拦截器
request.interceptors.request.use(function(config) {
	var uStore=useStore();
	// 在发送请求判断路由是否需要添加用户权限信息
	const normalRoutes = ['/api/users/register', '/api/users/login','/api/users/verify','/api/users/refresh'];
	if (!normalRoutes.includes(config.url)) {
		// 获取本地存储的token
		let token = localStorage.getItem('token');
		if (token) {
			config.headers.Authorization = `Bearer ${uStore.token}`;
		}
		else{
			if (uStore.token) {
			config.headers.Authorization = `Bearer ${uStore.token}`;
			}
			else{
				window.location.href="/login";
			}
		}
	}
	return config;
}, function(error) {
	// 对请求错误做些什么
	return Promise.reject(error);
});

// 设置响应拦截器
request.interceptors.response.use(function(response) {
	// 2xx 范围内的状态码都会触发该函数。
	// 对响应数据做点什么
	return response;
}, function(error) {
	// 超出 2xx 范围的状态码都会触发该函数。
	// 对响应错误做点什么
	return Promise.reject(error);
});

export default request;