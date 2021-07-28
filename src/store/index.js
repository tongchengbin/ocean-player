import {createStore} from 'vuex'
import request from "@/utils/request";

export default createStore({
    state: {
        user:{
            username:null,
        },
        tagsList: [],
        collapse: false
    },
    mutations: {
        delTagsItem(state, data) {
            state
                .tagsList
                .splice(data.index, 1);
        },
        setTagsItem(state, data) {
            state
                .tagsList
                .push(data)
        },
        clearTags(state) {
            state.tagsList = []
        },
        closeTagsOther(state, data) {
            state.tagsList = data;
        },
        closeCurrentTag(state, data) {
            for (let i = 0, len = state.tagsList.length; i < len; i++) {
                const item = state.tagsList[i];
                if (item.path === data.$route.fullPath) {
                    if (i < len - 1) {
                        data
                            .$router
                            .push(state.tagsList[i + 1].path);
                    } else if (i > 0) {
                        data
                            .$router
                            .push(state.tagsList[i - 1].path);
                    } else {
                        data
                            .$router
                            .push("/");
                    }
                    state
                        .tagsList
                        .splice(i, 1);
                    break;
                }
            }
        },
        // 侧边栏折叠
        handleCollapse(state, data) {
            state.collapse = data;
        },
        set_user(state,data){
            state.user.username = data.username
            state.user.id = data.id
        }
    },
    getters:{
        user:state => state.user

    },
    actions: {
        getInfo({commit, state}){
            return new Promise((resolve,reject)=>{
                request.get('/api/info').then(res=>{
                    commit('set_user',res.data)
                    resolve()
                }).catch(error =>{
                    reject(error)
                })
            })

        }
    },
})
