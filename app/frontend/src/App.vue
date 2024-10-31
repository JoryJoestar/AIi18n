<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();

const shouldKeepAlive = ref(false); // 控制是否缓存

// 定义需要缓存的路由名称数组
const cacheRoutes = ['projectDetails'];

// 根据路由变化更新 shouldKeepAlive
watch(() => route.name, (newName) => {
  // 检查当前路由名称是否在需要缓存的数组中
  shouldKeepAlive.value = !cacheRoutes.includes(newName as string);
});

//@ts-ignore
window.electronAPI.onFastAPIStatus((data) => {
  console.log(data)
});

</script>

<template>

  <router-view v-slot="{ Component }">
    <keep-alive v-if="shouldKeepAlive">
      <component :is="Component" />
    </keep-alive>

    <component v-else :is="Component" />
  </router-view>
</template>

<style scoped></style>
