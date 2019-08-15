import axios from 'axios/index';
//判断所处环境，自动配置基础路径
const BASE_URL = process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : 'http://localhost:5000';
console.log(BASE_URL);
const axiosInstance = axios.create({//创建axios实例对象
  baseURL: BASE_URL,
  timeout: 10000
});
axiosInstance.interceptors.response.use(function (response) {//使用中间件interceptors对响应处理
  const result = response.data;
  if(result.status===0){
    return result.data || {};
  }else{
    return Promise.reject(result.msg  || '请求失败~~');
  }
}, function (error) {
  console.log('请求失败',error);
  return Promise.reject('网络错误');
});
export default axiosInstance;