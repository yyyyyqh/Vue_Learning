// src/views/TodoDetailView.vue

<script setup lang="ts">
import { computed } from "vue";
import { useRoute, RouterLink } from "vue-router";
// 1. 同样导入 store
import { useTodoStore } from "../stores/todoStore";

// 2. 激活 store
const todoStore = useTodoStore();
const route = useRoute();

// 3. 使用 computed 从 store 中查找对应的 todo
//    这比 onMounted 更高效，因为如果 store 数据变化，这里也会自动更新
const todo = computed(() => {
  const todoId = parseInt(route.params.id as string);
  return todoStore.todos.find((item) => item.id === todoId);
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
      <p>未找到该待办事项。</p>
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
