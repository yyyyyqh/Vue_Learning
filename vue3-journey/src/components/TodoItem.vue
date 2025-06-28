<script setup lang="ts">
// 1. 使用 `defineProps` 声明该组件可以接收一个名为 `todo` 的“属性” (prop)
// 这是父组件传递数据给子组件的方式
defineProps<{
  todo: {
    id: number;
    text: string;
  };
}>();

// 2. 使用 `defineEmits` 声明该组件可以触发一个名为 `remove` 的自定义事件
// 这是子组件向父组件发送消息的方式
const emit2 = defineEmits(["remove1"]);
</script>

<template>
  <li>
    <span>{{ todo.id }} </span>
    <span class="space">{{ todo.text }}</span>
    <button @click="emit2('remove1')">删除</button>
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

button {
  background-color: #ff4d4d;
  color: white;
  border: none;
  padding: 5px 10px;
  border-radius: 4px;
  cursor: pointer;
}
.space {
  margin-left: 10px;
  margin-right: 10px;
}
</style>
