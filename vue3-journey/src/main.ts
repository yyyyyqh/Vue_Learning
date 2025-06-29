// src/main.ts

import { createApp } from "vue";
import { createPinia } from "pinia";

// 1. 导入 Element Plus 主模块和样式文件
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";

import App from "./App.vue";
import router from "./router";
import "./assets/main.css";

const app = createApp(App);

// 2. 在使用其他插件之前，先使用 Element Plus
app.use(ElementPlus);
app.use(createPinia());
app.use(router);

app.mount("#app");
