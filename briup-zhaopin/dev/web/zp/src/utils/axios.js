/*
 * @Author: liuyr 
 * axios的配置文件 1、设置post数据格式为表单格式 2、设置基路径 3、序列化字符串
 * @Date: 2019-12-22 19:10:38 
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2019-12-25 11:05:44
 */
import axios from 'axios';
import qs from 'qs';
import config from './config';
//配置
//配置前后端数据交互的请求头：
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';
// 设置后台的访问地址
axios.defaults.baseURL = config.bp;
// 拦截请求
axios.interceptors.request.use((config) => {
	if (config.method === 'post') {
		config.data = qs.stringify(config.data, { arrayFormat: 'repeat' });
	}
	return config;
}, (error) => {
	return Promise.reject(error);
});
// 拦截响应
axios.interceptors.response.use((response) => {
	// 响应成功后拦截
	// response是axios已经封装过后的数据，response.data是服务器返回的数据
	// 封装返回的数据
	let res = {
		...response,
		data: response.data.data,
		status: response.data.status,
		statusText: response.data.message
	};
	return res;
}, (error) => {
	// 响应失败后拦截
	return Promise.reject(error);
});
export default axios;