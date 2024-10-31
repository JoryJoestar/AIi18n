<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router';
import Page404 from '~/assets/page/404.svg';

const router = useRouter();
const route = useRoute();

</script>

<template>
  <div class="page-404">

    <img :src="Page404" alt="404 Not Found">
    <button @click="router.push('/')">Back to Home</button>

  </div>
</template>

<style lang="scss">
.page-404 {
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  img {
    width: 60%;
    height: 60%;
  }

  button {
    cursor: pointer;
    padding: .5rem .5rem;
    font-size: 1.25rem;
    color: rgba(0, 0, 0, 0.5);
    transition: all .15s ease-in;
    border-bottom: 1px solid rgba(0, 0, 0, 0.5);

    &:hover {
      color: rgba(0, 0, 0, 1);
      border-bottom: 1px solid rgba(0, 0, 0, 1);
    }
  }
}
</style>
