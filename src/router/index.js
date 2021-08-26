import { createRouter, createWebHistory } from "vue-router";



const routes = [
    {
        path: "/login",
        name: "login",
        component: () => import('../views/Login/index'),
        meta:{
            auth:false
        }
    },
    {
        path: "/register",
        name: "register",
        component: () => import('../views/Login/register'),
        meta:{
            auth:false
        }
    },
    {
        path: "/",
        name: "center",
        component: () => import('../views/match/index'),
        meta:{
            auth:false
        }
    },
    {
        path: "/notice",
        name: "notice",
        component: () => import('../views/notice/index'),
        meta:{
            auth:false
        }
    },
    {
        path: "/rank",
        name: "rank",
        component: () => import('../views/rank/index'),
        meta:{
            auth:false
        }
    },
    {
        path: "/profile",
        name: "profile",
        component: () => import('../views/profile/index'),
        meta:{
            auth:true
        }
    }

];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
