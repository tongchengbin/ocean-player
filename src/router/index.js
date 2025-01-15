import { createRouter, createWebHistory } from "vue-router";

const routes = [
    {
        path: "/login",
        name: "login",
        component: () => import('@/views/Login/index.vue'),
        meta:{
            auth:false
        }
    },
    {
        path: "/register",
        name: "register",
        component: () => import('@/views/Login/register.vue'),
        meta:{
            auth:false
        }
    },
    {
        path: "/",
        name: "center",
        component: () => import('@/views/match/index.vue'),
        meta:{
            auth:false
        }
    },
    {
        path: "/notice",
        name: "notice",
        component: () => import('@/views/notice/index.vue'),
        meta:{
            auth:false
        }
    },
    {
        path: "/rank",
        name: "rank",
        component: () => import('@/views/rank/index.vue'),
        meta:{
            auth:false
        }
    },
    {
        path: "/vulnerability",
        name: "vulnerability",
        component: () => import('@/views/vulnerability/index.vue'),
        meta:{
            auth:false
        }
    },
    {
        path: "/vulnerability/:id",
        name: "vulnerability.detail",
        component: () => import('@/views/vulnerability/detail.vue'),
        meta:{
            auth:true
        }
    },
    {
        path: "/profile",
        name: "profile",
        component: () => import('@/views/profile/index.vue'),
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
