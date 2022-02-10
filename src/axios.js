import axios from 'axios'
import router from './router'
import Element from 'element-ui'

//axios.defaults.baseURL = 'http://localhost:8081'

const request = axios.create({
    timeout: 5000,
    headers: {
        'Content-Type': 'application/json;charset=utf-8'
    }
})

//设置请求带头上token
request.interceptors.request.use(config => {
    config.headers['Authorization'] = localStorage.getItem("token");
    return config;
})

//拦截请求响应
request.interceptors.response.use(response => {
    let result = response.data;
    if (result.code == 200) {
        return response;
    } else {
        Element.Message.error(result.msg ? result.msg : '系统异常!', {duration: 3 * 1000});
        return Promise.reject(response.data.msg);
    }
}, error => {
    console.log(error)
    if (error.response.data) {
        error.message = error.response.data.msg;
    }
    if (error.response.status === 401) {
        router.push("/login")
    }
    Element.Message.error(error.message, {duration: 3 * 1000})
    return Promise.reject(error);
})

export default request;