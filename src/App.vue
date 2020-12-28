<template>
  <div id="app">
    <keep-alive>
      <router-view v-if="$route.meta.keepAlive"></router-view>
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive"></router-view>
  </div>
</template>

<script>
export default {
  created() {
    if (this.IsPC()) {
      let str = `${location.href.split("#")[0]}pc`;
      location.href = str;
    }
  },
  data() {},
  mounted() {},
  methods: {
    IsPC() {
      let userAgentInfo = navigator.userAgent;
      let Agents = new Array(
        "Android",
        "iPhone",
        "SymbianOS",
        "Windows Phone",
        "iPad",
        "iPod"
      );
      let flag = true;
      for (let v = 0; v < Agents.length; v++) {
        if (userAgentInfo.indexOf(Agents[v]) > 0) {
          flag = false;
          break;
        }
      }
      return flag;
    }
  }
};
</script>
<style>
.w100 {
  width: 100%;
}
.w50 {
  width: 50%;
}
.h100 {
  height: 100%;
}
.flex-center {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
