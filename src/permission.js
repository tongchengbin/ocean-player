import router from './router'
import store from './store'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import { getToken } from './utils/cookie' // get token from cookie



const whiteList = ['/login',]

router.beforeEach(async(to, from, next) => {
    // start progress bar
    NProgress.start();
    if(to.matched.length===0){
        next("/")
    }
    const token = getToken();
    const user = store.getters.user
    // 如果有token  没有user信息 发送请求获取 保证信息同步
    if(token && !user.id){
        await store.dispatch('getInfo')
    }
    if(to.meta.auth){
        if(token){
            next();
            NProgress.done()
        }else{
            next(`/login?redirect=${to.path}`);
            NProgress.done()
        }
    }else{
        next();
        NProgress.done()
    }
})

router.afterEach(() => {
    // finish progress bar
    NProgress.done()
})
