<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router';

const router = useRouter();
const route = useRoute();

</script>

<template>
  <div class="404">
    404
    <a @click="router.push('/')">Home</a>
    {{ route }}
  </div>
</template>
