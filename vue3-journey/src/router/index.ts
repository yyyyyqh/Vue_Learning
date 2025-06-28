// src/router/index.ts

import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/about",
      name: "about",
      // 这是“路由懒加载”，只有当用户访问 /about 时，才会加载这个组件
      // 对于大型应用能优化初始加载速度
      component: () => import("../views/AboutView.vue"),
    },
  ],
});

export default router;
