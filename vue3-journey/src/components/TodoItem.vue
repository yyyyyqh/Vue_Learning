// src/components/TodoItem.vue

<script setup lang="ts">
import { RouterLink } from "vue-router";
// 导入需要的图标
import { Delete } from "@element-plus/icons-vue";

defineProps<{
  todo: {
    id: number;
    text: string;
    completed: boolean;
  };
}>();

const emit = defineEmits(["remove", "toggle-complete"]);
</script>

<template>
  <el-card class="todo-item" :class="{ completed: todo.completed }">
    <div class="todo-content">
      <el-checkbox
        :model-value="todo.completed"
        @change="emit('toggle-complete')"
        size="large"
      />
      <RouterLink :to="`/todo/${todo.id}`" class="todo-text">
        <span>{{ todo.text }}</span>
      </RouterLink>
    </div>
    <el-button type="danger" :icon="Delete" circle @click="emit('remove')" />
  </el-card>
</template>

<style scoped>
.todo-item {
  margin-bottom: 10px;
}

/* 自定义卡片内部的样式 */
/* el-card 的样式可以通过 :deep() 选择器进行深度修改 */
:deep(.el-card__body) {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.todo-content {
  display: flex;
  align-items: center;
  gap: 15px; /* 复选框和文字的间距 */
}

.todo-text {
  text-decoration: none;
  color: inherit; /* 继承父元素颜色 */
  font-size: 1.1rem;
}

.completed .todo-text {
  text-decoration: line-through;
  color: #a8a5a5;
}
</style>
