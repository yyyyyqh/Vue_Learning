<script setup lang="ts">
// 1. 导入 Vue 3 的核心功能 `ref`
// `ref` 用于创建一个响应式的数据源
import { ref } from 'vue'

// 2. 创建一个名为 `count` 的响应式变量，初始值为 0
const count = ref(0)

// 3. 创建一个函数，用于增加 count 的值
function increment() {
  // 在 <script> 中，我们需要通过 .value 来访问和修改 ref 的值
  count.value++
}
</script>

<template>
  <main>
    <h1>我的第一次 Vue 3 创造之旅！</h1>
    
    <button @click="increment">
      当前点击次数：{{ count }}
    </button>
  </main>
</template>

<style scoped>
main {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  text-align: center;
}

button {
  margin-top: 20px;
  padding: 10px 20px;
  font-size: 1.2rem;
  cursor: pointer;
}
</style>