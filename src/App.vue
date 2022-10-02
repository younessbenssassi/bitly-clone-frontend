<template>
  <div id="app">
    <DesktopMenu v-if="auth.loggedIn" />
    <router-view></router-view>
  </div>
</template>

<script>

import DesktopMenu from "@/components/Menu/DesktopMenu";
import {mapState} from "vuex";
export default {
  name: 'App',
  components:{
    DesktopMenu,
  },
  computed:{
    ...mapState({
      auth: state => state.auth,
    }),
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
  margin-top: 60px;
}
</style>

