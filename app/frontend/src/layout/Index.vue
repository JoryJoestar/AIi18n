<script setup lang="ts">
import Header from './Header.vue'
import Main from './Main.vue'
import Footer from './Footer.vue'
import Sidebar from './Sidebar.vue';


</script>

<template>
    <div class="default-layout">

        <div class="g-bg">
            <div class="g-polygon-1"></div>
            <div class="g-polygon-2"></div>
            <div class="g-polygon-3"></div>
        </div>
        
        <Sidebar />
        <Header />
        <Main />
        <Footer />
    </div>
</template>

<style></style>