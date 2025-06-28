<script setup lang="ts">
// 1. 从 vue 中多导入一个 `watch`
import { ref, watch } from "vue";
import TodoItem from "./components/TodoItem.vue";

const newTodoText = ref("");

// 2. 加载逻辑：
//    尝试从 localStorage 读取 'todos' 数据。
//    如果存在，就用 JSON.parse 解析它；如果不存在，就使用一个空数组。
const todos = ref(JSON.parse(localStorage.getItem("todos") || "[]"));

// 3. 使用 watch 侦听 todos 的变化
//    watch 的第一个参数是我们要侦听的响应式数据源 (ref 或 reactive 对象)
//    第二个参数是当数据源变化时要执行的回调函数
watch(
  todos,
  (newTodos) => {
    // 当 todos 数组变化时，这个函数就会被调用
    // `newTodos` 是变化后的新数组
    // 我们将新数组转换成 JSON 字符串并保存到 localStorage 中
    localStorage.setItem("todos", JSON.stringify(newTodos));
  },
  {
    // 第三个参数是选项对象，`deep: true` 在这里至关重要。
    // 因为我们侦听的是一个对象数组，需要深度侦听才能捕捉到数组内部对象的变化。
    deep: true,
  }
);

function removeTodo(idToRemove: number) {
  todos.value = todos.value.filter((todo) => todo.id !== idToRemove);
}

function addTodo() {
  const trimmedText = newTodoText.value.trim();
  if (trimmedText === "") {
    return;
  }
  const newTodo = {
    id: Date.now(),
    text: trimmedText,
  };
  todos.value.unshift(newTodo);
  newTodoText.value = "";
}
</script>

<template>
  <main>
    <h1>我的待办事项</h1>
    <form @submit.prevent="addTodo">
      <input v-model="newTodoText" placeholder="接下来要做什么？" />
      <button type="submit">添加</button>
    </form>
    <ul>
      <TodoItem
        v-for="todo in todos"
        :key="todo.id"
        :todo="todo"
        @remove="removeTodo(todo.id)"
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
