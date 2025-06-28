// src/views/TodoDetailView.vue

<script setup lang="ts">
import { ref, onMounted } from "vue";
// 1. 导入 `useRoute` 来访问当前路由信息
import { useRoute, RouterLink } from "vue-router";

// 定义一个 ref 来存放找到的 todo 项
const todo = ref<{ id: number; text: string; completed: boolean } | null>(null);

// 2. 调用 `useRoute()` 获取当前路由对象
const route = useRoute();

// 3. `onMounted` 是一个生命周期钩子，它会在组件被渲染到页面上后执行
onMounted(() => {
  // 从路由参数中获取 id (`route.params.id`)
  // URL 中的参数总是字符串，我们用 parseInt 转换为数字
  const todoId = parseInt(route.params.id as string);

  // 从 localStorage 加载所有 todos
  const allTodos = JSON.parse(localStorage.getItem("todos") || "[]");

  // 在所有 todos 中查找与当前 id 匹配的一项
  todo.value = allTodos.find((item: any) => item.id === todoId) || null;
});
</script>

<template>
  <div class="todo-detail">
    <h1>待办事项详情</h1>

    <div v-if="todo">
      <h2>任务ID: {{ todo.id }}</h2>
      <p>内容: {{ todo.text }}</p>
      <p>状态: {{ todo.completed ? "已完成" : "未完成" }}</p>
    </div>
    <div v-else>
      <p>未找到该待办事项，或者正在加载中...</p>
    </div>
    <br />
    <RouterLink to="/">返回列表</RouterLink>
  </div>
</template>

<style scoped>
.todo-detail {
  padding: 20px;
}
</style>
