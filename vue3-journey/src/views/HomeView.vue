// src/views/HomeView.vue

<script setup lang="ts">
import { ref } from "vue";
import { Plus } from "@element-plus/icons-vue"; // 导入一个图标
import TodoItem from "../components/TodoItem.vue";
import { useTodoStore } from "../stores/todoStore";

const todoStore = useTodoStore();
const newTodoText = ref("");

function addNewTodo() {
  todoStore.addTodo(newTodoText.value);
  newTodoText.value = "";
}
</script>

<template>
  <main>
    <h1>我的待办事项 (还剩 {{ todoStore.incompleteCount }} 项未完成)</h1>

    <div class="add-form">
      <el-input
        v-model="newTodoText"
        placeholder="接下来要做什么？"
        size="large"
        clearable
        @keyup.enter="addNewTodo"
      />
      <el-button type="primary" size="large" :icon="Plus" @click="addNewTodo">
        添加
      </el-button>
    </div>

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
