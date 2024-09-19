<script setup lang="ts">
import Main from './Main.vue'
import Sidebar from './Sidebar.vue';


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
            <Main />
        </div>

    </div>
</template>

<style lang="scss">
.body {
    display: flex;
    width: 100vw;
    height: 100vh;
}
</style>