import axios from 'axios'
import store from '@/store'
import {getToken, removeToken} from './cookie'
import { ElMessage } from "element-plus";
import {createRouter as routers} from "vue-router/dist/vue-router.esm-browser";
import router from "../router";

// create an axios instance
const service = axios.create({
    baseURL: import.meta.env.VITE_APP_BASE_API, // url = base url + request url
    // withCredentials: true, // send cookies when cross-domain requests
    timeout: 60000 // request timeout
})

// request interceptor
service.interceptors.request.use(
    config => {
        let token = getToken()
        if (token) {
            config.headers['authorization'] = token
        }
        return config
    },
    error => {
        // do something with request error
        return Promise.reject(error)
    }
)

// response interceptor
service.interceptors.response.use(
    response => {
        const res = response.data
        if (res.code === 0) {
            return res
        }else if(res.code===403 || res.code===401) {
            // 清空token 本地登出
            removeToken()
            router.push({"path":'/login'}).then()
            return res
        }
        else {
            ElMessage({
                message: res.message || 'Error',
                type: 'error',
                duration: 5 * 1000
            })
            return Promise.reject(new Error(res.message))
        }
    },
    error => {
        ElMessage({
            message: "服务器繁忙、请稍后再试！",
            type: 'error',
            duration: 5 * 1000
        })
        return Promise.reject(error)
    }
)

export default service
