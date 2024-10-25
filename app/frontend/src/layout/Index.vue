<script setup lang="ts">
import { useAppStore } from '~/stores/appStore';
import Main from './Main.vue'
import Sidebar from './Sidebar.vue';

const appStore = useAppStore();

</script>

<template>
    <div class="default-layout">

        <!-- <div class="g-bg">
            <div class="g-polygon-1"></div>
            <div class="g-polygon-2"></div>
            <div class="g-polygon-3"></div>
        </div> -->

        <div class="body">
            <Sidebar />
            <div class="sidebar-placeholder"></div>
            <Main />
            <Settings v-if="appStore.settingsSwitch"></Settings>
        </div>

    </div>
</template>

<style lang="scss">
.body {
    display: flex;
    width: 100vw;
    height: 100vh;

    .sidebar-placeholder {
        width: 15vw;
        min-width: 10rem;
        max-width: 12rem;
        height: 100%;
    }
}
</style>