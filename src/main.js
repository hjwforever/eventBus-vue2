import Vue from "vue";
import App from "./App.vue";
import router from "./router";

Vue.config.productionTip = false;

/**
 * 添加事件总线
 * @param {*} Vue
 */
var EventBus = new Vue();
Object.defineProperties(Vue.prototype, {
  $bus: {
    get: function () {
      return EventBus;
    }
  }
});

// 之后在所有的Vue组件中即可访问到事件总线eventBus了
// js代码中, 即可通过 this.$bus 访问到事件总线eventBus了
// template块中直接使用 $bus 也可以访问到

new Vue({
  router,
  render: (h) => h(App)
}).$mount("#app");
