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
      component: () => import("../views/AboutView.vue"),
    },
    // --- 新增部分 开始 ---
    // 这就是动态路由
    // `:id` 是一个动态参数，它可以匹配任何字符串
    {
      path: "/todo/:id",
      name: "TodoDetail",
      component: () => import("../views/TodoDetailView.vue"),
    },
    // --- 新增部分 结束 ---
  ],
});

export default router;
