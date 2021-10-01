import Vue from "vue";
import VueRouter from "vue-router";
import EventBusDemo from "../components/EventBusDemo.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/demo1",
    alias: "/",
    name: "EventBusDemo",
    component: EventBusDemo
  },
  {
    path: "/demo2",
    name: "BestPracticeDemo",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(
        /* webpackChunkName: "about" */ "../components/BestPracticeDemo.vue"
      )
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
