// src/main.ts

import "./assets/main.css";

import { createApp } from "vue";
import { createPinia } from "pinia"; // 导入 Pinia
import App from "./App.vue";
import router from "./router"; // 导入 Router

const app = createApp(App);

// 最佳实践：在挂载应用前，安装所有需要的插件。
// Pinia 和 Vue Router 的安装顺序在这里通常不影响最终功能。
app.use(createPinia());
app.use(router);

app.mount("#app");
