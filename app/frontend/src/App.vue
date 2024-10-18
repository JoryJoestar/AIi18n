<script setup lang="ts">

//@ts-ignore
window.electronAPI.onFastAPIStatus((data) => {
    console.log(data)
});

</script>

<template>
  <RouterView />
</template>

<style scoped></style>
