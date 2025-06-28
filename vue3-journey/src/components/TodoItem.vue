<script setup lang="ts">
// 更新 Props，现在 todo 对象包含一个 `completed` 属性
defineProps<{
  todo: {
    id: number;
    text: string;
    completed: boolean; // 新增
  };
}>();

// 新增一个 `toggle-complete` 事件
const emit = defineEmits(["remove", "toggle-complete"]);
</script>

<template>
  <li :class="{ completed: todo.completed }">
    <input
      type="checkbox"
      :checked="todo.completed"
      @change="emit('toggle-complete')"
    />
    <span>{{ todo.text }}</span>
    <button @click="emit('remove')">删除</button>
  </li>
</template>

<style scoped>
li {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 0;
  border-bottom: 1px solid #eee;
}

/* 新增样式：当 li 元素有 'completed' class 时，应用删除线样式 */
li.completed span {
  text-decoration: line-through;
  color: #ccc;
}

button {
  background-color: #ff4d4d;
  /* ... 其他样式保持不变 ... */
  color: white;
  border: none;
  padding: 5px 10px;
  border-radius: 4px;
  cursor: pointer;
}
</style>
