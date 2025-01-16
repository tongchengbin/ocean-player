<template>
  <div>
    <HeaderNav v-if="state.isShowNav"></HeaderNav>
    <router-view style="padding-top: calc(60px + 0.5rem)"></router-view>
  </div>
</template>

<script>
import HeaderNav from "@/components/HeaderNav.vue";
import {reactive} from "@vue/reactivity";
import { useRoute } from 'vue-router';
import {onMounted} from "@vue/runtime-core";
export default {
  name: 'App',
  components: {
    HeaderNav
  },
  watch: {
    $route: function (val, oldVal) {
      this.routeChange(val, oldVal);
    },
  },
  setup() {
    const state = reactive({
      isShowNav: false,
      isShowSlider: false,
    });
    const route = useRoute();
    const routeChange = (val,oldVal) => {
      state.isShowNav = val.path !== "/";
      const hiddenNavs = [
        "/login","/register"
      ];
      state.isShowNav = !hiddenNavs.includes(val.path);
    };
    onMounted(() => {
      routeChange(route, route);
    })
    return {
      state,
      routeChange,
    };
  },
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
*{
  margin: 0;
  padding: 0;
}
html{
  background-color: rgb(18,25,38);
}
html,body{
  height: 100%;
}
</style>
