// src/main.ts

import "./assets/main.css";

import { createApp } from "vue";
import App from "./App.vue";
// 1. 导入我们创建的路由实例
import router from "./router";

const app = createApp(App);

// 2. 在挂载应用前，使用 .use() 方法来安装路由
app.use(router);

app.mount("#app");
