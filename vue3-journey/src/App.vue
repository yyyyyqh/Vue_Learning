<script setup lang="ts">
// 1. 引入 ref 和我们刚创建的 TodoItem 组件
import { ref } from "vue";
import TodoItem from "./components/TodoItem.vue";

// 2. 创建一个响应式的待办事项列表
const todos = ref([
  { id: 1, text: "学习 Vue Props" },
  { id: 2, text: "学习 Vue Emits" },
  { id: 3, text: "学习 v-for 列表渲染" },
  { id: 4, text: "征服星辰大海！" },
]);

// 3. 创建一个函数，用于接收子组件传来的 id 并删除对应的待办事项
function removeTodo(idToRemove: number) {
  todos.value = todos.value.filter((todo) => todo.id != idToRemove);
}
</script>

<template>
  <main>
    <h1>我的待办事项</h1>
    <ul>
      <TodoItem
        v-for="todo in todos"
        :key="todo.id"
        :todo="todo"
        @remove1="removeTodo(todo.id)"
      />
    </ul>
  </main>
</template>

<style scoped>
main {
  width: 100%;
  max-width: 500px;
  margin: 40px auto;
  font-family: sans-serif;
}

ul {
  list-style: none;
  padding: 0;
}
</style>
