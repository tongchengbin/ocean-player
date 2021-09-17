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
    }

];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
