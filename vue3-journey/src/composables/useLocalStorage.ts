// src/composables/useLocalStorage.ts

import { ref, watch } from "vue";

// 这是一个使用了“泛型”<T>的函数，让它可以处理任何类型的数据
// 比如字符串、数字、或者我们的待办事项数组
export function useLocalStorage<T>(key: string, defaultValue: T) {
  // 1. 创建一个 ref，它的初始值将从 localStorage 中读取
  const value = ref<T>(
    (() => {
      const storedValue = localStorage.getItem(key);
      // 如果 localStorage 中有值，就用它
      if (storedValue) {
        // JSON.parse 将字符串转换回 JavaScript 对象/数组
        return JSON.parse(storedValue);
      }
      // 否则，使用我们传入的默认值
      return defaultValue;
    })()
  );

  // 2. 使用 watch 深度侦听 value ref 的变化
  watch(
    value,
    (newValue) => {
      // 当 value 变化时，将其转换为 JSON 字符串并存入 localStorage
      localStorage.setItem(key, JSON.stringify(newValue));
    },
    { deep: true }
  );

  // 3. 将这个创建好的、具备“超能力”的 ref 返回
  return value;
}
