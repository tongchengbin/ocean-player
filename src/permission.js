import router from './router'
import store from './store'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import { getToken } from './utils/cookie' // get token from cookie



const whiteList = ['/login',]

router.beforeEach(async(to, from, next) => {
    // start progress bar
    NProgress.start();
    const token = getToken();
    const user = store.getters.user
    // 如果有token  没有user信息 发送请求获取 保证信息同步
    if(token && !user.id){
        await store.dispatch('getInfo')
    }
    console.log("user",user)
    if (token) {
        if (to.path !== '/login') {
            const username = store.getters.user.username;
            if (username) {
                next()
            } else {
                try {
                    const { role } = await store.dispatch('user/getInfo');
                    const accessRoutes = await store.dispatch('permission/generateRoutes',role);
                    router.addRoutes(accessRoutes);
                    next({ ...to, replace: true })
                } catch (error) {
                    await store.dispatch('user/resetToken');
                    Message.error(error || 'Has Error');
                    next(`/login?redirect=${to.path}`);
                    NProgress.done()
                }
            }
        } else {
            next();
            NProgress.done()
        }
    } else {
        if (whiteList.indexOf(to.path) !== -1) {
            // in the free login whitelist, go directly
            next()
        } else {
            // other pages that do not have permission to access are redirected to the login page.
            next(`/login?redirect=${to.path}`)
            NProgress.done()
        }
    }
})

router.afterEach(() => {
    // finish progress bar
    NProgress.done()
})
