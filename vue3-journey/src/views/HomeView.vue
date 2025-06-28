<script setup lang="ts">
// 1. 从 vue 中再多导入一个 `computed`
import { ref, watch, computed } from "vue";
// import TodoItem from "./components/TodoItem.vue";
import TodoItem from "@/components/TodoItem.vue";

const newTodoText = ref("");

// 2. 更新数据结构，为每个 todo 项增加 `completed` 属性
const todos = ref(JSON.parse(localStorage.getItem("todos") || "[]"));

watch(
  todos,
  (newTodos) => {
    localStorage.setItem("todos", JSON.stringify(newTodos));
  },
  { deep: true }
);

// 3. ✨ 这是我们的计算属性 ✨
//    它会根据 `todos` 列表自动计算出未完成项的数量
const incompleteCount = computed(() => {
  // .filter 会返回一个新数组，这里是所有 completed 为 false 的项
  return todos.value.filter((todo) => !todo.completed).length;
});

function removeTodo(idToRemove: number) {
  todos.value = todos.value.filter((todo) => todo.id !== idToRemove);
}

function addTodo() {
  const trimmedText = newTodoText.value.trim();
  if (trimmedText === "") return;

  const newTodo = {
    id: Date.now(),
    text: trimmedText,
    completed: false, // 新增的 todo 默认是未完成状态
  };
  todos.value.unshift(newTodo);
  newTodoText.value = "";
}

// 4. 新增一个方法，用于切换 todo 的完成状态
function toggleTodoComplete(idToToggle: number) {
  // 找到我们要修改的那个 todo
  const todo = todos.value.find((todo) => todo.id === idToToggle);
  if (todo) {
    // 直接修改它的 completed 属性
    todo.completed = !todo.completed;
  }
}
</script>

<template>
  <main>
    <h1>我的待办事项 (还剩 {{ incompleteCount }} 项未完成)</h1>

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
        @toggle-complete="toggleTodoComplete(todo.id)"
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
