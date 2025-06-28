// src/views/HomeView.vue

<script setup lang="ts">
import { ref } from "vue";
import TodoItem from "../components/TodoItem.vue";
// 1. 导入我们刚刚创建的 store
import { useTodoStore } from "../stores/todoStore";

// 2. 在组件中激活 store
const todoStore = useTodoStore();

// 3. 输入框的文本是这个组件独有的临时状态，所以保留在组件本地
const newTodoText = ref("");

// 4. 创建一个新函数来调用 store 里的 action
function addNewTodo() {
  todoStore.addTodo(newTodoText.value);
  // 清空本地的 ref
  newTodoText.value = "";
}
</script>

<template>
  <main>
    <h1>我的待办事项 (还剩 {{ todoStore.incompleteCount }} 项未完成)</h1>

    <form @submit.prevent="addNewTodo">
      <input v-model="newTodoText" placeholder="接下来要做什么？" />
      <button type="submit">添加</button>
    </form>

    <ul>
      <TodoItem
        v-for="todo in todoStore.todos"
        :key="todo.id"
        :todo="todo"
        @remove="todoStore.removeTodo(todo.id)"
        @toggle-complete="todoStore.toggleTodoComplete(todo.id)"
      />
    </ul>
  </main>
</template>

<style scoped>
/* 样式部分也无需任何改动 */
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
form {
  display: flex;
  margin-bottom: 20px;
}
input {
  flex-grow: 1;
  padding: 10px;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 4px 0 0 4px;
}
form button {
  padding: 10px 20px;
  font-size: 1rem;
  background-color: #42b883;
  color: white;
  border: 1px solid #42b883;
  border-left: none;
  border-radius: 0 4px 4px 0;
  cursor: pointer;
}
</style>
