<script setup lang="ts">

import { computed } from "vue";
import { useRoute } from "vue-router"

const route = useRoute()

const key = computed(() => {
    return route.path
})

</script>

<template>
    <main class="app-main">
        <RouterView v-slot="{ Component }">
            <Transition name="fade" mode="out-in">
                <KeepAlive>
                    <component :is="Component" :key="key" />
                </KeepAlive>
            </Transition>
        </RouterView>
    </main>

</template>

<style>
.app-main {
    flex: 1;
}
</style>