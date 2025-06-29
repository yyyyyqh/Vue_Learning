// src/stores/todoStore.ts

import { computed } from "vue"; // ref 和 watch 不再需要从 vue 中直接导入了
import { defineStore } from "pinia";

// 1. 导入我们自己创建的组合式函数
import { useLocalStorage } from "../composables/useLocalStorage";

export const useTodoStore = defineStore("todos", () => {
  // --- STATE ---
  // 之前复杂的初始化和 watch 逻辑，现在被这一行优雅地取代了！
  const todos = useLocalStorage("todos", []); // 'todos' 是 key, [] 是默认值

  // --- GETTERS ---
  // Getters 和 Actions 的代码完全不需要改变，因为它们操作的
  // 依然是一个 ref (只不过这个 ref 是由我们的 Composable 创建的)
  const incompleteCount = computed(() => {
    return todos.value.filter((todo) => !todo.completed).length;
  });

  // --- ACTIONS ---
  function addTodo(text: string) {
    const trimmedText = text.trim();
    if (trimmedText === "") return;

    const newTodo = {
      id: Date.now(),
      text: trimmedText,
      completed: false,
    };
    todos.value.unshift(newTodo);
  }

  function removeTodo(idToRemove: number) {
    todos.value = todos.value.filter((todo) => todo.id !== idToRemove);
  }

  function toggleTodoComplete(idToToggle: number) {
    const todo = todos.value.find((todo) => todo.id === idToToggle);
    if (todo) {
      todo.completed = !todo.completed;
    }
  }

  // 返回所有需要暴露出去的状态和方法
  return {
    todos,
    incompleteCount,
    addTodo,
    removeTodo,
    toggleTodoComplete,
  };
});
