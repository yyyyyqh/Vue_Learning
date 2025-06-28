// src/stores/todoStore.ts

import { ref, computed, watch } from "vue";
import { defineStore } from "pinia";

// 使用 defineStore() 来定义一个 store
// 第一个参数是 store 的唯一 ID，Pinia 用它来连接到开发者工具
export const useTodoStore = defineStore("todos", () => {
  // --- STATE ---
  // state 是 store 的核心数据，这里我们用 ref() 来定义
  const todos = ref(JSON.parse(localStorage.getItem("todos") || "[]"));

  // --- GETTERS ---
  // getters 如同 store 的计算属性，可以派生出新的状态
  const incompleteCount = computed(() => {
    return todos.value.filter((todo) => !todo.completed).length;
  });

  // --- ACTIONS ---
  // actions 如同 store 的方法，用于修改 state
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

  // --- Side Effects (e.g., localStorage) ---
  // 我们可以直接在 store 内部使用 watch 来响应 state 的变化
  watch(
    todos,
    (newTodos) => {
      localStorage.setItem("todos", JSON.stringify(newTodos));
    },
    { deep: true }
  );

  // 最后，必须返回所有需要暴露给组件的 state, getters 和 actions
  return {
    todos,
    incompleteCount,
    addTodo,
    removeTodo,
    toggleTodoComplete,
  };
});
